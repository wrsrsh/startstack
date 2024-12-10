import { UNAUTHENTICATED_URL } from "@/constants";
import { redirect } from "next/navigation";
import { auth } from ".";
import { headers } from "next/headers";

export async function authValidator() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  if (!res?.session) {
    redirect(UNAUTHENTICATED_URL);
  }
}
