"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
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
  Info as AboutIcon,
  UserCircle, // Replace AboutIcon with Info
} from "lucide-react"; // Import valid icons
import { ModeToggle } from "@/components/mode-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "@/lib/auth/client";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, isMobile]);

  const {data: session} = useSession();

  return (
    <section className="relative flex w-screen items-center justify-between border-b border-border px-4 py-4 sm:px-10 md:px-32 lg:px-40">
      {/* Hamburger Menu Icon */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="flex items-center">
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Logo */}
      <Link
        className="flex items-center gap-2 text-lg font-medium sm:text-lg"
        href={"/"}
      >
        Startstack
      </Link>

      {/* Desktop Buttons */}
      <div className="hidden items-center gap-2 sm:flex">
        <HeaderButton
          href={session?.user && session?.session ? "/app/home" : "/login"}
          label={
            session?.user && session?.session
              ? session.user.name
              : "Login"
          }
          icon={
            session?.user && session?.session ? (
              <UserCircle className="size-4" />
            ) : (
              <LogInIcon className="size-4" />
            )
          }
        />

        <ModeToggle caller="page" />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-14 z-50 flex flex-col space-y-4 bg-white p-6 text-black shadow-lg dark:bg-primary dark:text-white">
          {/* Close Button
          <button onClick={toggleMenu} className="self-end">
            <XIcon className="w-6 h-6" />
          </button> */}

          {/* Links */}
          <nav className="flex flex-col space-y-4">
            {/* GitHub Link */}
            <HeaderButton
              href="https://github.com/asendlabs/startstack"
              label="asendlabs/startstack"
              icon={<GithubIcon className="size-4" />}
            />

            {/* Login Button */}
            <HeaderButton
              href={session?.user && session?.session ? "/app/home" : "/login"}
              label={
                session?.user && session?.session
                  ? `Welcome back, ${session.user.name}`
                  : "Login"
              }
              icon={
                session?.user && session?.session ? (
                  <UserCircle className="size-4" />
                ) : (
                  <LogInIcon className="size-4" />
                )
              }
            />

            {/* Mode Toggle in Mobile Menu */}
            <ModeToggle caller="page" />
          </nav>
        </div>
      )}
    </section>
  );
}
