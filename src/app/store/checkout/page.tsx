
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, CreditCard, Banknote, Lock, ChevronRight } from "lucide-react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { clearCart } from "@/lib/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useEffect } from "react";
interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

// ✅ Moved outside CheckoutPage to prevent remount on every render
const InputField = ({
  label,
  field,
  type = "text",
  required = true,
  placeholder = "",
  half = false,
  form,
  updateForm,
}: {
  label: string;
  field: keyof CheckoutForm;
  type?: string;
  required?: boolean;
  placeholder?: string;
  half?: boolean;
  form: CheckoutForm;
  updateForm: (field: keyof CheckoutForm, value: string) => void;
}) => (
  <div className={half ? "col-span-1" : "col-span-2"}>
    <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
      {label} {required && <span className="text-gold">*</span>}
    </label>
    <input
      type={type}
      value={form[field]}
      onChange={(e) => updateForm(field, e.target.value)}
      placeholder={placeholder}
      className="input-luxury"
    />
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, subtotal, tax, shipping, total } = useAppSelector((s) => s.cart);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Prepaid">("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "", email: "", phone: "", addressLine1: "", addressLine2: "",
    city: "", state: "", pincode: "", country: "India",
  });

  const updateForm = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSubmit = async () => {
  //   const required: (keyof CheckoutForm)[] = ["fullName", "email", "phone", "addressLine1", "city", "state", "pincode"];
  //   const missing = required.filter((f) => !form[f].trim());
  //   if (missing.length) {
  //     toast.error("Please fill all required fields", {
  //       style: { background: "#1E1E1E", color: "#EDD99A", border: "1px solid rgba(201,161,74,0.2)" },
  //     });
  //     return;
  //   }
  //   if (items.length === 0) {
  //     toast.error("Your cart is empty");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const orderItems = items.map((item) => ({
  //       product: item.product._id,
  //       name: item.product.name,
  //       price: item.product.price,
  //       quantity: item.quantity,
  //       image: item.product.images[0]?.url || "",
  //     }));

  //     const { data } = await axios.post("/api/orders", {
  //       items: orderItems,
  //       shippingAddress: form,
  //       paymentMethod,
  //       subtotal,
  //       tax,
  //       shipping,
  //       total,
  //     });

  //     if (data.success) {
  //       dispatch(clearCart());
  //       router.push(`/store/order-success?orderId=${data.data._id}`);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to place order. Please try again.", {
  //       style: { background: "#1E1E1E", color: "#EDD99A", border: "1px solid rgba(201,161,74,0.2)" },
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };



  const handleSubmit = async () => {
  const required: (keyof CheckoutForm)[] = ["fullName", "email", "phone", "addressLine1", "city", "state", "pincode"];
  const missing = required.filter((f) => !form[f].trim());
  if (missing.length) {
    toast.error("Please fill all required fields", {
      style: { background: "#1E1E1E", color: "#EDD99A", border: "1px solid rgba(201,161,74,0.2)" },
    });
    return;
  }
  if (items.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  const orderItems = items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.images[0]?.url || "",
  }));

  // ── COD flow ──────────────────────────────────────────
  if (paymentMethod === "COD") {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/orders", {
        items: orderItems,
        shippingAddress: form,
        paymentMethod,
        subtotal,
        tax,
        shipping,
        total,
      });
      if (data.success) {
        dispatch(clearCart());
        router.push(`/store/order-success?orderId=${data.data._id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.", {
        style: { background: "#1E1E1E", color: "#EDD99A", border: "1px solid rgba(201,161,74,0.2)" },
      });
    } finally {
      setIsSubmitting(false);
    }
    return;
  }

  // ── Prepaid / Razorpay flow ───────────────────────────
  setIsSubmitting(true);
  try {
    const { data: rzpData } = await axios.post("/api/razorpay/create-order", { total });
    if (!rzpData.success) throw new Error("Failed to create payment");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: rzpData.order.amount,
      currency: "INR",
      name: "AutoVibe",
      description: "Premium Car Accessories",
      order_id: rzpData.order.id,
      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#C9A14A" },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const { data } = await axios.post("/api/orders", {
            items: orderItems,
            shippingAddress: form,
            paymentMethod: "Prepaid",
            subtotal,
            tax,
            shipping,
            total,
            paymentStatus: "Paid",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          });
          if (data.success) {
            dispatch(clearCart());
            router.push(`/store/order-success?orderId=${data.data._id}`);
          }
        } catch {
          toast.error("Payment done but order saving failed. Contact support.");
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Failed to initiate payment. Please try again.", {
      style: { background: "#1E1E1E", color: "#EDD99A", border: "1px solid rgba(201,161,74,0.2)" },
    });
  } finally {
    setIsSubmitting(false);
  }
};









useEffect(() => {
  if (items.length === 0) {
    router.push("/store/cart");
  }
}, [items, router]);

if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Secure Checkout</span>
          </div>
          <h1 className="font-display text-4xl text-ivory">Complete Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-graphite border border-white/5 rounded-sm p-6"
            >
              <h2 className="flex items-center gap-3 text-ivory font-sans font-medium text-sm tracking-[0.15em] uppercase mb-6">
                <Truck className="w-4 h-4 text-gold" strokeWidth={1.5} />
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Full Name" field="fullName" placeholder="John Doe" form={form} updateForm={updateForm} />
                <InputField label="Email Address" field="email" type="email" placeholder="you@example.com" half form={form} updateForm={updateForm} />
                <InputField label="Phone Number" field="phone" type="tel" placeholder="+91 98765 43210" half form={form} updateForm={updateForm} />
                <InputField label="Address Line 1" field="addressLine1" placeholder="House/Flat No., Street" form={form} updateForm={updateForm} />
                <InputField label="Address Line 2" field="addressLine2" placeholder="Landmark (optional)" required={false} form={form} updateForm={updateForm} />
                <InputField label="City" field="city" placeholder="Mumbai" half form={form} updateForm={updateForm} />
                <div className="col-span-1">
                  <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
                    State <span className="text-gold">*</span>
                  </label>
                  <select
                    value={form.state}
                    onChange={(e) => updateForm("state", e.target.value)}
                    className="input-luxury appearance-none"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <InputField label="Pincode" field="pincode" placeholder="400001" half form={form} updateForm={updateForm} />
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-graphite border border-white/5 rounded-sm p-6"
            >
              <h2 className="flex items-center gap-3 text-ivory font-sans font-medium text-sm tracking-[0.15em] uppercase mb-6">
                <CreditCard className="w-4 h-4 text-gold" strokeWidth={1.5} />
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  { value: "COD", label: "Cash on Delivery", sub: "Pay when your order arrives", Icon: Banknote },
                  { value: "Prepaid", label: "Pay Now (Razorpay)", sub: "UPI, Cards, Net Banking", Icon: CreditCard },
                ] as const).map(({ value, label, sub, Icon }) => (
                  <button
                    key={value}
                    onClick={() => setPaymentMethod(value)}
                    className={`flex items-start gap-4 p-4 border rounded-sm transition-all duration-200 text-left ${
                      paymentMethod === value
                        ? "border-gold/50 bg-gold/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      paymentMethod === value ? "border-gold" : "border-graphite-soft"
                    }`}>
                      {paymentMethod === value && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                        <span className="text-ivory text-sm font-sans font-medium">{label}</span>
                      </div>
                      <p className="text-ash text-xs font-body">{sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              {paymentMethod === "Prepaid" && (
                <div className="mt-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-sm">
                  <p className="text-blue-300 text-[11px] font-sans">
                    You will be redirected to Razorpay&apos;s secure payment gateway after placing the order.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-graphite border border-white/5 rounded-sm p-6 sticky top-28">
              <h2 className="font-display text-xl text-ivory mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.product._id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-obsidian flex-shrink-0">
                      <Image
                        src={item.product.images[0]?.url || "/placeholder-product.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-ivory text-xs font-body leading-tight line-clamp-2">{item.product.name}</p>
                      <p className="text-ash text-[10px] font-sans mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gold text-xs font-sans flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4 mb-5">
                {[
                  { label: "Subtotal", value: formatPrice(subtotal) },
                  // { label: "GST (18%)", value: formatPrice(tax) },
                  { label: "GST (18% incl.)", value: `${formatPrice(tax)} included`, green: false },
                  { label: "Shipping", value: shipping === 0 ? "Free" : formatPrice(shipping), green: shipping === 0 },
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex justify-between text-[11px] font-sans">
                    <span className="text-ash tracking-wider uppercase">{label}</span>
                    <span className={green ? "text-green-400" : "text-smoke"}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-white/5 pt-2 mt-1">
                  <span className="text-ivory font-medium text-[11px] font-sans tracking-wider uppercase">Total</span>
                  <span className="text-gold font-bold text-base font-sans">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
              </Button>

              <div className="flex items-center justify-center gap-1.5 mt-4">
                <Lock className="w-3 h-3 text-graphite-soft" />
                <p className="text-graphite-soft text-[9px] font-sans tracking-widest uppercase">
                  256-bit SSL Secured
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
