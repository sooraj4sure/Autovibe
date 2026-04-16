/**
 * LuxeAuto Database Seed Script
 * Run with: node scripts/seed.js
 *
 * Make sure MONGODB_URI is set in .env.local before running.
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// ─── Sample Products ──────────────────────────────────────────────────────────
const SAMPLE_PRODUCTS = [
  {
    name: "Carbon Fibre Steering Wheel Cover",
    slug: "carbon-fibre-steering-wheel-cover",
    shortDescription: "Hand-stitched Alcantara and carbon fibre steering wheel cover for a race-inspired cockpit experience.",
    description: "Elevate your driving experience with our premium carbon fibre steering wheel cover, featuring genuine Alcantara suede inserts and precision stitching. The lightweight carbon weave provides exceptional grip, while the Alcantara thumb pads ensure maximum control during spirited driving. Compatible with most 37-38mm diameter steering wheels.",
    price: 8500,
    comparePrice: 12000,
    category: "Interior",
    sku: "INT-SW-001",
    stock: 45,
    isFeatured: true,
    isActive: true,
    tags: ["carbon", "steering", "interior", "alcantara"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        publicId: "sample/steering-wheel",
        alt: "Carbon Fibre Steering Wheel Cover"
      }
    ],
    specifications: new Map([
      ["Material", "Carbon Fibre + Alcantara"],
      ["Compatibility", "37-38mm steering wheels"],
      ["Weight", "180g"],
      ["Finish", "Gloss Carbon / Matte Alcantara"],
    ])
  },
  {
    name: "LED Puddle Light Set — Ghost Logo",
    slug: "led-puddle-light-set-ghost-logo",
    shortDescription: "High-definition LED puddle lights that project your car's emblem on the ground when the door opens.",
    description: "Make a statement every time you step out. Our Ghost Logo LED puddle lights project a crystal-clear, full-colour logo directly beneath your car door. Easy plug-and-play installation replaces your factory courtesy lights. The ultra-bright 5W CREE LED delivers razor-sharp image clarity even in daylight. Available for all major luxury brands.",
    price: 3200,
    comparePrice: 4800,
    category: "Lighting",
    sku: "LIT-PL-002",
    stock: 120,
    isFeatured: true,
    isActive: true,
    tags: ["led", "puddle light", "logo", "lighting"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        publicId: "sample/puddle-light",
        alt: "LED Puddle Light"
      }
    ],
    specifications: new Map([
      ["Power", "5W CREE LED"],
      ["Projection Distance", "30-50cm"],
      ["Installation", "Plug & Play"],
      ["Colour", "Full Colour HD"],
    ])
  },
  {
    name: "Premium All-Weather Floor Mats",
    slug: "premium-all-weather-floor-mats",
    shortDescription: "3D-scanned precision-fit floor mats in luxury XPE rubber with laser-cut edges and raised lip containment.",
    description: "Protect your investment with our precision-engineered all-weather floor mats. Laser-scanned to your exact vehicle model, these mats provide complete coverage without gaps. The premium XPE rubber construction is odour-free, anti-slip, and completely waterproof. A raised 15mm containment lip keeps mud, water and debris perfectly contained.",
    price: 6800,
    comparePrice: null,
    category: "Interior",
    sku: "INT-FM-003",
    stock: 78,
    isFeatured: false,
    isActive: true,
    tags: ["floor mats", "interior", "all-weather", "rubber"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1449130842459-0b9b00cef9d9?w=800",
        publicId: "sample/floor-mats",
        alt: "Premium Floor Mats"
      }
    ],
    specifications: new Map([
      ["Material", "XPE Rubber"],
      ["Fit Type", "Precision Laser-Cut"],
      ["Lip Height", "15mm"],
      ["Odour", "Odour-Free"],
    ])
  },
  {
    name: "Android Auto / CarPlay Wireless Adapter",
    slug: "android-auto-carplay-wireless-adapter",
    shortDescription: "Convert your wired Apple CarPlay or Android Auto to fully wireless in seconds. Zero lag, plug-and-play.",
    description: "Cut the cord without cutting features. Our premium wireless adapter bridges your phone to your car's factory infotainment system with zero perceptible lag. Using the latest Bluetooth 5.0 and 5GHz WiFi dual-band technology, it streams maps, music and calls with studio-quality reliability. Simply plug into your USB port and pair once — it reconnects automatically every time.",
    price: 4500,
    comparePrice: 6000,
    category: "Tech Accessories",
    sku: "TEC-CP-004",
    stock: 200,
    isFeatured: true,
    isActive: true,
    tags: ["carplay", "android auto", "wireless", "tech"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
        publicId: "sample/carplay-adapter",
        alt: "Wireless CarPlay Adapter"
      }
    ],
    specifications: new Map([
      ["Connectivity", "Bluetooth 5.0 + 5GHz WiFi"],
      ["Compatibility", "Apple CarPlay + Android Auto"],
      ["Latency", "<80ms"],
      ["Power", "USB-A / USB-C"],
    ])
  },
  {
    name: "Sport Brake Caliper Paint Kit",
    slug: "sport-brake-caliper-paint-kit",
    shortDescription: "Professional-grade, heat-resistant caliper paint that transforms your brakes into a visual statement. 6 premium colours.",
    description: "Give your brakes the attention they deserve. Our professional brake caliper paint is formulated with ceramic micro-particles to withstand sustained temperatures up to 500°C without fading, cracking or peeling. The included primer, paint and clear lacquer system produces a factory-quality finish in your choice of six premium colours — from classic Racing Red to Stealth Gloss Black.",
    price: 2800,
    category: "Exterior",
    sku: "EXT-BP-005",
    stock: 65,
    isFeatured: false,
    isActive: true,
    tags: ["brakes", "exterior", "paint", "performance"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        publicId: "sample/caliper-paint",
        alt: "Brake Caliper Paint Kit"
      }
    ],
    specifications: new Map([
      ["Heat Resistance", "Up to 500°C"],
      ["Finish", "High Gloss"],
      ["Coverage", "2 Calipers per kit"],
      ["Curing Time", "24 hours"],
    ])
  },
  {
    name: "Forged Aluminium Shift Paddle Extensions",
    slug: "forged-aluminium-shift-paddle-extensions",
    shortDescription: "CNC-machined aluminium paddle shift extensions with non-slip texture. Direct bolt-on for all major DCT and automatic gearboxes.",
    description: "Engineered for the performance-focused driver, these CNC-machined aluminium paddle extensions significantly increase the contact surface area of your shift paddles, making high-speed gear changes faster and more reliable. The aerospace-grade 6061 aluminium construction is then anodised in Gunmetal, Gold, or Gloss Black. No drilling required — uses a precision snap-fit system.",
    price: 3600,
    comparePrice: 5200,
    category: "Performance",
    sku: "PER-PP-006",
    stock: 89,
    isFeatured: true,
    isActive: true,
    tags: ["paddle shifters", "performance", "aluminium", "gearbox"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
        publicId: "sample/paddle-shifters",
        alt: "Aluminium Shift Paddle Extensions"
      }
    ],
    specifications: new Map([
      ["Material", "6061 Aerospace Aluminium"],
      ["Finish", "Anodised (3 colours)"],
      ["Fitment", "Universal Snap-Fit"],
      ["Weight", "45g per pair"],
    ])
  },
  {
    name: "Ambient Lighting Strip Kit (64-Colour)",
    slug: "ambient-lighting-strip-kit-64-colour",
    shortDescription: "Ultra-thin LED ambient lighting strips with 64 colours and voice/app control. Transforms any cabin at night.",
    description: "Recreate the ambiance of a luxury executive vehicle in your own car. Our paper-thin (1.2mm) LED strips mount invisibly under dashboard edges, footwells and centre console profiles using 3M automotive-grade adhesive. The companion app offers 64 individual colour zones, breathing effects, music sync via the built-in microphone, and voice control via Alexa and Google Assistant.",
    price: 5200,
    comparePrice: 7500,
    category: "Interior",
    sku: "INT-AL-007",
    stock: 156,
    isFeatured: false,
    isActive: true,
    tags: ["ambient lighting", "led", "interior", "atmosphere"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        publicId: "sample/ambient-lighting",
        alt: "Ambient Lighting Strip Kit"
      }
    ],
    specifications: new Map([
      ["Colours", "64 Million colours"],
      ["Control", "App + Voice (Alexa/Google)"],
      ["Strip Thickness", "1.2mm"],
      ["Adhesive", "3M Automotive Grade"],
    ])
  },
  {
    name: "Ceramic Paint Protection Film (PPF) Kit",
    slug: "ceramic-paint-protection-film-kit",
    shortDescription: "Self-healing TPU paint protection film with nano-ceramic coating for the highest level of paint preservation.",
    description: "The last line of defence against stone chips, minor scratches and environmental damage. Our TPU-based paint protection film features patented self-healing technology — shallow scratches and swirl marks literally disappear when exposed to heat (sunlight or warm water). The included nano-ceramic top coat layer provides an additional barrier against chemical stains, UV rays and bird droppings.",
    price: 18500,
    comparePrice: 26000,
    category: "Protection",
    sku: "PRO-PPF-008",
    stock: 32,
    isFeatured: true,
    isActive: true,
    tags: ["ppf", "protection", "ceramic", "paint"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
        publicId: "sample/ppf",
        alt: "PPF Protection Film"
      }
    ],
    specifications: new Map([
      ["Material", "Polyurethane (TPU)"],
      ["Self-Healing", "Yes — Heat Activated"],
      ["UV Resistance", "99.9%"],
      ["Warranty", "5 Years"],
    ])
  },
];

// ─── Mongoose Schema (minimal inline) ────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  shortDescription: String,
  description: String,
  price: Number,
  comparePrice: Number,
  category: String,
  sku: { type: String, unique: true },
  stock: Number,
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  tags: [String],
  images: [{ url: String, publicId: String, alt: String }],
  specifications: { type: Map, of: String },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected\n");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products\n");

    // Insert sample products
    const inserted = await Product.insertMany(SAMPLE_PRODUCTS);
    console.log(`✅ Seeded ${inserted.length} products:\n`);
    inserted.forEach((p) => console.log(`  • ${p.name} (${p.category}) — ₹${p.price.toLocaleString()}`));

    console.log("\n🎉 Seed complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

seed();
