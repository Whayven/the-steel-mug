"use client";

import { api } from "~/trpc/react";

export function UserPoints() {
  const { data: points } = api.menu.getPoints.useQuery(undefined, {
    retry: false,
  });

  if (points == null) return null;

  return (
    <span className="text-sm text-zinc-600 dark:text-zinc-400">
      {points} pts
    </span>
  );
}
