"use client";

import { useState } from "react";
import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import { CartCount } from "./cart-count";
import { UserPoints } from "./user-points";
import { SignOutButton } from "./sign-out-button";

export function MobileMenu({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-md p-1.5 text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-cream-300/60 bg-cream-50 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-widest text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Menu
            </Link>
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-widest text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Events
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-widest text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              About
            </Link>

            <div className="my-1 border-t border-cream-300/60 dark:border-zinc-800" />

            <div className="flex items-center gap-3 px-3 py-2">
              <ThemeToggle />
              {isSignedIn ? (
                <>
                  <CartCount />
                  <UserPoints />
                  <SignOutButton />
                </>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-cream-50 transition hover:bg-zinc-700 dark:bg-cream-100 dark:text-zinc-900 dark:hover:bg-cream-200"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
