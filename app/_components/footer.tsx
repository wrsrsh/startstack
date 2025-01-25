/* Key Changes Made-by VocanecsA
Destructured Props:
Destructured props directly in the function parameters for cleaner syntax.
Use of React.ElementType:
Used React.ElementType for the icon prop type in FooterSocialLink, which is more flexible and allows any valid React component.
Accessibility Improvements:
Added aria-label attributes to social links for better accessibility.
Security Best Practices:
Added rel="noopener noreferrer" to external links to improve security.
Commented Code:
Kept the commented-out footer links code clean and ready for future use without cluttering the main render logic.
Consistent Use of Fragments:
Used shorthand fragments (<>) only where necessary; in this case, it wasn't needed since we have a single parent element. */

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon, Twitter } from "lucide-react";

interface FooterLinkProps {
  href: string;
  title: string;
}

interface FooterSocialLinkProps {
  href: string;
  icon: React.ElementType; // Use React.ElementType for better typing
}

const FooterLink = ({ href, title }: FooterLinkProps) => (
  <Link
    className="cursor-pointer text-muted-foreground underline-offset-[3px] hover:text-primary hover:underline"
    href={href}
  >
    {title}
  </Link>
);

const FooterSocialLink = ({ href, icon: Icon }: FooterSocialLinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer" // Security best practice
    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
    aria-label={`Visit our ${
      typeof Icon === "function" && Icon.displayName ? Icon.displayName : "social media"
    } page`} // Safely handle displayName
  >
    <Icon className="size-[17px]" />
  </Link>
);


const footerSocialLinks: FooterSocialLinkProps[] = [
  {
    href: "https://github.com/asendlabs/startstack",
    icon: GithubIcon,
  },
  {
    href: "https://twitter.com/warisareshi",
    icon: Twitter,
  },
];

// Uncomment when ready to use footer links
// const footerLinks: FooterLinkProps[] = [
//   {
//     href: "/policies/privacy",
//     title: "Privacy Policy",
//   },
//   {
//     href: "/policies/terms",
//     title: "Terms and Conditions",
//   },
//   {
//     href: "/policies/refund",
//     title: "Refund Policy",
//   },
// ];

export function Footer() {
  return (
    <footer className="md:px-30 flex w-screen flex-col items-center justify-between border-t border-border px-10 py-5 text-xs sm:px-20 md:flex-row md:text-sm lg:px-40 mt-auto">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <span className="mr-3">© Startstack by Asend Labs | 2024</span>
        {/* Uncomment when ready to use footer links */}
        {/* {footerLinks.map((link, index) => (
          <FooterLink key={index} {...link} />
        ))} */}
      </div>
      <div className="mt-5 flex items-center gap-4 md:mt-0">
        {footerSocialLinks.map((link, index) => (
          <FooterSocialLink key={index} {...link} />
        ))}
      </div>
    </footer>
  );
}
