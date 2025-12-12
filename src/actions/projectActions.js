'use server';

export async function pingProject() {
    console.log('ENTRY: pingProject called');
    return { success: true, message: 'Pong! Server Action connection is working.', timestamp: new Date().toISOString() };
}


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
          if (error) {
              console.error('uploadImage: Cloudinary Error', error);
              reject(error);
          }
          else {
              console.log('uploadImage: Success', result.secure_url);
              resolve(result.secure_url);
          }
        }
      ).end(buffer);
    });
}

async function deleteImageFromCloudinary(imageUrl) {
    if (!imageUrl) return;
    
    try {
        // Extract public_id from URL
        // Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image.jpg
        const parts = imageUrl.split('/');
        const filename = parts.pop();
        const publicIdWithExtension = filename.split('.')[0];
        // If there are folders, we need to include them. 
        // Assuming standard Cloudinary URL structure where 'upload/' is followed by version (optional) and then public_id
        
        // A more robust way:
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
        const match = imageUrl.match(regex);
        
        if (match && match[1]) {
            const publicId = match[1];
            await cloudinary.uploader.destroy(publicId);
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
    }
}

export async function createProject(formData) {
  const logs = [];
  const addLog = (msg) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${msg}`;
    console.log(logEntry);
    logs.push(logEntry);
  };

  addLog('ENTRY: createProject server action initiated');

  try {
    addLog('Step 1: Connecting to database...');
    await dbConnect();
    addLog('Step 1: Database connected successfully');

    addLog('Step 2: Parsing form data...');
    const title = formData.get('title');
    const description = formData.get('description');
    const link = formData.get('link');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());
    const category = formData.get('category');
    const isFeatured = formData.get('isFeatured') === 'on';
    
    // Check for pre-uploaded URL (Client-side upload)
    let imageUrl = formData.get('imageUrl') || '';
    const coverImageFile = formData.get('image');
    
    if (!imageUrl && coverImageFile && coverImageFile.size > 0) {
        addLog('Step 3: Cover image found (File). Uploading to Cloudinary (Server-side)...');
        try {
            imageUrl = await uploadImage(coverImageFile);
            addLog(`Step 3: Cover image uploaded. URL: ${imageUrl}`);
        } catch (uploadError) {
            addLog(`Step 3 ERROR: Failed to upload cover image: ${uploadError.message}`);
            throw uploadError;
        }
    } else if (imageUrl) {
        addLog(`Step 3: Using pre-uploaded cover image URL: ${imageUrl}`);
    } else {
        addLog('Step 3: No cover image provided.');
    }

    // Handle Gallery Images
    const images = formData.getAll('galleryImages') || [];
    const additionalImages = formData.getAll('images');

    if (images.length > 0) {
        addLog(`Step 4: Using ${images.length} pre-uploaded gallery image URLs.`);
    }

    // Legacy/Fallback Server-side upload for gallery
    if (additionalImages && additionalImages.length > 0 && additionalImages[0].size > 0) {
        addLog(`Step 4: Found ${additionalImages.length} additional images (Files). Processing...`);
        for (let i = 0; i < additionalImages.length; i++) {
            const file = additionalImages[i];
            if (file.size > 0) {
                addLog(`Step 4: Uploading image ${i + 1}/${additionalImages.length}...`);
                const url = await uploadImage(file);
                images.push(url);
                addLog(`Step 4: Image ${i + 1} uploaded.`);
            }
        }
    }

    addLog('Step 5: Creating Project Mongoose document...');
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

    addLog('Step 6: Saving project to database...');
    await newProject.save();
    addLog('Step 6: Project saved successfully.');
    
    addLog('Step 7: Revalidating paths...');
    revalidatePath('/portfolio');
    revalidatePath('/');
    revalidatePath('/admin');
    addLog('Step 7: Revalidation complete.');

    addLog('SUCCESS: Project creation process finished.');
    return { success: true, logs: logs };

  } catch (error) {
    addLog(`FATAL ERROR: ${error.message}`);
    addLog(`Stack Trace: ${error.stack}`);
    console.error('ERROR in createProject server action:', error);
    
    // Return logs even in failure so client can display them
    return { 
        success: false, 
        message: error.message, 
        logs: logs 
    };
  }
}

export async function updateProject(id, formData) {
    await dbConnect();
    
    const project = await Project.findById(id);
    if (!project) throw new Error('Project not found');

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
        // Delete old cover image
        if (project.imageUrl) {
            await deleteImageFromCloudinary(project.imageUrl);
        }
        updateData.imageUrl = await uploadImage(coverImageFile);
    }

    // Check if new gallery images are uploaded
    const hasNewGalleryImages = additionalImages.length > 0 && additionalImages[0].size > 0;

    if (hasNewGalleryImages) {
        // Delete ALL old gallery images
        if (project.images && project.images.length > 0) {
            for (const imgUrl of project.images) {
                await deleteImageFromCloudinary(imgUrl);
            }
        }

        // Upload new images
        const newImages = [];
        for (const file of additionalImages) {
            if (file.size > 0) {
                const url = await uploadImage(file);
                newImages.push(url);
            }
        }
        
        // Replace images array
        updateData.images = newImages;
    }

    await Project.findByIdAndUpdate(id, updateData);

    revalidatePath('/portfolio');
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/portfolio/${id}`);
    return { success: true };
}

export async function deleteProject(id) {
  await dbConnect();
  const project = await Project.findById(id);
  
  if (project) {
      // Delete cover image
      if (project.imageUrl) {
          await deleteImageFromCloudinary(project.imageUrl);
      }
      
      // Delete gallery images
      if (project.images && project.images.length > 0) {
          for (const imgUrl of project.images) {
              await deleteImageFromCloudinary(imgUrl);
          }
      }
      
      await Project.findByIdAndDelete(id);
  }
  
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
