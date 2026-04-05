"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "~/trpc/react";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  likeCount: number;
  liked: boolean;
  imageUrl: string | null;
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
              ? {
                  ...i,
                  liked: !i.liked,
                  likeCount: i.likeCount + (i.liked ? -1 : 1),
                }
              : i,
          ),
        })),
      );

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) utils.menu.getAll.setData(undefined, context.prev);
    },
    onSettled: async () => {
      await Promise.all([
        utils.menu.getAll.invalidate(),
        utils.menu.getPoints.invalidate(),
      ]);
    },
  });

  const addToCart = api.cart.addItem.useMutation({
    onSuccess: () => {
      void utils.cart.count.invalidate();
      toast.success(`${item.name} added to cart`, { position: "top-center" });
    },
    onError: (err) => {
      const message =
        err.data?.code === "UNAUTHORIZED"
          ? "Sign in to add items to your cart"
          : err.message;
      toast.error(message, { position: "top-center" });
    },
  });

  return (
    <div className="group grain relative flex items-start justify-between gap-4 overflow-hidden rounded-xl border border-cream-300/60 bg-cream-50 p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Background image — teased at rest, fully revealed on hover */}
      {item.imageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 350px"
          />
          <div className="absolute inset-0 bg-linear-to-r from-cream-50 via-cream-50/95 to-cream-50/80 transition-all duration-300 group-hover:from-zinc-900/90 group-hover:via-zinc-900/60 group-hover:to-zinc-900/30 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-900/80 dark:group-hover:from-zinc-900/90 dark:group-hover:via-zinc-900/60 dark:group-hover:to-zinc-900/30" />
        </div>
      )}

      <div className="relative z-10 min-w-0">
        <Link
          href={`/menu/${item.id}`}
          className="font-serif text-lg font-semibold text-zinc-900 underline decoration-cream-300 underline-offset-2 transition hover:decoration-brand-400 group-hover:text-white group-hover:decoration-white/40 dark:text-cream-50 dark:decoration-zinc-700 dark:hover:decoration-brand-400"
        >
          {item.name}
        </Link>
        {item.description && (
          <p className="mt-0.5 text-sm text-zinc-500 transition-colors group-hover:text-zinc-300 dark:text-zinc-400">
            {item.description}
          </p>
        )}
        <span className="mt-2 inline-block text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-300 dark:text-brand-400">
          ${item.price.toFixed(2)}
        </span>
      </div>
      <div className="relative z-10 flex shrink-0 flex-col items-end gap-2">
        <button
          onClick={() => toggleLike.mutate({ itemId: item.id })}
          disabled={toggleLike.isPending}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition ${
            item.liked
              ? "bg-brand-100 text-brand-700 hover:bg-brand-200 group-hover:bg-brand-600/80 group-hover:text-white dark:bg-brand-700/30 dark:text-brand-400"
              : "bg-cream-200 text-zinc-500 hover:bg-cream-300 group-hover:bg-white/20 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
          aria-label={item.liked ? "Unlike" : "Like"}
        >
          <span>{item.liked ? "\u2665" : "\u2661"}</span>
          <span>{item.likeCount}</span>
        </button>
        <button
          onClick={() => addToCart.mutate({ itemId: item.id })}
          disabled={addToCart.isPending}
          className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-cream-50 transition hover:bg-zinc-700 disabled:opacity-50 group-hover:bg-white group-hover:text-zinc-900 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
