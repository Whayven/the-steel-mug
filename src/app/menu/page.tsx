import { Suspense } from "react";

import { MenuContent } from "~/app/_components/menu-content";
import { api, HydrateClient } from "~/trpc/server";

export const metadata = { title: "Menu" };

export default function MenuPage() {
  void api.menu.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Our Menu</h1>
          <p className="mb-10 text-zinc-500 dark:text-zinc-400">
            Like your favourites to earn points.
          </p>
          <Suspense fallback={<p className="text-zinc-400">Loading menu...</p>}>
            <MenuContent />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
