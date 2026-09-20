import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/requireAdmin";
import { sponsorshipSchema } from "../src/features/sponsorship/schema";

function requireSubmissionSecret(secret: string) {
  if (
    !process.env.SPONSORSHIP_SUBMISSION_SECRET ||
    secret !== process.env.SPONSORSHIP_SUBMISSION_SECRET
  )
    throw new Error("Unauthorized");
}
export const create = mutation({
  args: {
    secret: v.string(),
    name: v.string(),
    organisation: v.string(),
    email: v.string(),
    phone: v.string(),
    interest: v.string(),
    supportType: v.string(),
    budget: v.string(),
    message: v.string(),
    website: v.string(),
  },
  handler: async (ctx, { secret, ...input }) => {
    requireSubmissionSecret(secret);
    const parsed = sponsorshipSchema.parse(input);
    const previous = await ctx.db
      .query("sponsorshipEnquiries")
      .withIndex("by_email", (q) => q.eq("email", parsed.email))
      .order("desc")
      .first();
    if (previous && Date.now() - previous.submittedAt < 10 * 60 * 1000)
      return { status: "duplicate" as const, id: previous._id };
    const { website: _honeypot, ...data } = parsed;
    void _honeypot;
    const id = await ctx.db.insert("sponsorshipEnquiries", {
      ...data,
      status: "New",
      emailStatus: "pending",
      submittedAt: Date.now(),
    });
    return { status: "created" as const, id };
  },
});
export const setEmailStatus = mutation({
  args: {
    secret: v.string(),
    id: v.id("sponsorshipEnquiries"),
    emailStatus: v.union(v.literal("sent"), v.literal("failed")),
  },
  handler: async (ctx, { secret, id, emailStatus }) => {
    requireSubmissionSecret(secret);
    await ctx.db.patch(id, { emailStatus });
  },
});
export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    await requireAdmin(ctx);
    return ctx.db
      .query("sponsorshipEnquiries")
      .order("desc")
      .paginate(paginationOpts);
  },
});
export const updateStatus = mutation({
  args: {
    id: v.id("sponsorshipEnquiries"),
    status: v.union(
      v.literal("New"),
      v.literal("Contacted"),
      v.literal("In discussion"),
      v.literal("Closed"),
    ),
  },
  handler: async (ctx, { id, status }) => {
    const admin = await requireAdmin(ctx);
    await ctx.db.patch(id, {
      status,
      reviewedAt: Date.now(),
      reviewedBy: admin.email,
    });
  },
});
