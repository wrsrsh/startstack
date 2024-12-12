import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon, Linkedin, LucideIcon, Twitter, X } from "lucide-react";

interface FooterLinkProps {
  href: string;
  title: string;
}

interface FooterSocialLinkProps {
  href: string;
  icon: LucideIcon;
}

const FooterLink = (props: FooterLinkProps) => {
  return (
    <Link
      className="cursor-pointer text-muted-foreground underline-offset-[3px] hover:text-primary hover:underline"
      href={props.href}
    >
      {props.title}
    </Link>
  );
};

const FooterSocialLink = (props: FooterSocialLinkProps) => {
  return (
    <Link
      href={props.href}
      target="_blank"
      className="flex items-center gap-2 text-muted-foreground hover:text-primary"
    >
      <props.icon className="size-[17px]" />
    </Link>
  );
};

const footerSocialLinks: FooterSocialLinkProps[] = [
  {
    href: "https://github.com/asendlabs/startstack",
    icon: GithubIcon,
  },
  { href: "https://x.com/warisareshi", icon: Twitter },
];

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
    <section className="md:px-30 flex w-screen flex-col items-center justify-between border-t border-border px-10 py-5 text-xs sm:px-20 md:flex-row md:text-sm lg:px-40 mt-auto">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <span className="mr-3">© Startstack by Asend Labs | 2024</span>
        {/* {footerLinks.map((link, index) => (
          <FooterLink key={index} {...link} />
        ))} */}
      </div>
      <div className="mt-5 flex items-center gap-4 md:mt-0">
        {footerSocialLinks.map((link, index) => (
          <FooterSocialLink key={index} {...link} />
        ))}
      </div>
    </section>
  );
}
