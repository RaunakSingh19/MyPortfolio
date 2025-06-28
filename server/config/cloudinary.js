const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Cloudinary configuration missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables."
  );
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Enhanced storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_projects",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "webm"],
    resource_type: "auto",
    transformation: [{ quality: "auto:best" }, { fetch_format: "auto" }],
    format: (req, file) => {
      // Preserve original format
      const ext = file.originalname.split(".").pop();
      return ["jpg", "jpeg", "png", "gif", "mp4", "webm"].includes(
        ext.toLowerCase()
      )
        ? ext
        : "jpg";
    },
    public_id: (req, file) => {
      // Generate unique filename
      const timestamp = Date.now();
      const originalname = file.originalname.split(".")[0];
      return `${originalname.replace(/\W+/g, "_")}_${timestamp}`;
    },
  },
});

// Test Cloudinary connection
cloudinary.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected"))
  .catch((err) => console.error("❌ Cloudinary connection error:", err));

module.exports = { cloudinary, storage };
