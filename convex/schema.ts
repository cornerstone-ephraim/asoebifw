import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  waitlistEntries: defineTable({
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.string(),
    consent: v.optional(v.literal(true)),
    role: v.optional(
      v.union(
        v.literal("partner"),
        v.literal("designer"),
        v.literal("buyer"),
        v.literal("media"),
        v.literal("vendor"),
        v.literal("community"),
      ),
    ),
    status: v.literal("subscribed"),
    submittedAt: v.number(),
  }).index("by_email", ["email"]),
  accreditationApplications: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("press"),
      v.literal("media"),
      v.literal("buyer"),
      v.literal("designer"),
      v.literal("partner"),
      v.literal("vendor"),
      v.literal("other"),
    ),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("submitted"),
      v.literal("reviewing"),
      v.literal("approved"),
      v.literal("declined"),
    ),
    submittedAt: v.number(),
  }).index("by_email", ["email"]),
  prizeApplications: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    category: v.union(
      v.literal("Best Designer"),
      v.literal("Best Wedding Asoebi"),
      v.literal("Best Innovative Fabric Design"),
    ),
    portfolio: v.string(),
    statement: v.string(),
    consent: v.literal(true),
    status: v.union(v.literal("submitted"), v.literal("reviewing")),
    submittedAt: v.number(),
  }).index("by_email_and_category", ["email", "category"]),
});
