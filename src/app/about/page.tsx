import Image from "next/image";
import Link from "next/link";

import bridgeWalk from "~/app/_assets/bridge-walk.png";
import emptyStreet from "~/app/_assets/empty-street.png";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-cream-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
            Our Story
          </p>
          <h1 className="max-w-2xl font-serif text-5xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-6xl dark:text-cream-50">
            Born from a love of{" "}
            <span className="italic text-brand-600 dark:text-brand-400">
              New York
            </span>{" "}
            and its people.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            The Steel Mug started with a simple idea: every neighbourhood
            deserves a place where strangers become regulars and regulars become
            friends.
          </p>
        </div>
      </section>

      {/* Story section 1 — image left, text right */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="relative flex-1">
            <div className="absolute -inset-3 rotate-2 rounded-2xl bg-brand-100 dark:bg-brand-700/20" />
            <Image
              src={bridgeWalk}
              alt="Walking across the Brooklyn Bridge"
              className="relative rounded-2xl object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
              Where it began
            </p>
            <h2 className="font-serif text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-cream-50">
              A city of eight million{" "}
              <span className="italic text-brand-600 dark:text-brand-400">
                neighbours
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We grew up on these streets &mdash; riding the Q train to Coney
              Island in summer, grabbing bodega coffee before the morning
              commute, watching block parties shut down entire avenues. New York
              taught us that community isn&apos;t something you join. It&apos;s
              something that happens when people share a space long enough to
              start looking out for each other.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              But the city moves fast. Favourite spots close overnight. People
              drift apart. We wanted to build something that would stick around
              &mdash; a place worth coming back to.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="bk-divider text-xs font-semibold uppercase tracking-[0.3em] text-cream-300 dark:text-zinc-700">
          <span className="text-zinc-400 dark:text-zinc-600">&mdash;</span>
        </div>
      </div>

      {/* Story section 2 — text left, image right */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
              The idea
            </p>
            <h2 className="font-serif text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-cream-50">
              More than{" "}
              <span className="italic text-brand-600 dark:text-brand-400">
                coffee
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
              The Steel Mug was never about perfecting a pour-over (though we
              take that seriously too). It was about creating the kind of room
              where a freelancer shares a table with a retired bus driver and
              neither one thinks twice about it.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We source small-batch beans from roasters who care as much about
              their farmers as their flavour profiles. We keep the prices fair,
              the Wi-Fi fast, and the door open. Everything else &mdash; the
              open-mic nights, the community board, the regulars who know your
              order &mdash; that grew on its own.
            </p>
          </div>
          <div className="relative flex-1">
            <div className="absolute -inset-3 -rotate-2 rounded-2xl bg-sage-100 dark:bg-sage-600/20" />
            <Image
              src={emptyStreet}
              alt="A quiet Brooklyn street"
              className="relative rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="grain relative border-y border-cream-300/60 bg-cream-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-5xl gap-px sm:grid-cols-3">
          {[
            {
              label: "Community first",
              text: "Every decision starts with the neighbourhood. If it doesn\u2019t bring people together, we don\u2019t do it.",
            },
            {
              label: "Sourced with care",
              text: "Small-batch roasters, local bakeries, seasonal ingredients. We know where it all comes from.",
            },
            {
              label: "Always welcome",
              text: "No laptops-only hours, no minimum spend. Grab a seat, stay as long as you like.",
            },
          ].map((v) => (
            <div key={v.label} className="px-8 py-12 text-center">
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-cream-50">
                {v.label}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
          Come say hello
        </p>
        <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-cream-50">
          Your table&apos;s waiting.
        </h2>
        <p className="mt-4 max-w-md text-zinc-500 dark:text-zinc-400">
          Whether it&apos;s your first visit or your hundredth, there&apos;s
          always room at The Steel Mug.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/menu"
            className="rounded-md bg-zinc-900 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-cream-50 shadow-sm transition hover:bg-zinc-700 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
          >
            Browse the Menu
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md border border-zinc-300 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-wider text-zinc-700 shadow-sm transition hover:bg-cream-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </main>
  );
}
