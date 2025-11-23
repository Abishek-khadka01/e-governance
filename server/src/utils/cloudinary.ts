import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs'
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

/**
 * Upload a local file by file path to Cloudinary.
 * @param filePath - Local file path (e.g. "C:/path/to/file.jpg" or "./tmp/file.png")
 * @param folder - Optional Cloudinary folder to store the file in
 */
export async function uploadFromPath(
  filePath: string,
  folder?: string,
): Promise<{ url: string; public_id: string; raw: UploadApiResponse }> {
  if (!filePath) throw new Error('filePath is required');

  const options: Record<string, any> = { resource_type: 'auto' };
  if (folder) options.folder = folder;

  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    // removing the file from the server 
    fs.rmSync(filePath);
    return { url: result.secure_url, public_id: result.public_id, raw: result };
  } catch (err) {
    throw new Error(`Cloudinary upload failed: ${(err as Error).message}`);
  }
}

/**
 * Delete an uploaded resource by its public_id
 * @param publicId - Cloudinary public_id
 */
export async function deleteByPublicId(publicId: string): Promise<any> {
  if (!publicId) throw new Error('publicId is required');

  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    throw new Error(`Cloudinary delete failed: ${(err as Error).message}`);
  }
}
