import Image from "next/image";
import Link from "next/link";

import computerCoffee from "~/app/_assets/computer-coffee.png";
import earnPoints from "~/app/_assets/earn-points.png";
import emptyStreet from "~/app/_assets/empty-street.png";
import { getSession } from "~/server/better-auth/server";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-cream-100 dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-50 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-4 py-16 sm:py-24 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Welcome to{" "}
              <span className="text-brand-500 dark:text-brand-400">
                The Steel Mug
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Great coffee, good people. Drop in, grab your favourite brew, and
              earn points just by being part of the community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="/menu"
                className="rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600 dark:bg-brand-400 dark:text-zinc-900 dark:hover:bg-brand-300"
              >
                View Menu
              </Link>
              {!session && (
                <Link
                  href="/sign-up"
                  className="rounded-lg border border-cream-300 bg-cream-50 px-6 py-3 font-semibold text-zinc-700 shadow-sm transition hover:bg-cream-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={computerCoffee}
              alt="A retro computer with a cup of coffee"
              className="mx-auto w-full max-w-sm drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="mb-12 text-center text-2xl font-bold text-zinc-900 dark:text-white">
          Why people love{" "}
          <span className="text-brand-500 dark:text-brand-400">
            The Steel Mug
          </span>
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col items-center rounded-2xl border border-cream-300 bg-cream-50 p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={earnPoints}
              alt="Earn points illustration"
              className="mb-6 h-40 w-40 object-contain"
            />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Earn Points
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Like your favourite drinks and food to rack up points and show the
              community what&apos;s trending.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center rounded-2xl border border-cream-300 bg-cream-50 p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={emptyStreet}
              alt="City street illustration"
              className="mb-6 h-40 w-40 object-contain"
            />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Your Neighbourhood Spot
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              A warm corner on every block. Pop in before work, after class, or
              whenever you need a reset.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center rounded-2xl border border-cream-300 bg-cream-50 p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={computerCoffee}
              alt="Work and coffee illustration"
              className="mb-6 h-40 w-40 object-contain"
            />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Work-Friendly
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Fast Wi-Fi, plenty of outlets, and all the caffeine you need to
              power through your day.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-cream-200 bg-cream-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Ready for a great cup?
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Check out what we&apos;re serving and find your new go-to order.
          </p>
          <Link
            href="/menu"
            className="mt-8 rounded-lg bg-brand-500 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600 dark:bg-brand-400 dark:text-zinc-900 dark:hover:bg-brand-300"
          >
            Browse the Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
