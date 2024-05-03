import cloudinary from 'cloudinary';

// Set up Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 *uploading file to a specific folder in the cloudinary cloud with a fileId
 *
 * @param filePath - pass the file path that get from the request. for example req.file.path
 * @param cloudinaryFolderName  - pass the folder name in cloudinary where you want to upload the file
 * @param filePublicId - pass a unique name for the file. This is to identify the file using the unique name.
 */
export const cloudinaryFileUploadService = async (filePath: string, filePublicId: string, cloudinaryFolderName?: string) => {
    const fileUploadedResult = await cloudinary.v2.uploader.upload(filePath, { public_id: filePublicId, folder: cloudinaryFolderName });
    return fileUploadedResult;
};
