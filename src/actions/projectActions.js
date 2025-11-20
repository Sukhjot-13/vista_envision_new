'use server';

import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  // Convert _id and dates to strings to avoid serialization issues
  return projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt.toISOString(),
  }));
}

export async function getProject(id) {
    await dbConnect();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    return {
        ...project,
        _id: project._id.toString(),
        createdAt: project.createdAt.toISOString(),
    };
}

export async function createProject(formData) {
  await dbConnect();

  const title = formData.get('title');
  const description = formData.get('description');
  const link = formData.get('link');
  const tags = formData.get('tags').split(',').map(tag => tag.trim());
  const imageFile = formData.get('image');

  let imageUrl = '';

  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'vista_envision_projects' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    
    imageUrl = uploadResult.secure_url;
  }

  const newProject = new Project({
    title,
    description,
    link,
    tags,
    imageUrl,
  });

  await newProject.save();
  revalidatePath('/portfolio');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateProject(id, formData) {
    await dbConnect();
    
    const title = formData.get('title');
    const description = formData.get('description');
    const link = formData.get('link');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());
    const imageFile = formData.get('image');

    const updateData = {
        title,
        description,
        link,
        tags,
    };

    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'vista_envision_projects' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });
        
        updateData.imageUrl = uploadResult.secure_url;
    }

    await Project.findByIdAndUpdate(id, updateData);
    revalidatePath('/portfolio');
    revalidatePath('/admin');
    return { success: true };
}

export async function deleteProject(id) {
  await dbConnect();
  await Project.findByIdAndDelete(id);
  revalidatePath('/portfolio');
  revalidatePath('/admin');
  return { success: true };
}
