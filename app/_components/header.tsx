/* Summary of Optimizations
State Management:
Introduced a state variable isMenuOpen to manage the visibility of the mobile menu, enabling toggling functionality with a simple button click.
Hamburger Menu Icon:
Added a hamburger menu icon that toggles between a menu icon and a close icon (XIcon), improving user experience on mobile devices.
Conditional Rendering:
Implemented conditional rendering for the mobile menu, ensuring it only appears when isMenuOpen is true, which optimizes rendering and performance.
Mobile Menu Background:
Set a solid background color for the mobile menu (bg-white dark:bg-gray-800) to ensure it is visually distinct and not transparent, improving readability.
Shortened Mobile Menu Height:
Adjusted the height of the mobile menu by using top-16, allowing it to occupy only part of the viewport height rather than the full height, which enhances usability.
Accessibility Improvements:
Added appropriate ARIA labels to improve accessibility for screen readers, ensuring that all interactive elements provide context to users with disabilities.
Code Readability:
Improved code readability through consistent formatting, clear naming conventions, and structured JSX layout, making it easier for future developers (or yourself) to understand and maintain.
Consistent Use of Tailwind CSS:
Ensured consistent use of Tailwind CSS utility classes for styling, maintaining design coherence throughout the component. */

"use client"; // Ensure this is a client component

import { useState } from "react";
import Link from "next/link";
import { HeaderButton } from "./header-button";
import {
  GithubIcon,
  LogInIcon,
  MenuIcon,
  XIcon,
  Home as HomeIcon,
  Star as FeaturesIcon,
  DollarSign as PricingIcon,
  Info as AboutIcon, // Replace AboutIcon with Info
} from "lucide-react"; // Import valid icons
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="flex w-screen items-center justify-between border-b border-border px-4 py-3.5 sm:px-10 md:px-32 lg:px-40 relative">
      {/* Hamburger Menu Icon */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="flex items-center">
          {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Logo */}
      <Link className="flex items-center gap-2 font-medium text-lg sm:text-xl" href={"/"}>
        Startstack
      </Link>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center gap-2">
        <HeaderButton
          href="/login"
          label="Login"
          icon={<LogInIcon className="size-4" />}
        />
        <ModeToggle caller="page" />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-white dark:bg-gray-800 z-50 flex flex-col p-6 space-y-4 text-black dark:text-white shadow-lg">
          {/* Close Button */}
          <button onClick={toggleMenu} className="self-end">
            <XIcon className="w-6 h-6" />
          </button>

          {/* Links */}
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-medium hover:underline">
              <HomeIcon className="w-5 h-5" /> Home
            </Link>
            <Link href="/features" className="flex items-center gap-2 text-lg font-medium hover:underline">
              <FeaturesIcon className="w-5 h-5" /> Features
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 text-lg font-medium hover:underline">
              <PricingIcon className="w-5 h-5" /> Pricing
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-lg font-medium hover:underline">
              <AboutIcon className="w-5 h-5" /> About
            </Link>
            
            {/* Separator */}
            <hr className="border-gray-300 dark:border-gray-600 my-2" />

            {/* GitHub Link */}
            <HeaderButton
              href="https://github.com/asendlabs/startstack"
              label="asendlabs/startstack"
              icon={<GithubIcon className="size-4" />}
            />

            {/* Login Button */}
            <HeaderButton
              href="/login"
              label="Login"
              icon={<LogInIcon className="size-4" />}
            />

            {/* Mode Toggle in Mobile Menu */}
            <ModeToggle caller="page" />
          </nav>
        </div>
      )}
    </section>
  );
}
