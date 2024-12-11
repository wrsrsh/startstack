"use client";
import env from "@/env";
import posthog from "posthog-js";
import { PostHogProvider as PGP } from "posthog-js/react";
import { useEffect } from "react";
import React from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!env.NEXT_PUBLIC_POSTHOG_API_KEY) return;
    posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      secure_cookie: process.env.NODE_ENV === "production",
      person_profiles: "identified_only",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }, []);

  if (!env.NEXT_PUBLIC_POSTHOG_API_KEY || !env.NEXT_PUBLIC_POSTHOG_HOST) {
    return <>{children}</>;
  }
  return <PGP client={posthog}>{children}</PGP>;
}
