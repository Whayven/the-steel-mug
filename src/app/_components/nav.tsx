import Link from "next/link";

import { getSession } from "~/server/better-auth/server";
import { CartCount } from "./cart-count";
import { SignOutButton } from "./sign-out-button";
import { ThemeToggle } from "./theme-toggle";
import { UserPoints } from "./user-points";

export async function Nav() {
  const session = await getSession();

  return (
    <nav className="border-b border-cream-300/60 bg-cream-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-tight text-zinc-900 dark:text-cream-100"
          >
            The Steel Mug
          </Link>
          <Link
            href="/menu"
            className="text-sm font-medium uppercase tracking-widest text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
          >
            Menu
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium uppercase tracking-widest text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium uppercase tracking-widest text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {session ? (
            <>
              <CartCount />
              <UserPoints />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">
                {session.user.name}
              </span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-cream-50 transition hover:bg-zinc-700 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
