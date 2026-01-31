'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteProductButtonProps {
  productId: string;
  productTitle: string;
}

export default function DeleteProductButton({ productId, productTitle }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${productTitle}"?`)) {
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch {
      alert('Failed to delete product');
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
