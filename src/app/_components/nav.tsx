import Link from "next/link";

import { getSession } from "~/server/better-auth/server";
import { CartCount } from "./cart-count";
import { SignOutButton } from "./sign-out-button";
import { ThemeToggle } from "./theme-toggle";
import { UserPoints } from "./user-points";

export async function Nav() {
  const session = await getSession();

  return (
    <nav className="border-b border-cream-200 bg-cream-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-brand-600 dark:text-brand-400">
            The Steel Mug
          </Link>
          <Link
            href="/menu"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Menu
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
              className="rounded-md bg-brand-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-brand-600 dark:bg-brand-400 dark:text-zinc-900 dark:hover:bg-brand-300"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
