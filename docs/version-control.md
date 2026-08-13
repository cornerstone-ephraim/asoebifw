# Version control workflow

## Branches

- `main` — production-ready code deployed to production.
- `staging` — stable release candidates for UAT and stakeholder approval.
- `dev` — integration branch for completed feature work.
- `feature/*` — isolated product work branched from `dev`.
- `fix/*` — non-urgent bug fixes branched from `dev`.
- `hotfix/*` — urgent production fixes branched from `main`.

## Promotion path

```text
feature/* or fix/* → dev → staging → main
```

Every promotion uses a pull request and must pass CI. Do not develop directly on `dev`, `staging`, or `main`.

## Start and push a feature

```bash
git switch dev
git pull --ff-only origin dev
git switch -c feature/example
git push -u origin feature/example
```

Open a pull request from `feature/example` into `dev`.

## Release

Open a pull request from `dev` into `staging`. After UAT and approval, open a pull request from `staging` into `main`.

## Production hotfix

```bash
git switch main
git pull --ff-only origin main
git switch -c hotfix/example
git push -u origin hotfix/example
```

Open a pull request into `main`. After it merges, reconcile `main` back into both `staging` and `dev` through pull requests so the branches do not diverge.
