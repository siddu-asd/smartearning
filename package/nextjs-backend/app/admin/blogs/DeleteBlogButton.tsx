'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteBlogButtonProps {
  blogId: string;
  blogTitle: string;
}

export default function DeleteBlogButton({ blogId, blogTitle }: DeleteBlogButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete blog post');
      }
    } catch {
      alert('Failed to delete blog post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
