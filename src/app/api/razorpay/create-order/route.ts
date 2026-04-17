import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { total } = await req.json();

    const order = await razorpay.orders.create({
      amount: Math.round(total * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json({ success: false, error: "Failed to create payment order" }, { status: 500 });
  }
}