import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration – reads from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image buffer (base64) to Cloudinary.
 * Returns the secure URL and public ID.
 */
export async function uploadImage(base64: string, folder: string = 'properties') {
  // Cloudinary expects a data URI – ensure it starts with "data:image/...;base64,"
  const dataUri = base64.startsWith('data:') ? base64 : `data:image/jpeg;base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image',
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

