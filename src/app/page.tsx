import Image from "next/image";
import Link from "next/link";

import bridgeWalk from "~/app/_assets/bridge-walk.png";
import earnPoints from "~/app/_assets/earn-points.png";
import emptyStreet from "~/app/_assets/empty-street.png";
import healthyLife from "~/app/_assets/healthy-life.png";
import { getSession } from "~/server/better-auth/server";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-cream-50 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-4 py-20 sm:py-28 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
              Est. Brooklyn, NY
            </p>
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-6xl dark:text-cream-50">
              Coffee worth
              <br />
              <span className="italic text-brand-600 dark:text-brand-400">
                slowing down
              </span>{" "}
              for.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Small-batch roasts, good people, and a corner to call your own.
              Drop in, grab your favourite brew, and earn points just by being
              part of the community.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="/menu"
                className="rounded-md bg-zinc-900 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-cream-50 shadow-sm transition hover:bg-zinc-700 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
              >
                View Menu
              </Link>
              {!session && (
                <Link
                  href="/sign-up"
                  className="rounded-md border border-zinc-300 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-wider text-zinc-700 shadow-sm transition hover:bg-cream-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative mx-auto w-72 sm:w-80 lg:w-full">
              <div className="absolute -inset-4 -rotate-3 rounded-2xl bg-brand-100 dark:bg-brand-700/20" />
              <Image
                src={bridgeWalk}
                alt="Brooklyn bridge walk illustration"
                className="relative rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="bk-divider text-xs font-semibold uppercase tracking-[0.3em] text-cream-300 dark:text-zinc-700">
          <span className="text-zinc-400 dark:text-zinc-600">&mdash;</span>
        </div>
      </div>

      {/* Why people love us */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-center font-serif text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-cream-50">
          Why people love{" "}
          <span className="italic text-brand-600 dark:text-brand-400">
            The Steel Mug
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500 dark:text-zinc-400">
          More than a coffee shop &mdash; a neighbourhood ritual.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {/* Card 1 */}
          <div className="grain relative flex flex-col items-center rounded-2xl border border-cream-300/60 bg-cream-50 p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={earnPoints}
              alt="Earn points illustration"
              className="mb-6 h-40 w-40 object-contain"
            />
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-cream-50">
              Earn Points
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Like your favourite drinks and food to rack up points and show the
              community what&apos;s trending.
            </p>
          </div>

          {/* Card 2 */}
          <div className="grain relative flex flex-col items-center rounded-2xl border border-cream-300/60 bg-cream-50 p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={emptyStreet}
              alt="City street illustration"
              className="mb-6 h-40 w-40 object-contain"
            />
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-cream-50">
              Your Neighbourhood Spot
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              A warm corner on every block. Pop in before work, after class, or
              whenever you need a reset.
            </p>
          </div>

          {/* Card 3 */}
          <div className="grain relative flex flex-col items-center rounded-2xl border border-cream-300/60 bg-cream-50 p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={healthyLife}
              alt="Community events illustration"
              className="mb-6 h-40 w-40 object-contain"
            />
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-cream-50">
              Community Events
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Open-mic nights, latte art throwdowns, and local pop-ups &mdash;
              there&apos;s always something brewing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative border-t border-cream-300/60 bg-cream-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
            Brewed fresh daily
          </p>
          <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-cream-50">
            Ready for a great cup?
          </h2>
          <p className="mt-4 max-w-md text-zinc-500 dark:text-zinc-400">
            Check out what we&apos;re serving and find your new go-to order.
          </p>
          <Link
            href="/menu"
            className="mt-10 rounded-md bg-zinc-900 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream-50 shadow-sm transition hover:bg-zinc-700 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
          >
            Browse the Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
