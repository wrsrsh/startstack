import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="size-5 animate-spin" />
    </section>
  );
}
