import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project.'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL for this project.'],
  },
  tags: {
    type: [String],
    required: [true, 'Please provide at least one tag.'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category.'],
    enum: ['Architecture', 'Interior Design', 'Product Visualization', 'Animation'],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  link: {
    type: String,
    required: [false, 'Link is optional.'], // Made optional as per typical portfolio needs
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
