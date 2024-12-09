import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Loader2 className="size-5 animate-spin" />
    </section>
  );
}
