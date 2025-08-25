'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

interface ProductItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: string;
  available: boolean;
  sizes?: string[];
  materials?: string[];
  features?: string[];
  whatsappTemplate?: string;
}

interface Collection {
  id: string;
  name: string;
  title: string;
  description: string;
  items: ProductItem[];
}

export default function ProductManagement() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections');
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
        if (data.collections && data.collections.length > 0) {
          setSelectedCollection(data.collections[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct: ProductItem) => {
    try {
      const updatedCollections = collections.map(collection => 
        collection.id === selectedCollection 
          ? {
              ...collection,
              items: collection.items.map(item =>
                item.id === updatedProduct.id ? updatedProduct : item
              )
            }
          : collection
      );

      const response = await fetch('/api/collections', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collections: updatedCollections }),
      });

      if (response.ok) {
        setCollections(updatedCollections);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const currentCollection = collections.find(col => col.id === selectedCollection);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Product Management', href: '/admin/dashboard/products' }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Product Management</h1>
                <p className="text-white/80 mt-1">Manage product details and WhatsApp templates</p>
              </div>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="bg-white text-[#921e27] px-4 py-2 rounded-lg font-medium"
              >
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products List */}
          <div className="p-6">
            {currentCollection && currentCollection.items.length > 0 ? (
              <div className="space-y-6">
                {currentCollection.items.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4 flex-1">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{product.price}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              WhatsApp Template:
                            </p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {product.whatsappTemplate || 'No template set'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="ml-4 px-4 py-2 bg-[#921e27] text-white rounded-lg hover:bg-[#7a1a21] transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found in this collection.</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Edit Product</h2>
                <ProductEditForm
                  product={editingProduct}
                  onSave={handleUpdateProduct}
                  onCancel={() => setEditingProduct(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductEditFormProps {
  product: ProductItem;
  onSave: (product: ProductItem) => void;
  onCancel: () => void;
}

function ProductEditForm({ product, onSave, onCancel }: ProductEditFormProps) {
  const [formData, setFormData] = useState<ProductItem>(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateArrayField = (field: keyof ProductItem, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData({ ...formData, [field]: array });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          type="text"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sizes (comma separated)
        </label>
        <input
          type="text"
          value={formData.sizes?.join(', ') || ''}
          onChange={(e) => updateArrayField('sizes', e.target.value)}
          placeholder="S, M, L, XL"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Materials (comma separated)
        </label>
        <input
          type="text"
          value={formData.materials?.join(', ') || ''}
          onChange={(e) => updateArrayField('materials', e.target.value)}
          placeholder="Cotton, Silk, Premium Fabric"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Features (comma separated)
        </label>
        <input
          type="text"
          value={formData.features?.join(', ') || ''}
          onChange={(e) => updateArrayField('features', e.target.value)}
          placeholder="Handmade, Premium Quality, Modern Design"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp Template Message
        </label>
        <textarea
          value={formData.whatsappTemplate || ''}
          onChange={(e) => setFormData({ ...formData, whatsappTemplate: e.target.value })}
          rows={3}
          placeholder="Halo! Saya tertarik dengan *[Product Name]* ([Price]). Bisa info detail dan ketersediaan?"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Template will be used when customer clicks WhatsApp button
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="available"
          checked={formData.available}
          onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
          className="rounded border-gray-300 text-[#921e27] focus:ring-[#921e27]"
        />
        <label htmlFor="available" className="ml-2 text-sm text-gray-700">
          Available for purchase
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-[#921e27] text-white py-3 rounded-lg hover:bg-[#7a1a21] transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
