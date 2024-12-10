import { APP_NAME } from "@/constants";
import env from "@/env";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: env.NEXT_PUBLIC_APP_URL,
      images: "https://demo.better-auth.com/og.png",
      siteName: APP_NAME,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@warisareshi",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "https://demo.better-auth.com/og.png",
      ...override.twitter,
    },
    metadataBase: override.metadataBase ?? new URL(env.NEXT_PUBLIC_APP_URL),
  };
}
