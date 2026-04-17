import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AutoVibe",
  description: "AutoVibe privacy policy — how we collect and use your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Legal</span>
          </div>
          <h1 className="font-display text-5xl text-ivory mb-4">Privacy Policy</h1>
          <p className="text-ash font-body text-lg leading-relaxed">
            Your privacy matters to us. Here&apos;s how we handle your information.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "Information We Collect",
              content:
                "When you place an order, we collect your name, email address, phone number, and shipping address. This information is used solely to process and deliver your order.",
            },
            {
              title: "How We Use Your Information",
              content:
                "Your details are used to fulfill orders, send order confirmations, and provide customer support. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
            },
            {
              title: "Payment Security",
              content:
                "All payments are processed through Razorpay's secure payment gateway. AutoVibe does not store any card or payment details on our servers. Your financial data is fully encrypted and protected.",
            },
            {
              title: "Cookies",
              content:
                "We use cookies to improve your browsing experience and remember your cart. You can disable cookies in your browser settings, though some features may not function correctly.",
            },
            {
              title: "Data Retention",
              content:
                "We retain your order information for record-keeping and legal compliance purposes. You may request deletion of your personal data by contacting us at caraccessoriesautovibe@gmail.com.",
            },
            {
              title: "Contact",
              content:
                "For any privacy-related concerns, email us at caraccessoriesautovibe@gmail.com or call +91 92207 49166. We are based at Kashmere Gate, Delhi, India.",
            },
          ].map(({ title, content }) => (
            <div key={title} className="bg-graphite border border-white/5 rounded-sm p-8">
              <h2 className="font-display text-xl text-ivory mb-3">{title}</h2>
              <p className="text-ash font-body text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <p className="text-ash/50 text-[11px] font-sans text-center mt-10">
          Last updated — April 2025 · AutoVibe, Kashmere Gate, Delhi, India
        </p>

      </div>
    </div>
  );
}