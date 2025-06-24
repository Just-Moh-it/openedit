/// <reference types="vite/client" />

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { seo } from "@/lib/seo";
import appCss from "@/styles/app.css?url";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type * as React from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        url: "https://openeditapp.com",
        title: "OpenEdit - The open source Premiere Pro alternative",
        description:
          "A modern take on video editing built for the web. OpenEdit is a free and open source video editor that allows you to edit videos with a modern interface and a focus on simplicity.",
        image: "/openedit-og.png",
        keywords:
          "OpenEdit, Open Source, Code Editor, AI, Document, Collaboration, Video Editing, Premiere Pro Alternative",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // {
      //   rel: "apple-touch-icon",
      //   sizes: "180x180",
      //   href: "/apple-touch-icon.png",
      // },
      // {
      //   rel: "icon",
      //   type: "image/png",
      //   sizes: "32x32",
      //   href: "/favicon-32x32.png",
      // },
      {
        rel: "icon",
        type: "image/png",
        // sizes: "16x16",
        href: "/favicon.png",
      },
      // { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      // { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <Providers>
        <body className="bg-background font-display text-foreground">
          {children}
          <Toaster richColors />
          <Scripts />
        </body>
      </Providers>
    </html>
  );
}
