"use client";

import { useState, useEffect } from "react";
import { PlusIcon, PhotoIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Collection {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  productCount: number;
  products: any[];
  isFeatured: boolean;
  isActive: boolean;
}

export default function CollectionsManagement() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [newCollection, setNewCollection] = useState({
    title: "",
    category: "",
    description: "",
    coverImage: "",
    isFeatured: false,
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);

  const categories = [
    { value: "marparbuei", label: "Marparbuei" },
    { value: "butet", label: "Butet" },
    { value: "aksesoris", label: "Aksesoris" },
    { value: "evening", label: "Evening Wear" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "bridal", label: "Bridal" },
    { value: "accessories", label: "Accessories" },
  ];

  // Fetch collections from API
  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/collections");
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
      } else {
        console.error("Failed to fetch collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleAddCollection = async () => {
    try {
      const response = await fetch("/api/collections", {
        method: editingCollection ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingCollection ? { id: editingCollection.id, ...newCollection } : newCollection),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingCollection) {
          setCollections(collections.map((c) => (c.id === editingCollection.id ? data.collection : c)));
        } else {
          setCollections([...collections, data.collection]);
        }
        setNewCollection({
          title: "",
          category: "",
          description: "",
          coverImage: "",
          isFeatured: false,
          isActive: true,
        });
        setEditingCollection(null);
        setShowAddForm(false);
        alert(editingCollection ? "Collection updated successfully!" : "Collection created successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      alert("Failed to create collection");
    }
  };

  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection);
    setNewCollection({
      title: collection.title,
      category: collection.category,
      description: collection.description,
      coverImage: collection.coverImage,
      isFeatured: collection.isFeatured,
      isActive: collection.isActive,
    });
    setShowAddForm(true);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setNewCollection({ ...newCollection, coverImage: result.filePath });
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateCollection = async () => {
    if (!editingCollection) return;

    try {
      const response = await fetch("/api/collections", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingCollection.id,
          ...newCollection,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCollections(collections.map((c) => (c.id === editingCollection.id ? data.collection : c)));
        setNewCollection({
          title: "",
          category: "",
          description: "",
          coverImage: "",
          isFeatured: false,
          isActive: true,
        });
        setEditingCollection(null);
        setShowAddForm(false);
        alert("Collection updated successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      alert("Failed to update collection");
    }
  };

  const handleCancelEdit = () => {
    setEditingCollection(null);
    setNewCollection({
      title: "",
      category: "",
      description: "",
      coverImage: "",
      isFeatured: false,
      isActive: true,
    });
    setShowAddForm(false);
  };

  const handleDeleteCollection = async (id: string) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      try {
        const response = await fetch(`/api/collections?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setCollections(collections.filter((c) => c.id !== id));
          alert("Collection deleted successfully!");
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error("Error deleting collection:", error);
        alert("Failed to delete collection");
      }
    }
  };

  const toggleFeatured = async (id: string) => {
    const collection = collections.find((c) => c.id === id);
    if (!collection) return;

    try {
      const response = await fetch("/api/collections", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: collection.title,
          category: collection.category,
          description: collection.description,
          coverImage: collection.coverImage,
          isFeatured: !collection.isFeatured,
        }),
      });

      if (response.ok) {
        setCollections(collections.map((c) => (c.id === id ? { ...c, isFeatured: !c.isFeatured } : c)));
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      alert("Failed to update collection");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collections Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your portfolio collections and categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#921e27] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Collection
        </button>
      </div>

      {/* Add collection form */}
      {showAddForm && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{editingCollection ? "Edit Collection" : "Add New Collection"}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Collection Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newCollection.title}
                    onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
                    className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newCollection.category}
                    onChange={(e) => setNewCollection({ ...newCollection, category: e.target.value })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#921e27] focus:border-[#921e27] sm:text-sm">
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="cover-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <PhotoIcon className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> collection cover image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        id="cover-image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        disabled={uploading}
                      />
                    </label>
                  </div>

                  {/* Preview */}
                  {newCollection.coverImage && (
                    <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={newCollection.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setNewCollection({ ...newCollection, coverImage: "" })} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {uploading && (
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[#921e27]"></div>
                      <span className="ml-2 text-sm text-gray-500">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  checked={newCollection.isFeatured}
                  onChange={(e) => setNewCollection({ ...newCollection, isFeatured: e.target.checked })}
                  className="h-4 w-4 text-[#921e27] focus:ring-[#921e27] border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Featured collection
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={editingCollection ? handleCancelEdit : () => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancel
                </button>
                <button
                  onClick={handleAddCollection}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#921e27] border border-transparent rounded-md shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
                  {editingCollection ? "Update Collection" : "Add Collection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collections grid */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#921e27]"></div>
              <p className="mt-2 text-sm text-gray-500">Loading collections...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {collections.map((collection) => (
                  <div key={collection.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <div className="flex items-center justify-center h-32 bg-gray-100">
                        {collection.coverImage ? <img src={collection.coverImage} alt={collection.title} className="w-full h-full object-cover" /> : <PhotoIcon className="h-8 w-8 text-gray-400" />}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{collection.title}</h3>
                        {collection.isFeatured && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>}
                      </div>
                      <p className="text-sm text-gray-500 mb-2 capitalize">{collection.category}</p>
                      <p className="text-sm text-gray-600 mb-2">{collection.description}</p>
                      <p className="text-xs text-[#921e27] mb-4 font-medium">{collection.productCount} Products</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => toggleFeatured(collection.id)} className={`text-xs px-2 py-1 rounded ${collection.isFeatured ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"}`}>
                            {collection.isFeatured ? "Remove Featured" : "Make Featured"}
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => window.open(`/portfolio/${collection.id}`, "_blank")} className="text-green-600 hover:text-green-800 text-xs px-2 py-1 bg-green-100 rounded" title="View on website">
                            View
                          </button>
                          <button onClick={() => (window.location.href = `/admin/dashboard/collections/${collection.id}`)} className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 bg-blue-100 rounded" title="Manage products">
                            Products
                          </button>
                          <button onClick={() => handleEditCollection(collection)} className="text-gray-600 hover:text-gray-800" title="Edit collection">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteCollection(collection.id)} className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {collections.length === 0 && !loading && (
                <div className="text-center py-8">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No collections</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new collection.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      New Collection
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
