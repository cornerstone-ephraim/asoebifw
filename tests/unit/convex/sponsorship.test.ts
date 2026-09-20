import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  create,
  list,
  setEmailStatus,
  updateStatus,
} from "../../../convex/sponsorship";
import { requireAdmin } from "../../../convex/lib/requireAdmin";
vi.mock("../../../convex/_generated/server", () => ({
  mutation: (definition: unknown) => definition,
  query: (definition: unknown) => definition,
}));
vi.mock("../../../convex/lib/requireAdmin", () => ({ requireAdmin: vi.fn() }));
// Invoke the real handlers with an in-memory DB boundary; no deployment or emails.
const invoke = (definition: unknown, context: unknown, args: unknown) =>
  (
    definition as { handler: (ctx: unknown, args: unknown) => Promise<unknown> }
  ).handler(context, args);
const input = {
  secret: "secret",
  name: "Ada Okafor",
  organisation: "Studio",
  email: "ADA@example.com",
  phone: "",
  interest: "Not sure yet",
  supportType: "Both",
  budget: "",
  message: "We want to discuss a sponsorship opportunity.",
  website: "",
};
function database(previous: unknown = null) {
  const chain = {
    withIndex: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    first: vi.fn().mockResolvedValue(previous),
  };
  return {
    query: vi.fn().mockReturnValue(chain),
    insert: vi.fn().mockResolvedValue("new-id"),
    patch: vi.fn(),
  };
}
describe("sponsorship backend boundaries", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("SPONSORSHIP_SUBMISSION_SECRET", "secret");
  });
  afterEach(() => vi.unstubAllEnvs());
  it("rejects direct submissions and email status writes without the shared secret", async () => {
    const db = database();
    await expect(
      invoke(create, { db }, { ...input, secret: "wrong" }),
    ).rejects.toThrow("Unauthorized");
    await expect(
      invoke(
        setEmailStatus,
        { db },
        { secret: "wrong", id: "id", emailStatus: "sent" },
      ),
    ).rejects.toThrow("Unauthorized");
    expect(db.insert).not.toHaveBeenCalled();
    expect(db.patch).not.toHaveBeenCalled();
  });
  it("rejects unconfigured secrets", async () => {
    vi.stubEnv("SPONSORSHIP_SUBMISSION_SECRET", "");
    await expect(
      invoke(create, { db: database() }, { ...input, secret: "" }),
    ).rejects.toThrow("Unauthorized");
  });
  it("enforces admin access for listing and status changes", async () => {
    vi.mocked(requireAdmin).mockRejectedValue(new Error("Forbidden"));
    const db = database();
    await expect(
      invoke(list, { db }, { paginationOpts: { numItems: 20, cursor: null } }),
    ).rejects.toThrow("Forbidden");
    await expect(
      invoke(updateStatus, { db }, { id: "id", status: "Closed" }),
    ).rejects.toThrow("Forbidden");
    expect(db.query).not.toHaveBeenCalled();
    expect(db.patch).not.toHaveBeenCalled();
  });
  it("deduplicates repeat submissions within ten minutes", async () => {
    const db = database({ _id: "previous-id", submittedAt: Date.now() - 1000 });
    expect(await invoke(create, { db }, input)).toEqual({
      status: "duplicate",
      id: "previous-id",
    });
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("allows a new enquiry after the cooldown and stores normalised data", async () => {
    const db = database({
      _id: "previous-id",
      submittedAt: Date.now() - 600001,
    });
    expect(await invoke(create, { db }, input)).toEqual({
      status: "created",
      id: "new-id",
    });
    expect(db.insert).toHaveBeenCalledWith(
      "sponsorshipEnquiries",
      expect.objectContaining({
        email: "ada@example.com",
        status: "New",
        emailStatus: "pending",
      }),
    );
    expect(db.insert.mock.calls[0][1]).not.toHaveProperty("secret");
    expect(db.insert.mock.calls[0][1]).not.toHaveProperty("website");
  });
});
