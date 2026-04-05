"use client";

import { api } from "~/trpc/react";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  likeCount: number;
  liked: boolean;
};

export function MenuItemCard({ item }: { item: MenuItem }) {
  const utils = api.useUtils();

  const toggleLike = api.menu.toggleLike.useMutation({
    onMutate: async ({ itemId }) => {
      await utils.menu.getAll.cancel();
      const prev = utils.menu.getAll.getData();

      utils.menu.getAll.setData(undefined, (old) =>
        old?.map((cat) => ({
          ...cat,
          items: cat.items.map((i) =>
            i.id === itemId
              ? { ...i, liked: !i.liked, likeCount: i.likeCount + (i.liked ? -1 : 1) }
              : i
          ),
        }))
      );

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) utils.menu.getAll.setData(undefined, context.prev);
    },
    onSettled: () => utils.menu.getAll.invalidate(),
  });

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-700 dark:bg-zinc-800">
      <div className="min-w-0">
        <p className="font-semibold text-zinc-900 dark:text-white">{item.name}</p>
        {item.description && (
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          ${item.price.toFixed(2)}
        </span>
        <button
          onClick={() => toggleLike.mutate({ itemId: item.id })}
          disabled={toggleLike.isPending}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition ${
            item.liked
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600"
          }`}
          aria-label={item.liked ? "Unlike" : "Like"}
        >
          <span>{item.liked ? "♥" : "♡"}</span>
          <span>{item.likeCount}</span>
        </button>
      </div>
    </div>
  );
}
