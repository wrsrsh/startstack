import React from "react";
import Link from "next/link";

interface HeaderButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export function HeaderButton({ href, label, icon }: HeaderButtonProps) {
  return (
    <Link
      className="m-0 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border !py-0 px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      href={href}
      prefetch={true}
    >
      {icon}
      {label}
    </Link>
  );
}
