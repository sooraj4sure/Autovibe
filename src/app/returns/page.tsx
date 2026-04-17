import type { Metadata } from "next";
import { RefreshCw, Mail, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Return Policy — AutoVibe",
  description: "AutoVibe return and refund policy.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Returns & Refunds</span>
          </div>
          <h1 className="font-display text-5xl text-ivory mb-4">Return Policy</h1>
          <p className="text-ash font-body text-lg leading-relaxed">
            We want you to be completely satisfied with your purchase.
          </p>
        </div>

        {/* Important notice */}
        <div className="bg-gold/5 border border-gold/20 rounded-sm p-6 flex gap-4 mb-8">
          <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-ivory font-sans font-medium text-sm mb-1">Important — 24 Hour Window</p>
            <p className="text-ash font-body text-sm leading-relaxed">
              Returns are only accepted if you email us within <span className="text-gold font-medium">24 hours of delivery</span>. Requests made after this window will not be entertained.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {[
            {
              icon: CheckCircle,
              title: "Eligible for Return",
              items: [
                "Damaged or defective product",
                "Wrong item delivered",
                "Product significantly different from description",
              ],
            },
            {
              icon: AlertTriangle,
              title: "Not Eligible for Return",
              items: [
                "Request made after 24 hours of delivery",
                "Product is used or installed",
                "Missing original packaging",
              ],
            },
          ].map(({ icon: Icon, title, items }) => (
            <div key={title} className="bg-graphite border border-white/5 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                <h2 className="text-ivory font-sans font-medium text-sm tracking-wide">{title}</h2>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-ash font-body text-sm flex gap-2">
                    <span className="text-gold mt-1">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-graphite border border-white/5 rounded-sm p-8 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
            <h2 className="font-display text-2xl text-ivory">How to Initiate a Return</h2>
          </div>
          <p className="text-ash font-body text-sm leading-relaxed">
            Email us at{" "}
            <a href="mailto:caraccessoriesautovibe@gmail.com" className="text-gold hover:underline">
              caraccessoriesautovibe@gmail.com
            </a>{" "}
            within 24 hours of receiving your order. Include your order ID, a description of the issue, and photos of the product.
          </p>
          <p className="text-ash font-body text-sm leading-relaxed">
            Once approved, we will arrange a pickup or guide you through the return process. Refunds are processed within <span className="text-ivory">5–7 business days</span> after we receive the product.
          </p>
        </div>

      </div>
    </div>
  );
}