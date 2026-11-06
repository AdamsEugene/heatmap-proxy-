import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { PortalFrame } from "@/components/portal-frame";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b068" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <Suspense
            fallback={
              <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-portal px-4 py-10 sm:px-6 lg:px-8">
                  <div className="h-9 w-48 animate-pulse rounded-surface bg-canvas" />
                  <div className="mt-6 h-64 animate-pulse rounded-portal border border-border bg-card" />
                </div>
              </div>
            }
          >
            <PortalFrame>{children}</PortalFrame>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
