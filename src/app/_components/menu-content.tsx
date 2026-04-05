"use client";

import { api } from "~/trpc/react";
import { MenuItemCard } from "./menu-item-card";

export function MenuContent() {
  const [categories] = api.menu.getAll.useSuspenseQuery();

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
