import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { isAdminAuthenticated } from "@/lib/auth";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const admin = isAdminAuthenticated(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [
      totalOrders,
      pendingOrders,
      totalProducts,
      totalUsers,
      revenueResult,
      recentOrders,
      ordersByStatus,
      ordersByPayment,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "Pending" }),
      Product.countDocuments({ isActive: true }),
      User.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: "Paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("items.product", "name images slug")
        .lean(),
      Order.aggregate([
        { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $group: { _id: "$paymentMethod", count: { $sum: 1 } } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        totalProducts,
        totalUsers,
        totalRevenue: revenueResult[0]?.total || 0,
        recentOrders,
        ordersByStatus: ordersByStatus.reduce(
          (acc: Record<string, number>, item: { _id: string; count: number }) => {
            acc[item._id] = item.count;
            return acc;
          },
          {}
        ),
        ordersByPayment: ordersByPayment.reduce(
          (acc: Record<string, number>, item: { _id: string; count: number }) => {
            acc[item._id] = item.count;
            return acc;
          },
          {}
        ),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
