"use server";

import { cookies } from "next/headers";

export async function SAVE_TOKEN(token: string) {
  cookies().set("token", token);
}

export async function GET_TOKEN() {
  const token = cookies().get("token");
  return token?.value;
}

export async function REMOVE_TOKEN() {
  const token = await GET_TOKEN();
  if (token) cookies().delete("token");
}
