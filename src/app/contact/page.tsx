import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — AutoVibe",
  description: "Get in touch with AutoVibe for any queries or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Get In Touch</span>
          </div>
          <h1 className="font-display text-5xl text-ivory mb-4">Contact Us</h1>
          <p className="text-ash font-body text-lg leading-relaxed">
            Have a question or need help with your order? We&apos;re here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Mail,
              label: "Email Us",
              value: "caraccessoriesautovibe@gmail.com",
              href: "mailto:caraccessoriesautovibe@gmail.com",
            },
            {
              icon: Phone,
              label: "Call Us",
              value: "+91 92207 49166",
              href: "tel:+919220749166",
            },
            {
              icon: MapPin,
              label: "Visit Us",
              value: "Kashmere Gate, Delhi, India",
              href: "https://maps.google.com/?q=Kashmere+Gate,Delhi,India",
            },
          ].map(({ icon: Icon, label, value, href }) => (
            <a 
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-graphite border border-white/5 hover:border-gold/30 rounded-sm p-8 flex flex-col items-center text-center gap-4 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-1">{label}</p>
                <p className="text-ivory font-body text-sm leading-relaxed">{value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 bg-graphite border border-white/5 rounded-sm p-8">
          <p className="text-ash font-body text-sm leading-relaxed text-center">
            Our team is available <span className="text-ivory">Monday – Saturday, 10am – 7pm IST</span>. We typically respond within a few hours.
          </p>
        </div>

      </div>
    </div>
  );
}