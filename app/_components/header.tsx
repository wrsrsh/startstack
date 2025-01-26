"use client"; // Ensure this is a client component

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from 'next/image';
import { HeaderButton } from "./header-button";
import { LogInIcon, MenuIcon, XIcon, Home as HomeIcon, Star as FeaturesIcon, DollarSign as PricingIcon, Info as AboutIcon, UserCircle, ExternalLink as GitHubIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "@/lib/auth/client";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, isMobile]);

  const { data: session } = useSession();

  const mobileMenuLinks = useMemo(() => (
    [
      { href: "/", label: "Home", Icon: HomeIcon },
      { href: "/features", label: "Features", Icon: FeaturesIcon },
      { href: "/pricing", label: "Pricing", Icon: PricingIcon },
      { href: "/about", label: "About", Icon: AboutIcon }
    ]
  ), []);

  return (
    <section className="relative flex w-screen items-center justify-between border-b border-border px-4 py-4 sm:px-10 md:px-32 lg:px-40">
      {/* Hamburger Menu Icon */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="flex items-center">
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Logo */}
      <Link className="flex items-center gap-2 text-lg font-medium sm:text-lg" href="/">
        <Image
          src="/logo.png"
          alt="Startstack Logo"
          width={30}
          height={30}
          priority // Priority image loading for faster display
        />
        Startstack
      </Link>

      {/* Desktop Menu Links */}
      <div className="hidden sm:flex items-center justify-center flex-grow">
        <nav className="flex space-x-6">
          {[
            { href: "/", label: "Home", Icon: HomeIcon },
            { href: "/features", label: "Features", Icon: FeaturesIcon },
            { href: "/pricing", label: "Pricing", Icon: PricingIcon },
            { href: "/about", label: "About", Icon: AboutIcon }
          ].map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="flex items-center text-gray-800 dark:text-gray-500 hover:underline font-normal">
              <Icon className="mr-2" /> {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden items-center gap-2 sm:flex">
        <HeaderButton
          href={session?.user && session?.session ? "/app/home" : "/login"}
          label={session?.user && session?.session ? session.user.name : "Login"}
          icon={session?.user && session?.session ? <UserCircle className="size-4" /> : <LogInIcon className="size-4" />}
        />

        <ModeToggle caller="page" />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-14 z-50 flex flex-col space-y-4 bg-white p-6 text-black shadow-lg dark:bg-primary dark:text-white">
          {/* Close Button */}
          <button onClick={toggleMenu} className="self-end">
            <XIcon className="w-6 h-6" />
          </button>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col space-y-4">
            {mobileMenuLinks.map(({ href, label, Icon }) => (
              <Link key={href} href={href} className="flex items-center text-black dark:text-white hover:underline font-bold">
                <Icon className="mr-2" /> {label}
              </Link>
            ))}

            {/* Separator */}
            <hr className="border-gray-300 dark:border-gray-700 my-2"/>

            {/* Links */}
            <HeaderButton
              href="https://github.com/asendlabs/startstack"
              label="asendlabs/startstack"
              icon={<GitHubIcon className="size-4" />}
            />

            {/* Login Button */}
            <HeaderButton
              href={session?.user && session?.session ? "/app/home" : "/login"}
              label={session?.user && session?.session ? `Welcome back, ${session.user.name}` : "Login"}
              icon={session?.user && session?.session ? <UserCircle className="size-4" /> : <LogInIcon className="size-4" />}
            />

            {/* Mode Toggle in Mobile Menu */}
            <ModeToggle caller="page" />
          </nav>
        </div>
      )}
    </section>
  );
}
