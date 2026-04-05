"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

export function CartCount() {
  const { data: count } = api.cart.count.useQuery(undefined, { retry: false });

  return (
    <Link
      href="/cart"
      className="relative rounded-md p-1.5 text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
      aria-label="Cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3H17.25a.75.75 0 0 1 .727.934l-1.959 7.349A1.75 1.75 0 0 1 14.328 12.5H6.672a1.75 1.75 0 0 1-1.69-1.217L3.05 3.649A.25.25 0 0 0 2.806 3.5H1.75A.75.75 0 0 1 1 2.75V1.75ZM6 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM15.5 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      </svg>
      {count != null && count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white dark:bg-brand-400 dark:text-zinc-900">
          {count}
        </span>
      )}
    </Link>
  );
}
