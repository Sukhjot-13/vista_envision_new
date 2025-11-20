'use client';

import { deleteProject } from '@/actions/projectActions';

export function DeleteProjectButton({ projectId }) {
  return (
    <form action={deleteProject.bind(null, projectId)} className="inline">
      <button
        type="submit"
        className="text-red-600 hover:text-red-900"
        onClick={(e) => {
          if (!confirm('Are you sure you want to delete this project?')) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}
