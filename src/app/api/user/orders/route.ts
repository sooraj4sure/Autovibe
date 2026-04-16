import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Please log in to view your orders" }, { status: 401 });
  }

  try {
    await connectDB();

    const orders = await Order.find({ userId: user.userId })
      .populate({
        path: "items.product",
        select: "name images slug category",
        model: "Product",
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: orders });
  } catch (err) {
    console.error("User orders fetch error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
