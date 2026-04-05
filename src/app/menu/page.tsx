import { Suspense } from "react";

import { MenuContent } from "~/app/_components/menu-content";
import { api, HydrateClient } from "~/trpc/server";

export const metadata = { title: "Menu" };

export default function MenuPage() {
  void api.menu.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
            What we&apos;re serving
          </p>
          <h1 className="font-serif text-4xl font-bold text-zinc-900 dark:text-cream-50">
            Our Menu
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Like your favourites to earn points.
          </p>
          <div className="mt-10">
            <Suspense
              fallback={
                <p className="text-zinc-400">Loading menu...</p>
              }
            >
              <MenuContent />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
