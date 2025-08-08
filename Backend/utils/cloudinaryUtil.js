const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dzrvn0sdm",
  api_key: 657478952168758,
  api_secret: "0cJv12LLrEsh38Fu2hBYp0IF6U8",
});
const handleImage = async (command, data) => {
  try {
    if (command === 'add') {
      if (typeof data.imagePath !== 'string') {
        throw new Error('Image path must be a base64 string or file URL');
      }
      const result = await cloudinary.uploader.upload(data.imagePath, {
        folder: 'products',
      });
      return {
        publicId: result.public_id,
        url: result.secure_url,
      };
    }

    if (command === 'delete') {
      if (!data.publicId) return{message: 'Public ID is required to delete image'};
      await cloudinary.uploader.destroy(data.publicId);
      return { message: 'Image deleted successfully' };
    }
    
    throw new Error('Invalid command');
  } catch (error) {
    console.error('Cloudinary Error:', error);
    throw error;
  }
};

module.exports = handleImage;