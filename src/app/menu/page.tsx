import { Suspense } from "react";

import { MenuItemCard } from "~/app/_components/menu-item-card";
import { api, HydrateClient } from "~/trpc/server";

export const metadata = { title: "Menu" };

async function MenuContent() {
  const categories = await api.menu.getAll();

  if (categories.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        No menu items yet. Run <code className="font-mono text-sm">npm run db:seed</code> to load the menu.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <section key={cat.id}>
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">{cat.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cat.items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function MenuPage() {
  void api.menu.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
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
