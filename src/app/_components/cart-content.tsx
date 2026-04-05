"use client";

import Link from "next/link";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function CartContent() {
  const [items] = api.cart.get.useSuspenseQuery();
  const utils = api.useUtils();

  const updateQuantity = api.cart.updateQuantity.useMutation({
    onSettled: () => {
      void utils.cart.get.invalidate();
      void utils.cart.count.invalidate();
    },
  });

  const clearCart = api.cart.clear.useMutation({
    onSuccess: () => {
      void utils.cart.get.invalidate();
      void utils.cart.count.invalidate();
      toast.success("Cart cleared", { position: "top-center" });
    },
  });

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-zinc-500 dark:text-zinc-400">Your cart is empty.</p>
        <Link
          href="/menu"
          className="mt-4 inline-block rounded-lg bg-brand-500 px-6 py-2 font-semibold text-white transition hover:bg-brand-600 dark:bg-brand-400 dark:text-zinc-900 dark:hover:bg-brand-300"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      <div className="divide-y divide-cream-200 rounded-xl border border-cream-300 bg-cream-50 dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-800">
        {items.map((item) => (
          <div key={item.menuItemId} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="font-medium text-zinc-900 dark:text-white">{item.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                ${item.price.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity.mutate({
                    itemId: item.menuItemId,
                    quantity: item.quantity - 1,
                  })
                }
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-700 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-semibold text-zinc-900 dark:text-white">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity.mutate({
                    itemId: item.menuItemId,
                    quantity: item.quantity + 1,
                  })
                }
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-700 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
              >
                +
              </button>
              <span className="ml-2 w-16 text-right text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => clearCart.mutate()}
          disabled={clearCart.isPending}
          className="text-sm font-medium text-zinc-500 transition hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
        >
          Clear cart
        </button>
        <div className="text-right">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
