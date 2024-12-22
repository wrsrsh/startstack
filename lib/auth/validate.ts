import { UNAUTHENTICATED_URL } from "@/constants";
import { redirect } from "next/navigation";
import { auth } from "./server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { error } from "console";

export async function protectedRoute() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  if (!res?.session) {
    redirect(UNAUTHENTICATED_URL);
  }
}

export async function protectedApi() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  if (!res?.session) {
    return NextResponse.json(
      {
        message: "You are not authorized to access this resource",
      },
      { status: 401 },
    );
  }
}
