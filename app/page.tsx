import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import components with proper typing - for speedy loading and lower CPU and memory loading
const Header = dynamic(() => import("./_components/header").then((mod) => mod.Header));
const Footer = dynamic(() => import("./_components/footer").then((mod) => mod.Footer));
const Features = dynamic(() => import("./_components/features").then((mod) => mod.Features));
const Hero = dynamic(() => import("./_components/hero").then((mod) => mod.Hero));

export default function RootPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Features />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </section>
  );
}
