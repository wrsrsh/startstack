import React from "react";
import { PageTitle } from "@/components/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Home",
  },
};

export default function HomeRoute() {
  return (
    <section>
      <PageTitle selfLabel="Home" />

    </section>
  );
}
