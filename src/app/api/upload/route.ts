import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/auth";

// POST /api/upload - Upload image to Cloudinary (Admin only)
export async function POST(req: NextRequest) {
  try {
    const admin = isAdminAuthenticated(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { image, folder } = await req.json();

    if (!image) {
      return NextResponse.json({ success: false, error: "No image provided" }, { status: 400 });
    }

    const result = await uploadImage(image, folder || "luxe-auto/products");

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/upload - Delete image from Cloudinary (Admin only)
export async function DELETE(req: NextRequest) {
  try {
    const admin = isAdminAuthenticated(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json({ success: false, error: "No publicId provided" }, { status: 400 });
    }

    await deleteImage(publicId);
    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 });
  }
}
