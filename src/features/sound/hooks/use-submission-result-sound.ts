"use client";

import { useEffect } from "react";

import { playInterfaceSound } from "@/features/sound/interface-sound";

type SubmissionStatus = "idle" | "success" | "info" | "error";

export function useSubmissionResultSound(status: SubmissionStatus) {
  useEffect(() => {
    if (status === "success") {
      playInterfaceSound("success");
    } else if (status === "info") {
      playInterfaceSound("ready", 0.8);
    } else if (status === "error") {
      playInterfaceSound("error", 0.7);
    }
  }, [status]);
}
