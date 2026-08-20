"use client";
import MuxPlayer from "@mux/mux-player-react";
export function RunwayPlayer({
  playbackId,
  title,
}: {
  playbackId?: string;
  title: string;
}) {
  if (!playbackId) return null;
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{ video_title: title }}
      accentColor="var(--color-asoebi-purple-500)"
      className="aspect-video w-full"
    />
  );
}
