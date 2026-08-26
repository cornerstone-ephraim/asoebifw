export type ActionResult =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "info"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export const idleActionResult: ActionResult = { status: "idle" };
