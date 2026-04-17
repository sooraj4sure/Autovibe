import type { Metadata } from "next";
import { Truck, Clock, MapPin, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy — AutoVibe",
  description: "AutoVibe shipping policy and delivery information.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Delivery Info</span>
          </div>
          <h1 className="font-display text-5xl text-ivory mb-4">Shipping Policy</h1>
          <p className="text-ash font-body text-lg leading-relaxed">
            We ensure your order reaches you safely and on time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "Enjoy free shipping on all orders above ₹500. Orders below ₹500 carry a flat ₹99 shipping charge.",
            },
            {
              icon: Clock,
              title: "Delivery Time",
              desc: "Orders are typically delivered within 5–8 business days depending on your location across India.",
            },
            {
              icon: MapPin,
              title: "Shipping Coverage",
              desc: "We ship pan-India. Remote areas may take additional 2–3 business days beyond standard delivery time.",
            },
            {
              icon: ShieldCheck,
              title: "Safe Packaging",
              desc: "Every order is carefully packed to ensure your premium accessories arrive in perfect condition.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-graphite border border-white/5 rounded-sm p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-ivory font-sans font-medium text-sm tracking-wide mb-2">{title}</h2>
                <p className="text-ash font-body text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-graphite border border-white/5 rounded-sm p-8 space-y-4">
          <h2 className="font-display text-2xl text-ivory">Order Processing</h2>
          <p className="text-ash font-body text-sm leading-relaxed">
            Orders are processed within <span className="text-ivory">1–2 business days</span> of placement. You will receive a confirmation email once your order is dispatched with tracking details.
          </p>
          <p className="text-ash font-body text-sm leading-relaxed">
            For any shipping related queries, reach out to us at{" "}
            <a href="mailto:caraccessoriesautovibe@gmail.com" className="text-gold hover:underline">
              caraccessoriesautovibe@gmail.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919220749166" className="text-gold hover:underline">
              +91 92207 49166
            </a>.
          </p>
        </div>

      </div>
    </div>
  );
}