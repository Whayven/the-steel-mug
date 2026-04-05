import { Suspense } from "react";

import { HydrateClient, prefetchMenuItemById } from "~/trpc/server";
import { MenuItemDetail } from "~/app/_components/menu-item-detail";

export const metadata = { title: "Menu Item" };

export default function MenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl px-4 py-14">
              <p className="text-zinc-400">Loading...</p>
            </div>
          }
        >
          <MenuItemDetailLoader params={params} />
        </Suspense>
      </main>
    </HydrateClient>
  );
}

async function MenuItemDetailLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  await prefetchMenuItemById(id);

  return <MenuItemDetail id={id} />;
}
