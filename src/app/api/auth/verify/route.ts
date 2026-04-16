import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = isAdminAuthenticated(req);

  if (!admin) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: { email: admin.email, role: admin.role },
  });
}
