// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Order from "@/models/Order";
// import { isAdminAuthenticated, getUserFromRequest } from "@/lib/auth";

// // GET /api/orders/[id] — accessible by admin OR the owning user
// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await connectDB();

//     const order = await Order.findOne({
//       $or: [{ _id: params.id.match(/^[a-f\d]{24}$/i) ? params.id : null }, { orderId: params.id }],
//     })
//       .populate({
//         path: "items.product",
//         select: "name images slug sku category price",
//         model: "Product",
//       })
//       .lean();

//     if (!order) {
//       return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
//     }

//     // Access control: admin OR the user who owns the order
//     const admin = isAdminAuthenticated(req);
//     const user = getUserFromRequest(req);

//     if (!admin && (!user || String(order.userId) !== user.userId)) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     return NextResponse.json({ success: true, data: order });
//   } catch (error) {
//     console.error("Order fetch error:", error);
//     return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 });
//   }
// }

// // PUT /api/orders/[id] — admin only
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const admin = isAdminAuthenticated(req);
//     if (!admin) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();
//     const { orderStatus, paymentStatus, notes } = await req.json();

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const updateData: Record<string, any> = {};
//     if (orderStatus) updateData.orderStatus = orderStatus;
//     if (paymentStatus) updateData.paymentStatus = paymentStatus;
//     if (notes !== undefined) updateData.notes = notes;

//     const order = await Order.findByIdAndUpdate(params.id, updateData, { new: true });

//     if (!order) {
//       return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, data: order, message: "Order updated" });
//   } catch (error) {
//     console.error("Order update error:", error);
//     return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
//   }
// }






import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { isAdminAuthenticated, getUserFromRequest } from "@/lib/auth";

// GET /api/orders/[id] — accessible by admin OR user OR public via orderId
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    // ✅ FIXED: Proper query handling
    const isObjectId = /^[a-f\d]{24}$/i.test(params.id);

    const query = isObjectId
      ? { _id: params.id }
      : { orderId: params.id };

    const order = await Order.findOne(query)
      .populate({
        path: "items.product",
        select: "name images slug sku category price",
        model: "Product",
      })
      .lean();

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ AUTH LOGIC (UPDATED)
    const admin = isAdminAuthenticated(req);
    const user = getUserFromRequest(req);

    // 👉 Allow public access ONLY if using orderId (for success page)
    if (isObjectId && !admin && (!user || String(order.userId) !== user.userId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data: order });

  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id] — admin only
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = isAdminAuthenticated(req);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { orderStatus, paymentStatus, notes } = await req.json();

    const updateData: Record<string, any> = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (notes !== undefined) updateData.notes = notes;

    const order = await Order.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
      message: "Order updated",
    });

  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}