import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h2 className="text-4xl font-bold ">
        Uh, oh. We couldn't find that page.
      </h2>
      <Link
        href="/app/home"
        className="px-3 py-2 border border-input rounded-lg flex gap-2 items-center hover:bg-muted "
      >
        <ArrowLeft className="size-5" />
        Return Home
      </Link>
    </main>
  );
}
