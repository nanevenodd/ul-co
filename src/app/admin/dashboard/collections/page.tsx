"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

interface Collection {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  image: string;
  color: string;
  featured: boolean;
  items: {
    id: string;
    name: string;
    price: string;
    image: string;
    sizes: string[];
    materials: string[];
    features: string[];
    whatsappTemplate: string;
  }[];
}

export default function CollectionsManagement() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Dynamic breadcrumb based on state
  const getBreadcrumbItems = () => {
    if (editingCollection) {
      return [
        { label: 'Collections Management', href: '/admin/dashboard/collections' },
        { label: `Edit ${editingCollection.title}`, current: true }
      ];
    }
    if (showAddForm) {
      return [
        { label: 'Collections Management', href: '/admin/dashboard/collections' },
        { label: 'Add New Collection', current: true }
      ];
    }
    return [{ label: 'Collections Management', current: true }];
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const response = await fetch('/api/collections');
      const data = await response.json();
      setCollections(data.collections || []);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (collection: Collection) => {
    try {
      const url = '/api/collections';
      const method = editingCollection ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collection),
      });

      if (response.ok) {
        await loadCollections();
        setEditingCollection(null);
        setShowAddForm(false);
        alert('Collection saved successfully!');
      } else {
        alert('Failed to save collection');
      }
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Error saving collection');
    }
  };

  const CollectionForm = ({ collection, onSave, onCancel }: {
    collection?: Collection;
    onSave: (collection: Collection) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState<Collection>(
      collection || {
        id: '',
        name: '',
        title: '',
        description: '',
        category: '',
        image: '',
        color: 'rose',
        featured: false,
        items: [],
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">
              {collection ? 'Edit Collection' : 'Add New Collection'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                  placeholder="e.g., Marparbuei"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                  placeholder="e.g., Marparbuei Collection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                  placeholder="Collection description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                  >
                    <option value="rose">Rose</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="amber">Amber</option>
                    <option value="green">Green</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                  placeholder="/image/collection.jpg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Collection
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21]"
                >
                  Save Collection
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-[#921e27] hover:text-[#7a1a21] mr-4">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#921e27]">Manage Collections</h1>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-[#921e27] text-white px-4 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors"
              >
                Add New Collection
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <Breadcrumb 
          items={getBreadcrumbItems()} 
          className="mb-8" 
          showStats={!editingCollection && !showAddForm}
          statsInfo={collections.length > 0 ? `${collections.length} collections` : 'No collections'}
        />
        
        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No collections found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-[#921e27] text-white px-6 py-3 rounded-lg hover:bg-[#7a1a21]"
            >
              Create Your First Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                  {collection.featured && (
                    <div className="absolute top-2 right-2 bg-[#921e27] text-white px-2 py-1 rounded text-xs">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{collection.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{collection.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{collection.category}</span>
                    <span>{collection.items?.length || 0} items</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCollection(collection)}
                      className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <Link
                      href={`/collection/${collection.id}`}
                      target="_blank"
                      className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors text-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Forms */}
      {showAddForm && (
        <CollectionForm
          onSave={handleSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingCollection && (
        <CollectionForm
          collection={editingCollection}
          onSave={handleSave}
          onCancel={() => setEditingCollection(null)}
        />
      )}
    </div>
  );
}
