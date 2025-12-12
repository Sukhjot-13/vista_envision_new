'use server';
import { v2 as cloudinary } from 'cloudinary';

const apiSecret = process.env.CLOUDINARY_API_SECRET; 

export async function getSignature() {
  if (!apiSecret) {
    throw new Error('Cloudinary API Secret not found');
  }

  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    folder: 'vista_envision_projects'
  }, apiSecret);

  return { timestamp, signature, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY };
}
