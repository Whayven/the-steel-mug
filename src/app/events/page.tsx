import { Suspense } from "react";

import { HydrateClient } from "~/trpc/server";
import { EventsCalendar } from "~/app/_components/events-calendar";

export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
        <div className="grain relative overflow-hidden bg-cream-50 dark:bg-zinc-900">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
              What&apos;s happening
            </p>
            <h1 className="font-serif text-4xl font-bold text-zinc-900 sm:text-5xl dark:text-cream-50">
              Community Events
            </h1>
            <p className="mt-3 max-w-lg text-zinc-500 dark:text-zinc-400">
              Open-mic nights, coffee cuppings, pop-ups, and more &mdash;
              there&apos;s always something brewing at The Steel Mug.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Suspense
            fallback={<p className="text-zinc-400">Loading events...</p>}
          >
            <EventsCalendar />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
