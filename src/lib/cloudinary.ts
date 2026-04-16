import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param file - Base64 or URL of the image
 * @param folder - Cloudinary folder path
 */
export async function uploadImage(
  file: string,
  folder = "luxe-auto/products"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    quality: "auto:good",
    fetch_format: "auto",
    // Transformations for product images
    transformation: [
      { width: 1200, height: 1200, crop: "limit" },
      { quality: "auto:good" },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Generate an optimized Cloudinary URL with transformations
 */
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    width: options.width || 800,
    height: options.height,
    crop: "fill",
    quality: options.quality || "auto:good",
    fetch_format: options.format || "auto",
    secure: true,
  });
}

export default cloudinary;
