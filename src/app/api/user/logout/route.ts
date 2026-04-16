import { NextRequest, NextResponse } from "next/server";
import { USER_TOKEN } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  res.cookies.delete(USER_TOKEN);
  return res;
}
