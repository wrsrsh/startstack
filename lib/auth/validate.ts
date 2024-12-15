import { UNAUTHENTICATED_URL } from "@/constants";
import { redirect } from "next/navigation";
import { auth } from "./server";
import { headers } from "next/headers";

export async function authValidator() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  if (!res?.session) {
    redirect(UNAUTHENTICATED_URL);
  }
}