'use client';

import { createProject } from '@/actions/projectActions';
import { getSignature } from '@/actions/cloudinaryActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [executionLogs, setExecutionLogs] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const newLogs = ['Client: Initiating form submission...'];
    setExecutionLogs(newLogs);
    
    const updateLogs = (msg) => {
        setExecutionLogs(prev => [...prev, msg]);
    }

    try {
        const formData = new FormData(event.target);
        const coverImageFile = formData.get('image');
        const additionalImages = formData.getAll('images');
        
        // 1. Get Signature
        updateLogs('Client: Requesting Cloudinary Signature...');
        const { timestamp, signature, cloudName, apiKey } = await getSignature();
        updateLogs('Client: Signature received.');

        const uploadToCloudinary = async (file) => {
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            const data = new FormData();
            data.append('file', file);
            data.append('timestamp', timestamp);
            data.append('signature', signature);
            data.append('api_key', apiKey);
            data.append('folder', 'vista_envision_projects');

            const res = await fetch(url, { method: 'POST', body: data });
            if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.statusText}`);
            const json = await res.json();
            return json.secure_url;
        };

        // 2. Upload Cover Image
        if (coverImageFile && coverImageFile.size > 0) {
             updateLogs(`Client: Uploading cover image (${(coverImageFile.size / 1024 / 1024).toFixed(2)} MB) directly to Cloudinary...`);
             const coverUrl = await uploadToCloudinary(coverImageFile);
             updateLogs(`Client: Cover image uploaded: ${coverUrl}`);
             formData.set('imageUrl', coverUrl); // Replace file with URL
             formData.delete('image'); // Remove raw file to avoid payload limit
        }

        // 3. Upload Gallery Images
        const galleryUrls = [];
        if (additionalImages && additionalImages.length > 0 && additionalImages[0].size > 0) {
            updateLogs(`Client: Uploading ${additionalImages.length} gallery images...`);
            for (let i = 0; i < additionalImages.length; i++) {
                const file = additionalImages[i];
                if (file.size > 0) {
                     const url = await uploadToCloudinary(file);
                     galleryUrls.push(url);
                     updateLogs(`Client: Gallery image ${i+1} uploaded.`);
                }
            }
        }
        
        // Remove raw files and add URLs
        formData.delete('images');
        galleryUrls.forEach(url => formData.append('galleryImages', url));

        updateLogs('Client: All files uploaded. Calling createProject Server Action with URLs...');

        const result = await createProject(formData);
        
        if (result.logs && Array.isArray(result.logs)) {
             setExecutionLogs(prev => [...prev, ...result.logs]);
        }

        if (result.success) {
            updateLogs('Client: Project created successfully! Redirecting...');
            setTimeout(() => {
                router.push('/admin');
            }, 1000);
        } else {
            throw new Error(result.message || 'Server action returned failure status');
        }

    } catch (error) {
        console.error('Failed to create project - Client Catch:', error);
        const errorMessage = error.message || 'Failed to create project';
        setError(`${errorMessage} - Check Logs`);
        updateLogs(`Client Catch Error: ${errorMessage}`);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      
      {/* Logs Display Section */}
      <div className="mb-6 p-4 bg-gray-900 text-green-400 font-mono text-xs rounded-md shadow-inner overflow-hidden">
        <h3 className="text-gray-500 font-bold mb-2 uppercase tracking-wide border-b border-gray-700 pb-1">Execution Logs</h3>
        <div className="h-48 overflow-y-auto whitespace-pre-wrap flex flex-col-reverse">
            {executionLogs.length === 0 ? (
                <span className="text-gray-600 italic">Waiting to start...</span>
            ) : (
                executionLogs.map((log, index) => (
                    <div key={index} className="border-b border-gray-800 py-1 last:border-0">
                        {log}
                    </div>
                ))
            )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          >
            <option value="">Select a category</option>
            <option value="Architecture">Architecture</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Product Visualization">Product Visualization</option>
            <option value="Animation">Animation</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            id="isFeatured"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
            Featured Project (Show on Home Page)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Link (Optional)</label>
          <input
            type="url"
            name="link"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            required
            placeholder="React, Next.js, MongoDB"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Images (Collage)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
