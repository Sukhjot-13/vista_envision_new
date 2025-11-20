'use client';

import { updateProject, getProject } from '@/actions/projectActions';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';

export default function EditProjectPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  
  const { id } = use(params);

  useEffect(() => {
      async function fetchProject() {
          const p = await getProject(id);
          setProject(p);
      }
      fetchProject();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    
    try {
        await updateProject(id, formData);
        router.push('/admin');
    } catch (error) {
        console.error('Failed to update project', error);
        alert('Failed to update project');
    } finally {
        setLoading(false);
    }
  }

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={project.title}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={project.category}
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
            defaultChecked={project.isFeatured}
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
            defaultValue={project.description}
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
            defaultValue={project.link}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            defaultValue={project.tags.join(', ')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Cover Image</label>
          <img src={project.imageUrl} alt="Current" className="h-32 object-cover mb-2 rounded" />
          <label className="block text-sm font-medium text-gray-700">New Cover Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Additional Images</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {project.images && project.images.map((img, idx) => (
                <img key={idx} src={img} alt={`Additional ${idx}`} className="h-20 object-cover rounded" />
            ))}
          </div>
          <label className="block text-sm font-medium text-gray-700">Add More Images (optional)</label>
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
            {loading ? 'Updating...' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
