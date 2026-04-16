import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStatement from "@/components/home/BrandStatement";

export const metadata: Metadata = {
  title: "AutoVibe — Premium Car Accessories",
  description: "Discover luxury automotive accessories for the discerning driver.",
};

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <div id="featured">
        <Suspense fallback={<div className="h-96 bg-obsidian animate-pulse" />}>
          <FeaturedProducts />
        </Suspense>
      </div>
      <CategoriesSection />
      <BrandStatement />
      <TestimonialsSection />
    </div>
  );
}
