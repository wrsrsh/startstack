import { Badge } from "@/components/ui/badge";
import React from "react";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Better-Auth + Resend",
    description:
      "Secure authentication system with magic link functionality and GitHub OAuth integration. Includes email delivery via Resend and session management.",
  },
  {
    title: "Next.js 14 + TypeScript",
    description:
      "Modern React framework with App Router and Server Components. Full TypeScript support with strict type checking and API route handlers.",
  },
  {
    title: "Drizzle + PostgreSQL",
    description:
      "Type-safe ORM with PostgreSQL integration. Features schema migrations, prepared statements, and optimized query building support.",
  },
  {
    title: "PostHog Analytics",
    description:
      "Complete analytics integration with event tracking and feature flags. Includes user segmentation tools and dashboard configuration.",
  },
  {
    title: "shadcn/ui + Tailwind",
    description:
      "Accessible component library built on Radix UI primitives. Features responsive styling with Tailwind CSS and built-in theme support.",
  },
  {
    title: "Zod + React Hook Form",
    description:
      "Robust form validation with type-safe schemas and custom hooks. Includes client and server-side validation with seamless integration.",
  },
];

const FeatureCard = ({ title, description }: Feature) => {
  return (
    <div className="flex flex-col items-start px-2 py-4">
      <Badge
        variant="outline"
        className="flex w-full items-center justify-center rounded-full px-3 py-1 text-base font-medium text-orange-500"
      >
        {title}
      </Badge>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export function Features() {
  return (
    <div className="flex w-screen items-center justify-center px-4 pb-20 pt-14 sm:px-36 md:px-48 lg:px-64">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
