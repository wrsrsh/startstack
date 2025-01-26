import { APP_NAME } from "@/constants";
import env from "@/env";
import type { Metadata as NextMetadata } from "next/types";

// Extend Metadata to allow additional flexibility
type OpenGraphType = "website" | "article" | "video.other" | "music.song" | "profile";

interface CustomMetadata extends Omit<NextMetadata, "openGraph"> {
  openGraph?: {
    title?: string; // Ensure this matches the expected type
    description?: string;
    url?: string;
    images?: string[]; // Open Graph images should be an array
    siteName?: string;
    type?: OpenGraphType; // Use extended OpenGraph types
    locale?: string;
    updatedTime?: string; // Optional: Last updated time
  };
}

// Function to create metadata with SEO optimizations
export function createMetadata(override: CustomMetadata): CustomMetadata {
  const defaultImage = "https://demo.better-auth.com/og.png"; // Default Open Graph image
  const currentDate = new Date().toISOString(); // Current date for structured data

  return {
    ...override,
    title: typeof override.title === "string" ? override.title : APP_NAME, // Ensure title is a string
    description:
      typeof override.description === "string"
        ? override.description
        : "The easiest way to get started with your next project", // Default description
    keywords:
      typeof override.keywords === "string"
        ? override.keywords
        : "Next.js, SEO, web development, best practices, modern apps", // Add relevant keywords
    robots: override.robots ?? "index, follow", // Directives for search engines

    openGraph: {
      title:
        typeof override.openGraph?.title === "string"
          ? override.openGraph.title
          : APP_NAME, // Ensure Open Graph title is a string
      description:
        typeof override.openGraph?.description === "string"
          ? override.openGraph.description
          : "The easiest way to get started with your next project",
      url: env.NEXT_PUBLIC_APP_URL,
      images: [defaultImage], // Images should be an array
      siteName: APP_NAME,
      type: override.openGraph?.type ?? "website", // Default Open Graph type
      locale: override.openGraph?.locale ?? "en_US", // Set locale
      updatedTime: currentDate, // Last updated time for the page
      ...override.openGraph,
    },

    twitter: {
      card: "summary_large_image",
      creator: "@warisareshi",
      title:
        typeof override.title === "string" ? override.title : APP_NAME, // Ensure Twitter title is a string
      description:
        typeof override.description === "string"
          ? override.description
          : "The easiest way to get started with your next project",
      images: [defaultImage], // Images should be an array
      ...override.twitter,
    },

    metadataBase:
      override.metadataBase ?? new URL(env.NEXT_PUBLIC_APP_URL), // Base URL for metadata
  };
}
