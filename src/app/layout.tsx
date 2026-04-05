import "~/styles/globals.css";

import { type Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";

import { Toaster } from "sonner";

import { Nav } from "~/app/_components/nav";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "The Steel Mug",
  description: "Coffee shop and community",
  icons: [
    { rel: "icon", url: "/icons8-coffee-beans-48.png" },
    { rel: "apple-touch-icon", url: "/icons8-coffee-beans-48.png" },
  ],
};

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")})()`,
          }}
        />
      </head>
      <body>
        <TRPCReactProvider>
          <Nav />
          {children}
          <Toaster richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
