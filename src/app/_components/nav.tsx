import Link from "next/link";

import { getSession } from "~/server/better-auth/server";
import { SignOutButton } from "./sign-out-button";
import { UserPoints } from "./user-points";

export async function Nav() {
  const session = await getSession();

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-zinc-900 dark:text-white">
            Coffee Shop
          </Link>
          <Link
            href="/menu"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Menu
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <UserPoints />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">
                {session.user.name}
              </span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
