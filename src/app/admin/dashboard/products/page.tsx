"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminHeader from "@/components/AdminHeader";
import ImageUpload from "@/components/ImageUpload";

interface ProductItem {
  id: string;
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<ProductItem>>({
    name: "",
    image: "",
    description: "",
    category: "",
    price: "",
    available: true,
    sizes: [],
    materials: [],
    features: [],
    whatsappTemplate: "",
  });

  useEffect(() => {
    document.title = "Products - ULCO Admin";
    fetchCollections();
  }, []);

  useEffect(() => {
    // Parse query params for collection selection
    const urlParams = new URLSearchParams(window.location.search);
    const collectionParam = urlParams.get("collection");
    if (collectionParam && collections.length > 0) {
      setSelectedCollection(collectionParam);
    } else if (collections.length > 0 && !selectedCollection) {
      setSelectedCollection(collections[0].id);
    }
  }, [collections, selectedCollection]);

  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/collections");
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (product: ProductItem | Partial<ProductItem>) => {
    if (!selectedCollection) {
      alert("Please select a collection first");
      return;
    }

    setSaving(true);
    try {
      const updatedCollections = collections.map((collection) => {
        if (collection.id === selectedCollection) {
          let updatedItems;

          if (editingProduct) {
            // Update existing product
            updatedItems = collection.items.map((item) => (item.id === editingProduct.id ? ({ ...product, id: editingProduct.id } as ProductItem) : item));
          } else {
            // Add new product
            const newId = Date.now().toString();
            const newProductItem = { ...product, id: newId } as ProductItem;
            updatedItems = [...collection.items, newProductItem];
          }

          return { ...collection, items: updatedItems };
        }
        return collection;
      });

      const response = await fetch("/api/collections", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collections: updatedCollections }),
      });

      if (response.ok) {
        const result = await response.json();
        setCollections(result.collections);
        setEditingProduct(null);
        setShowAddForm(false);
        resetForm();
        alert(`Product ${editingProduct ? "updated" : "added"} successfully!`);
      } else {
        const error = await response.json();
        alert(`Error saving product: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      const updatedCollections = collections.map((collection) => {
        if (collection.id === selectedCollection) {
          return {
            ...collection,
            items: collection.items.filter((item) => item.id !== productId),
          };
        }
        return collection;
      });

      const response = await fetch("/api/collections", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collections: updatedCollections }),
      });

      if (response.ok) {
        const result = await response.json();
        setCollections(result.collections);
        alert("Product deleted successfully!");
      } else {
        alert("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      image: "",
      description: "",
      category: "",
      price: "",
      available: true,
      sizes: [],
      materials: [],
      features: [],
      whatsappTemplate: "",
    });
  };

  const currentCollection = collections.find((col) => col.id === selectedCollection);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <AdminHeader
        title="Product Management"
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
          </svg>
        }
        gradientColors="from-green-600 to-green-800"
        breadcrumbItems={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Product Management", current: true },
        ]}
      />

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">Products</h2>
                {collections.length > 0 && (
                  <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent">
                    <option value="">Select Collection</option>
                    {collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {selectedCollection && (
                <button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                  Add New Product
                </button>
              )}
            </div>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || editingProduct) && selectedCollection && (
            <div className="p-6 border-b bg-gray-50">
              <h3 className="text-lg font-medium mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <ProductForm
                product={editingProduct || newProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setEditingProduct(null);
                  setShowAddForm(false);
                  resetForm();
                }}
                saving={saving}
                collectionName={currentCollection?.title || ""}
              />
            </div>
          )}

          <div className="p-6">
            {!selectedCollection ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Collection</h3>
                <p className="text-gray-500">Please select a collection to manage its products.</p>
              </div>
            ) : !currentCollection?.items || currentCollection.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Get started by adding your first product to this collection.</p>
                <button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                  Add First Product
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentCollection.items.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4 flex-1">
                        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${product.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{product.available ? "Available" : "Unavailable"}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Price: {product.price}</span>
                            <span>Category: {product.category}</span>
                            {product.sizes && product.sizes.length > 0 && <span>Sizes: {product.sizes.join(", ")}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button onClick={() => setEditingProduct(product)} className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Edit Product">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Delete Product">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Form Component
function ProductForm({
  product,
  onSave,
  onCancel,
  saving,
  collectionName,
}: {
  product: ProductItem | Partial<ProductItem>;
  onSave: (product: ProductItem | Partial<ProductItem>) => void;
  onCancel: () => void;
  saving: boolean;
  collectionName: string;
}) {
  const [formData, setFormData] = useState<Partial<ProductItem>>(product);
  const [sizesInput, setSizesInput] = useState(product.sizes?.join(", ") || "");
  const [materialsInput, setMaterialsInput] = useState(product.materials?.join(", ") || "");
  const [featuresInput, setFeaturesInput] = useState(product.features?.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Please fill in required fields (Name and Price)");
      return;
    }

    // Parse comma-separated inputs
    const finalData = {
      ...formData,
      sizes: sizesInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      materials: materialsInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      features: featuresInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    };

    onSave(finalData);
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
          <input
            type="text"
            value={formData.price || ""}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., Rp 150.000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <input
          type="text"
          value={formData.category || ""}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder={`e.g., ${collectionName} Product`}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
      </div>

      <div>
        <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} folder="products" label="Product Image" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sizes (comma separated)</label>
          <input
            type="text"
            value={sizesInput}
            onChange={(e) => setSizesInput(e.target.value)}
            placeholder="S, M, L, XL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Materials (comma separated)</label>
          <input
            type="text"
            value={materialsInput}
            onChange={(e) => setMaterialsInput(e.target.value)}
            placeholder="Cotton, Polyester"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
          <input
            type="text"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            placeholder="Comfortable, Durable"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Template</label>
        <textarea
          value={formData.whatsappTemplate || ""}
          onChange={(e) => setFormData({ ...formData, whatsappTemplate: e.target.value })}
          rows={3}
          placeholder="Halo, saya tertarik dengan produk {product_name}..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
        />
      </div>

      <div className="flex items-center">
        <input type="checkbox" checked={formData.available || false} onChange={(e) => setFormData({ ...formData, available: e.target.checked })} className="h-4 w-4 text-[#921e27] focus:ring-[#921e27] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Product Available</label>
      </div>

      <div className="flex space-x-4">
        <button type="submit" disabled={saving} className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
          {saving ? "Saving..." : "Save Product"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all disabled:opacity-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
