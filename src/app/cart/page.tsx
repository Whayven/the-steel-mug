import { Suspense } from "react";

import { CartContent } from "~/app/_components/cart-content";
import { api, HydrateClient } from "~/trpc/server";

export const metadata = { title: "Cart" };

export default function CartPage() {
  void api.cart.get.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">Your Cart</h1>
          <Suspense fallback={<p className="text-zinc-400">Loading cart...</p>}>
            <CartContent />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
