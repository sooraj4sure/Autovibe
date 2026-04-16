
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, X, Plus, Save, Loader2 } from "lucide-react";
import axios from "axios";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Interior", "Exterior", "Tech Accessories", "Performance",
  "Lighting", "Wheels & Tyres", "Audio", "Protection",
];

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

type FormState = {
  name: string;
  shortDescription: string;
  description: string;
  price: string | number;
  comparePrice: string | number;
  category: string;
  stock: string | number;
  sku: string;
  isFeatured: boolean;
  isActive: boolean;
  tags: string;
};

// ✅ Moved outside ProductForm to prevent remount on every render
const InputField = ({
  label,
  field,
  type = "text",
  required = true,
  rows,
  form,
  updateForm,
}: {
  label: string;
  field: string;
  type?: string;
  required?: boolean;
  rows?: number;
  form: FormState;
  updateForm: (field: string, value: unknown) => void;
}) => (
  <div>
    <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
      {label} {required && <span className="text-gold">*</span>}
    </label>
    {rows ? (
      <textarea
        value={form[field as keyof typeof form] as string}
        onChange={(e) => updateForm(field, e.target.value)}
        rows={rows}
        className="input-luxury resize-none"
      />
    ) : (
      <input
        type={type}
        value={form[field as keyof typeof form] as string}
        onChange={(e) => updateForm(field, e.target.value)}
        className="input-luxury"
      />
    )}
  </div>
);

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: product?.name || "",
    shortDescription: product?.shortDescription || "",
    description: product?.description || "",
    price: product?.price || "",
    comparePrice: product?.comparePrice || "",
    category: product?.category || "",
    stock: product?.stock || "",
    sku: product?.sku || "",
    isFeatured: product?.isFeatured || false,
    isActive: product?.isActive ?? true,
    tags: product?.tags?.join(", ") || "",
  });

  const [images, setImages] = useState<Array<{ url: string; publicId: string; alt?: string }>>(
    product?.images || []
  );

  const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>(
    product?.specifications
      ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );

  const updateForm = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target?.result as string;
          const { data } = await axios.post("/api/upload", { image: base64 });
          if (data.success) {
            setImages((prev) => [...prev, data.data]);
          }
        };
        reader.readAsDataURL(file);
      }
      toast.success("Images uploaded successfully", {
        style: { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)" },
      });
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async (index: number) => {
    const img = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (img.publicId) {
      await axios.delete("/api/upload", { data: { publicId: img.publicId } }).catch(() => {});
    }
  };

  const addSpec = () => setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  const removeSpec = (i: number) => setSpecifications((prev) => prev.filter((_, idx) => idx !== i));
  const updateSpec = (i: number, field: "key" | "value", value: string) => {
    setSpecifications((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = async () => {
    const required = ["name", "shortDescription", "description", "price", "category", "stock", "sku"];
    const missing = required.filter((f) => !form[f as keyof typeof form]);
    if (missing.length) {
      toast.error(`Missing required fields: ${missing.join(", ")}`);
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    const specsObj = specifications
      .filter((s) => s.key && s.value)
      .reduce((acc: Record<string, string>, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});

    const payload = {
      ...form,
      price: parseFloat(String(form.price)),
      comparePrice: form.comparePrice ? parseFloat(String(form.comparePrice)) : undefined,
      stock: parseInt(String(form.stock)),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      images,
      specifications: specsObj,
    };

    setIsSaving(true);
    try {
      if (isEdit && product) {
        const { data } = await axios.put(`/api/products/${product._id}`, payload);
        if (data.success) {
          toast.success("Product updated successfully", {
            style: { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)" },
          });
          router.push("/admin/products");
        }
      } else {
        const { data } = await axios.post("/api/products", payload);
        if (data.success) {
          toast.success("Product created successfully", {
            style: { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)" },
          });
          router.push("/admin/products");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save product";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">
            {isEdit ? "Edit Product" : "New Product"}
          </span>
        </div>
        <h1 className="font-display text-3xl text-ivory">
          {isEdit ? `Editing: ${product?.name}` : "Add New Product"}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-graphite border border-white/5 rounded-sm p-6">
          <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField label="Product Name" field="name" form={form} updateForm={updateForm} />
            </div>
            <InputField label="SKU" field="sku" form={form} updateForm={updateForm} />
            <div>
              <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
                Category <span className="text-gold">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => updateForm("category", e.target.value)}
                className="input-luxury appearance-none"
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <InputField label="Price (₹)" field="price" type="number" form={form} updateForm={updateForm} />
            <InputField label="Compare Price (₹)" field="comparePrice" type="number" required={false} form={form} updateForm={updateForm} />
            <InputField label="Stock Quantity" field="stock" type="number" form={form} updateForm={updateForm} />
          </div>
        </div>

        {/* Description */}
        <div className="bg-graphite border border-white/5 rounded-sm p-6">
          <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-5">Description</h2>
          <div className="space-y-4">
            <InputField label="Short Description (shown on card)" field="shortDescription" rows={3} form={form} updateForm={updateForm} />
            <InputField label="Full Description" field="description" rows={6} form={form} updateForm={updateForm} />
            <div>
              <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => updateForm("tags", e.target.value)}
                placeholder="carbon, interior, steering, premium"
                className="input-luxury"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-graphite border border-white/5 rounded-sm p-6">
          <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-5">
            Product Images <span className="text-gold">*</span>
          </h2>

          {/* Upload area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/10 rounded-sm p-8 text-center cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all mb-4"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-gold/50 mx-auto mb-2" />
            )}
            <p className="text-ash text-sm font-body">
              {isUploading ? "Uploading..." : "Click to upload images or drag & drop"}
            </p>
            <p className="text-graphite-soft text-[10px] font-sans tracking-wider mt-1">
              PNG, JPG, WEBP — Max 10MB each
            </p>
          </div>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative group aspect-square">
                  <Image
                    src={img.url}
                    alt={`Product image ${i + 1}`}
                    fill
                    className="object-cover rounded-sm"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[8px] bg-gold text-obsidian px-1 font-sans font-bold">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="bg-graphite border border-white/5 rounded-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase">
              Specifications (Optional)
            </h2>
            <button
              onClick={addSpec}
              className="flex items-center gap-1.5 text-gold text-[10px] font-sans tracking-wider uppercase hover:text-gold-light transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Row
            </button>
          </div>
          <div className="space-y-2">
            {specifications.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => updateSpec(i, "key", e.target.value)}
                  placeholder="e.g. Material"
                  className="input-luxury flex-1 text-sm py-2"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  placeholder="e.g. Carbon Fibre"
                  className="input-luxury flex-1 text-sm py-2"
                />
                <button
                  onClick={() => removeSpec(i)}
                  className="text-ash hover:text-red-400 transition-colors px-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-graphite border border-white/5 rounded-sm p-6">
          <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-5">Settings</h2>
          <div className="flex gap-8">
            {[
              { field: "isFeatured", label: "Featured Product" },
              { field: "isActive", label: "Active (visible in store)" },
            ].map(({ field, label }) => (
              <label key={field} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => updateForm(field, !form[field as keyof typeof form])}
                  className={`w-10 h-5 rounded-full transition-all duration-200 relative ${
                    form[field as keyof typeof form] ? "bg-gold" : "bg-graphite-soft"
                  }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                    form[field as keyof typeof form] ? "left-5.5 translate-x-0.5" : "left-0.5"
                  }`} />
                </div>
                <span className="text-smoke text-sm font-body">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="gold"
            size="lg"
            onClick={handleSubmit}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEdit ? "Save Changes" : "Create Product"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
