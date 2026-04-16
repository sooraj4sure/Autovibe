import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { isAdminAuthenticated, getUserFromRequest } from "@/lib/auth";

// GET /api/orders - Fetch all orders (Admin only)
export async function GET(req: NextRequest) {
  try {
    const admin = isAdminAuthenticated(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const orderStatus = searchParams.get("orderStatus");
    const paymentMethod = searchParams.get("paymentMethod");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (orderStatus) query.orderStatus = orderStatus;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { "shippingAddress.fullName": { $regex: search, $options: "i" } },
        { "shippingAddress.email": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate({
        path: "items.product",
        select: "name images slug sku category price",
        model: "Product",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders - Create a new order (Public, optionally authenticated)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { items, shippingAddress, paymentMethod, subtotal, tax, shipping, total } = body;

    if (!items?.length || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Attach userId if user is logged in
    const loggedInUser = getUserFromRequest(req);

    const order = new Order({
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
      ...(loggedInUser?.userId ? { userId: loggedInUser.userId } : {}),
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await order.save();

    return NextResponse.json(
      { success: true, data: order, message: "Order placed successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Order create error:", error);
    const message = error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
