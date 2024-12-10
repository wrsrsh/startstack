import { AUTHENTICATED_URL } from "@/constants";
import { redirect } from "next/navigation";

export default function AppPage() {
  redirect(AUTHENTICATED_URL);
}
