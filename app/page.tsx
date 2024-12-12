import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Features } from "./_components/features";
import { Hero } from "./_components/hero";

export default async function RootPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </section>
  );
}
