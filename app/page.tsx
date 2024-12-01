import { Github, LogIn } from "lucide-react";
import Link from "next/link";
import { NavigationButton } from "@/components/navigation-button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-semibold tracking-wide">StartStack</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by creating correct environment variables
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold ml-2 text-inherit">
              cp .env.example .env
            </code>
            .
          </li>
          <li>Save and StartStack will be functional.</li>
        </ol>

        <div className="flex gap-2 items-center flex-col sm:flex-row">
          <NavigationButton href="/login">
            <LogIn className="h-4 w-4" />
            Login
          </NavigationButton>
          <NavigationButton href="https://github.com/warisareshi/startstack" variant={"outline"}>
            <Github className="h-4 w-4" />
            Github
          </NavigationButton>
        </div>
      </main>
      <ModeToggle className="absolute top-4 right-4"/>
    </div>
  );
}
