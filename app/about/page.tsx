import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import components with proper typing - for speedy loading and lower CPU and memory loading
const Header = dynamic(() => import("../_components/header").then((mod) => mod.Header));
const Footer = dynamic(() => import("../_components/footer").then((mod) => mod.Footer));

export default function AboutPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>

      {/* Hero Section */}
{/*       <section className="hero bg-red-600 text-black py-20 text-center">
        <h1 className="text-4xl font-bold">About StartStack</h1>
        <p className="mt-4 text-lg">
          StartStack is a comprehensive SaaS template designed to help you quickly build and scale your startup with minimal effort.
        </p>
      </section> */}

      {/* About Content */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center">Our Mission</h2>
        <p className="mt-4 text-lg text-center">
          StartStack offers a powerful yet easy-to-use platform for SaaS businesses to manage their operations, 
          streamline workflows, and provide an exceptional customer experience. Our template includes essential tools 
          for businesses to grow and scale quickly, without getting bogged down by unnecessary complexity.
        </p>
        
        <div className="mt-12 text-center">
          <img
            src="/images/hero/hero-orange.jpg"
            alt="StartStack Platform"
            className="mx-auto rounded-lg shadow-lg"
            width={800}
            height={450}
          />
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="bg-gray-900 py-16">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="/images/avatars/avatar3.jpg"
              alt="Team Member 1"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
            />
            <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
            <p className="mt-2 text-gray-600">Founder & CEO</p>
            <p className="mt-2 text-gray-500">
              John is a seasoned entrepreneur with a passion for building scalable businesses and empowering teams.
            </p>
          </div>

          <div className="text-center">
            <img
  src="/images/avatars/avatar2.avif"
              alt="Team Member 2"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
            />
            <h3 className="mt-4 text-xl font-semibold">Jane Smith</h3>
            <p className="mt-2 text-gray-600">Lead Developer</p>
            <p className="mt-2 text-gray-500">
              Jane brings a wealth of experience in building high-performing systems and crafting user-centric designs.
            </p>
          </div>

          <div className="text-center">
            <img
  src="/images/avatars/avatar1.avif"
              alt="Team Member 3"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
            />
            <h3 className="mt-4 text-xl font-semibold">Alex Johnson</h3>
            <p className="mt-2 text-gray-600">Marketing Director</p>
            <p className="mt-2 text-gray-500">
              Alex has a keen eye for digital marketing and growth strategies, helping startups attract and retain users.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </section>
  );
}
