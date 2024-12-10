import { AUTHENTICATED_URL } from "@/constants";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect(AUTHENTICATED_URL);
}
