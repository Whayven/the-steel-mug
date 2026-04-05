"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";

import { api } from "~/trpc/react";

export function MenuItemDetail({ id }: { id: string }) {
  const [item] = api.menu.getById.useSuspenseQuery({ id });
  const utils = api.useUtils();

  const toggleLike = api.menu.toggleLike.useMutation({
    onMutate: async () => {
      await utils.menu.getById.cancel({ id });
      const prev = utils.menu.getById.getData({ id });

      utils.menu.getById.setData({ id }, (old) =>
        old
          ? {
              ...old,
              liked: !old.liked,
              likeCount: old.likeCount + (old.liked ? -1 : 1),
            }
          : old,
      );

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) utils.menu.getById.setData({ id }, context.prev);
    },
    onSettled: async () => {
      await Promise.all([
        utils.menu.getById.invalidate({ id }),
        utils.menu.getAll.invalidate(),
        utils.menu.getPoints.invalidate(),
      ]);
    },
  });

  const addToCart = api.cart.addItem.useMutation({
    onSuccess: () => {
      void utils.cart.count.invalidate();
      toast.success(`${item?.name} added to cart`, { position: "top-center" });
    },
    onError: (err) => {
      const message =
        err.data?.code === "UNAUTHORIZED"
          ? "Sign in to add items to your cart"
          : err.message;
      toast.error(message, { position: "top-center" });
    },
  });

  if (!item) notFound();

  const featuredAsset = item.assets.find((a) => a.featured) ?? item.assets[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      {/* Back link */}
      <Link
        href="/menu"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        <span aria-hidden>&larr;</span> Back to menu
      </Link>

      <div className="grain relative overflow-hidden rounded-2xl border border-cream-300/60 bg-cream-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Featured image */}
        {featuredAsset && (
          <div className="relative aspect-[16/9] w-full bg-cream-200 dark:bg-zinc-800">
            <Image
              src={featuredAsset.url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
            {item.category}
          </p>
          <h1 className="font-serif text-4xl font-bold text-zinc-900 dark:text-cream-50">
            {item.name}
          </h1>

          {item.description && (
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          )}

          <p className="mt-6 font-serif text-2xl font-semibold text-brand-700 dark:text-brand-400">
            ${item.price.toFixed(2)}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => addToCart.mutate({ itemId: item.id })}
              disabled={addToCart.isPending}
              className="rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream-50 transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleLike.mutate({ itemId: item.id })}
              disabled={toggleLike.isPending}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                item.liked
                  ? "bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-700/30 dark:text-brand-400"
                  : "bg-cream-200 text-zinc-500 hover:bg-cream-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              <span>{item.liked ? "\u2665" : "\u2661"}</span>
              <span>
                {item.likeCount} {item.likeCount === 1 ? "like" : "likes"}
              </span>
            </button>
          </div>
        </div>

        {/* Additional assets gallery */}
        {item.assets.length > 1 && (
          <div className="border-t border-cream-300/60 p-8 dark:border-zinc-800">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              Gallery
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {item.assets.map((asset) => (
                <div
                  key={asset.id}
                  className="relative aspect-square overflow-hidden rounded-lg bg-cream-200 dark:bg-zinc-800"
                >
                  <Image
                    src={asset.url}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 250px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
