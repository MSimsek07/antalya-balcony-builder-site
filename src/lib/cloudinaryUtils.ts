import { CLOUDINARY_CONFIG } from '../firebaseConfig';

interface UploadResponse {
  secure_url: string;
  // Add other fields from Cloudinary response if needed
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CONFIG.CLOUD_NAME || !CLOUDINARY_CONFIG.UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration (cloud name or upload preset) is missing. Please check your .env file.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Cloudinary upload failed: ${errorData.error?.message || response.statusText}`);
    }

    const data: UploadResponse = await response.json();
    console.log('Cloudinary Upload Response:', data); // Log for debugging
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
