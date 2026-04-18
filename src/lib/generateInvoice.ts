// lib/generateInvoice.ts
// Install dependency: npm install jspdf
// Place this file at: lib/generateInvoice.ts

import jsPDF from "jspdf";
import { Order } from "@/types";

// ─────────────────────────────────────────────
//  COMPANY DETAILS — update these
// ─────────────────────────────────────────────
const COMPANY = {
  name: "Auto Vibe Car Accessories",
  tagline: "Feel The Luxury",         // optional, leave "" to hide
  addressLine1: "C-8 Street No - 01",
  addressLine2: "North East Delhi, Delhi, 110053",
  phone: "+91 9220749166",
  email: "caraccessoriesautovibe@gmail.com",
  gstin: "07JSLPK4085D1ZF",
  website: "www.autovibe-alpha.vercel.app/",        // optional, leave "" to hide
};

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────
const formatPrice = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (dateStr: string | Date) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

// Truncate long text to fit column width
const truncate = (text: string, maxLen: number) =>
  text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text;

// ─────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────
export function generateInvoicePDF(order: Order): void {
  // A6: 105 × 148 mm
  const doc = new jsPDF({ unit: "mm", format: "a6", orientation: "portrait" });

  const W = 105;   // page width
  const ML = 6;    // left margin
  const MR = 6;    // right margin
  const CW = W - ML - MR;  // content width = 93mm

  let y = 0;  // current y cursor

  // ── Colour palette ──────────────────────────
  const GOLD   = [180, 140, 60] as [number, number, number];
  const DARK   = [20, 20, 20]   as [number, number, number];
  const MUTED  = [120, 120, 120] as [number, number, number];
  const WHITE  = [255, 255, 255] as [number, number, number];
  const LIGHT  = [245, 243, 238] as [number, number, number];

  // ── Helpers ─────────────────────────────────
  const setFont = (size: number, style: "normal" | "bold" = "normal", color = DARK) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };

  const line = (x1: number, y1: number, x2: number, y2: number, color = MUTED, width = 0.2) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(width);
    doc.line(x1, y1, x2, y2);
  };

  const rect = (x: number, y: number, w: number, h: number, fill: [number, number, number]) => {
    doc.setFillColor(...fill);
    doc.rect(x, y, w, h, "F");
  };

  // ── 1. Header band ───────────────────────────
  rect(0, 0, W, 26, DARK);

  y = 8;
  setFont(11, "bold", GOLD);
  doc.text(COMPANY.name, ML, y);

  if (COMPANY.tagline) {
    y += 4;
    setFont(6, "normal", MUTED);
    doc.text(COMPANY.tagline, ML, y);
  }

  y += 4.5;
  setFont(5.5, "normal", [200, 200, 200]);
  doc.text(COMPANY.addressLine1, ML, y);
  y += 3.5;
  doc.text(COMPANY.addressLine2, ML, y);
  y += 3.5;
  doc.text(`GSTIN: ${COMPANY.gstin}`, ML, y);

  // "INVOICE" label — top right
  setFont(14, "bold", GOLD);
  doc.text("INVOICE", W - MR, 12, { align: "right" });
  setFont(6, "normal", [200, 200, 200]);
  doc.text(`#${order.orderId}`, W - MR, 17, { align: "right" });

  // ── 2. Invoice meta strip ────────────────────
  y = 28;
  rect(ML, y, CW, 14, LIGHT);

  const leftX = ML + 2;
  const rightX = W - MR - 2;

  setFont(5.5, "normal", MUTED);
  doc.text("INVOICE DATE",   leftX,       y + 3.5);
  doc.text("ORDER DATE",     leftX,       y + 8);
  doc.text("PAYMENT METHOD", rightX,      y + 3.5, { align: "right" });
  doc.text("PAYMENT STATUS", rightX,      y + 8,   { align: "right" });

  setFont(6.5, "bold", DARK);
  doc.text(formatDate(new Date()),        leftX,  y + 6.5);
  doc.text(formatDate(order.createdAt),   leftX,  y + 11);
  doc.text(order.paymentMethod,           rightX, y + 6.5, { align: "right" });
  doc.text(order.paymentStatus,           rightX, y + 11,  { align: "right" });

  // ── 3. Bill To / Ship To ─────────────────────
  y += 17;
  setFont(5.5, "bold", GOLD);
  doc.text("BILL TO / SHIP TO", ML, y);

  line(ML, y + 1, W - MR, y + 1, GOLD, 0.3);

  y += 4;
  setFont(7, "bold", DARK);
  doc.text(order.shippingAddress.fullName, ML, y);

  y += 3.5;
  setFont(6, "normal", MUTED);
  doc.text(order.shippingAddress.addressLine1, ML, y);

  if (order.shippingAddress.addressLine2) {
    y += 3;
    doc.text(order.shippingAddress.addressLine2, ML, y);
  }

  y += 3;
  doc.text(
    `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
    ML, y
  );

  y += 3;
  doc.text(order.shippingAddress.country, ML, y);

  y += 3;
  setFont(6, "normal", DARK);
  doc.text(`Ph: ${order.shippingAddress.phone}`, ML, y);
  doc.text(`Email: ${order.shippingAddress.email}`, ML + 28, y);

  // ── 4. Items Table ───────────────────────────
  y += 6;
  rect(0, y, W, 6, DARK);

  const COL = {
    item:  { x: ML,      w: 44 },
    qty:   { x: ML + 46, w: 12 },
    price: { x: ML + 60, w: 15 },
    total: { x: ML + 77, w: 16 },
  };

  setFont(5.5, "bold", WHITE);
  doc.text("ITEM",        COL.item.x,  y + 3.8);
  doc.text("QTY",         COL.qty.x,   y + 3.8);
  doc.text("UNIT PRICE",  COL.price.x, y + 3.8);
  doc.text("AMOUNT",      W - MR,      y + 3.8, { align: "right" });

  y += 7;

  order.items.forEach((item, i) => {
    const rowH = 7;
    if (i % 2 === 0) rect(0, y - 1, W, rowH, [250, 249, 246]);

    const productObj =
      typeof item.product === "object" && item.product !== null
        ? (item.product as { sku?: string; category?: string })
        : null;

    setFont(6.5, "bold", DARK);
    doc.text(truncate(item.name, 28), COL.item.x, y + 2.5);

    if (productObj?.sku) {
      setFont(5, "normal", MUTED);
      doc.text(`SKU: ${productObj.sku}`, COL.item.x, y + 5.5);
    }

    setFont(6.5, "normal", DARK);
    doc.text(String(item.quantity),             COL.qty.x,   y + 2.5);
    doc.text(formatPrice(item.price),           COL.price.x, y + 2.5);
    doc.text(formatPrice(item.price * item.quantity), W - MR, y + 2.5, { align: "right" });

    y += rowH;
  });

  // ── 5. Totals ────────────────────────────────
  line(ML, y, W - MR, y, MUTED, 0.2);
  y += 3;

  const totalsX = W - MR - 40;
  const valX    = W - MR;

  const addTotalRow = (
    label: string,
    value: string,
    bold = false,
    color: [number, number, number] = DARK
  ) => {
    setFont(6, bold ? "bold" : "normal", bold ? color : MUTED);
    doc.text(label, totalsX, y);
    setFont(6, bold ? "bold" : "normal", color);
    doc.text(value, valX, y, { align: "right" });
    y += 4;
  };

  addTotalRow("Subtotal",   formatPrice(order.subtotal));
  addTotalRow("GST (18%)",  formatPrice(order.tax));
  addTotalRow("Shipping",   order.shipping === 0 ? "Free" : formatPrice(order.shipping));

  line(totalsX, y - 1, W - MR, y - 1, GOLD, 0.4);
  y += 1;
  addTotalRow("TOTAL", formatPrice(order.total), true, GOLD);

  // ── 6. Footer ────────────────────────────────
  // Push footer to bottom with remaining space
  const footerY = 142;
  rect(0, footerY, W, 6, DARK);
  setFont(5, "normal", MUTED);

  const footerParts = [
    COMPANY.phone,
    COMPANY.email,
    COMPANY.website,
  ].filter(Boolean).join("  |  ");

  doc.text(footerParts, W / 2, footerY + 3.8, { align: "center" });

  // ── 7. Save ──────────────────────────────────
  const filename = `Invoice_${order.orderId}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
