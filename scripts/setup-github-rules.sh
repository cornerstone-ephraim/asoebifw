#!/usr/bin/env sh

set -eu

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

require_command git
require_command gh
require_command sed
require_command mktemp

gh auth status >/dev/null

repository="$(gh repo view --json nameWithOwner --jq '.nameWithOwner')"
repository_root="$(git rev-parse --show-toplevel)"
ci_ref="${CI_REF:-feature/add-ci}"

if [ -n "${CI_CHECK_CONTEXT:-}" ]; then
  ci_check_context="$CI_CHECK_CONTEXT"
else
  ci_check_context="$(
    gh api "repos/$repository/commits/$ci_ref/check-runs" \
      --jq '.check_runs[] | select(.conclusion == "success") | .name' |
      sed -n '/^Verify$/p' |
      sed -n '1p'
  )"
fi

if [ -z "$ci_check_context" ]; then
  echo "No successful Verify check was found on $ci_ref." >&2
  echo "Run CI successfully or set CI_CHECK_CONTEXT explicitly." >&2
  exit 1
fi

apply_ruleset() {
  branch="$1"
  definition="$repository_root/.github/rulesets/$branch.json"
  payload="$(mktemp "${TMPDIR:-/tmp}/asoebi-ruleset.XXXXXX")"
  trap 'rm -f "$payload"' EXIT HUP INT TERM

  if [ ! -f "$definition" ]; then
    echo "Ruleset definition not found: $definition" >&2
    exit 1
  fi

  sed "s/__CI_CHECK_CONTEXT__/$ci_check_context/g" "$definition" > "$payload"

  ruleset_name="$(gh api --method GET "repos/$repository/rulesets" \
    --jq ".[] | select(.name == \"Protect $branch\") | .name" | sed -n '1p')"

  if [ -n "$ruleset_name" ]; then
    ruleset_id="$(gh api --method GET "repos/$repository/rulesets" \
      --jq ".[] | select(.name == \"Protect $branch\") | .id" | sed -n '1p')"
    gh api --method PUT "repos/$repository/rulesets/$ruleset_id" --input "$payload" >/dev/null
    action="Updated"
  else
    gh api --method POST "repos/$repository/rulesets" --input "$payload" >/dev/null
    action="Created"
  fi

  rm -f "$payload"
  trap - EXIT HUP INT TERM

  echo "$action Protect $branch"
}

apply_ruleset main
apply_ruleset staging
apply_ruleset dev

echo
echo "Verified active rulesets:"
gh api --method GET "repos/$repository/rulesets" \
  --jq '.[] | select(.name == "Protect main" or .name == "Protect staging" or .name == "Protect dev") | "\(.name): \(.enforcement)"'
