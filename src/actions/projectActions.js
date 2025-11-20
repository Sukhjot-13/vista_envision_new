'use server';

import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export async function getProjects(filter = {}) {
  await dbConnect();
  const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();
  return projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt.toISOString(),
  }));
}

export async function getFeaturedProjects() {
    return getProjects({ isFeatured: true });
}

export async function getProject(id) {
    await dbConnect();
    try {
        const project = await Project.findById(id).lean();
        if (!project) return null;
        return {
            ...project,
            _id: project._id.toString(),
            createdAt: project.createdAt.toISOString(),
        };
    } catch (error) {
        return null;
    }
}

async function uploadImage(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'vista_envision_projects' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(buffer);
    });
}

export async function createProject(formData) {
  await dbConnect();

  const title = formData.get('title');
  const description = formData.get('description');
  const link = formData.get('link');
  const tags = formData.get('tags').split(',').map(tag => tag.trim());
  const category = formData.get('category');
  const isFeatured = formData.get('isFeatured') === 'on';
  
  const coverImageFile = formData.get('image');
  const additionalImages = formData.getAll('images');

  let imageUrl = '';
  if (coverImageFile && coverImageFile.size > 0) {
      imageUrl = await uploadImage(coverImageFile);
  }

  const images = [];
  for (const file of additionalImages) {
      if (file.size > 0) {
          const url = await uploadImage(file);
          images.push(url);
      }
  }

  const newProject = new Project({
    title,
    description,
    link,
    tags,
    category,
    isFeatured,
    imageUrl,
    images,
  });

  await newProject.save();
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateProject(id, formData) {
    await dbConnect();
    
    const title = formData.get('title');
    const description = formData.get('description');
    const link = formData.get('link');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());
    const category = formData.get('category');
    const isFeatured = formData.get('isFeatured') === 'on';
    
    const coverImageFile = formData.get('image');
    const additionalImages = formData.getAll('images');

    const updateData = {
        title,
        description,
        link,
        tags,
        category,
        isFeatured,
    };

    if (coverImageFile && coverImageFile.size > 0) {
        updateData.imageUrl = await uploadImage(coverImageFile);
    }

    if (additionalImages.length > 0 && additionalImages[0].size > 0) {
        const newImages = [];
        for (const file of additionalImages) {
            if (file.size > 0) {
                const url = await uploadImage(file);
                newImages.push(url);
            }
        }
        // Append new images to existing ones or replace? 
        // For simplicity, let's append. But user might want to replace.
        // Let's just push new ones.
        await Project.findByIdAndUpdate(id, { 
            $set: updateData,
            $push: { images: { $each: newImages } }
        });
    } else {
        await Project.findByIdAndUpdate(id, updateData);
    }

    revalidatePath('/portfolio');
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/portfolio/${id}`);
    return { success: true };
}

export async function deleteProject(id) {
  await dbConnect();
  await Project.findByIdAndDelete(id);
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
