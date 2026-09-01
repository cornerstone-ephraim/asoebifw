import { api } from "../../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../../convex/_generated/dataModel";
import { fetchAuthQuery } from "@/lib/server/auth";

export async function GET(
  _request: Request,
  context: RouteContext<"/admin/prize/id/[applicationId]">,
) {
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);
  if (!admin) return new Response("Not found", { status: 404 });

  const { applicationId } = await context.params;

  try {
    const document = await fetchAuthQuery(api.admin.getPrizeIdDocument, {
      applicationId: applicationId as Id<"prizeApplications">,
    });
    if (!document) return new Response("Not found", { status: 404 });

    const source = await fetch(document.url, { cache: "no-store" });
    if (!source.ok || !source.body) {
      return new Response("Document unavailable", { status: 502 });
    }

    const safeName = document.applicantName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return new Response(source.body, {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "Content-Disposition": `inline; filename="${safeName || "applicant"}-id-document"`,
        "Content-Type":
          source.headers.get("content-type") ?? "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
