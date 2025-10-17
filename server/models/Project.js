const mongoose = require("mongoose");

const urlValidator = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    techStack: {
      type: [String],
      required: [true, "At least one technology is required"],
      validate: {
        validator: (techs) => techs.length > 0,
        message: "At least one technology is required",
      },
    },
    githubUrl: {
      type: String,
      required: [true, "GitHub URL is required"],
      validate: {
        validator: urlValidator,
        message: "Please enter a valid URL",
      },
    },
    liveDemo: {
      type: String,
      validate: {
        validator: function (v) {
          return v === "" || urlValidator(v);
        },
        message: "Please enter a valid URL",
      },
    },
    mediaUrl: {
      type: String,
      required: [true, "Media URL is required"],
      validate: {
        validator: urlValidator,
        message: "Please enter a valid URL",
      },
    },
    mediaType: {
      type: String,
      required: [true, "Media type is required"],
      enum: ["image", "video"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Add index for better performance
ProjectSchema.index({ title: "text", description: "text", techStack: "text" });

module.exports = mongoose.model("Project", ProjectSchema);
