"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon, PhotoIcon, PencilIcon, TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  materials: string[];
  sizes?: string[];
  colors?: string[];
  featured: boolean;
}

interface Collection {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  productCount: number;
  products: Product[];
  isFeatured: boolean;
  isActive: boolean;
}

export default function CollectionDetail() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.id as string;

  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    materials: "",
    sizes: "",
    colors: "",
    images: [] as string[],
    featured: false,
  });
  const [uploading, setUploading] = useState(false);

  // Fetch collection and products
  const fetchCollection = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/collections");
      if (response.ok) {
        const data = await response.json();
        const foundCollection = data.collections.find((c: Collection) => c.id === collectionId);
        if (foundCollection) {
          setCollection(foundCollection);
          setProducts(foundCollection.products || []);
        } else {
          alert("Collection not found");
          router.push("/admin/dashboard/collections");
        }
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionId) {
      fetchCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId]);

  const handleAddProduct = async () => {
    try {
      const productData = {
        collectionId,
        ...(editingProduct && { productId: editingProduct.id }),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        images: newProduct.images,
        materials: newProduct.materials
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean),
        sizes: newProduct.sizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        colors: newProduct.colors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        featured: newProduct.featured,
      };

      const response = await fetch("/api/collections/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingProduct) {
          setProducts(products.map((p) => (p.id === editingProduct.id ? data.product : p)));
        } else {
          setProducts([...products, data.product]);
          // Update collection product count
          if (collection) {
            setCollection({
              ...collection,
              productCount: products.length + 1,
            });
          }
        }
        setNewProduct({
          name: "",
          description: "",
          price: "",
          materials: "",
          sizes: "",
          colors: "",
          images: [],
          featured: false,
        });
        setEditingProduct(null);
        setShowAddForm(false);
        alert(editingProduct ? "Product updated successfully!" : "Product added successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
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
        setNewProduct({
          ...newProduct,
          images: [...newProduct.images, result.filePath],
        });
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

  const handleRemoveImage = (index: number) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      materials: product.materials ? product.materials.join(", ") : "",
      sizes: product.sizes ? product.sizes.join(", ") : "",
      colors: product.colors ? product.colors.join(", ") : "",
      images: product.images || [],
      featured: product.featured,
    });
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      materials: "",
      sizes: "",
      colors: "",
      images: [],
      featured: false,
    });
    setShowAddForm(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/collections/products?collectionId=${collectionId}&productId=${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProducts(products.filter((p) => p.id !== productId));
          alert("Product deleted successfully!");
          // Update collection product count
          if (collection) {
            setCollection({
              ...collection,
              productCount: products.length - 1,
            });
          }
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const toggleProductFeatured = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    try {
      const response = await fetch("/api/collections/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
          productId,
          name: product.name,
          description: product.description,
          price: product.price,
          materials: product.materials,
          sizes: product.sizes,
          colors: product.colors,
          featured: !product.featured,
        }),
      });

      if (response.ok) {
        setProducts(products.map((p) => (p.id === productId ? { ...p, featured: !p.featured } : p)));
        alert("Product updated successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#921e27]"></div>
        <p className="ml-2 text-sm text-gray-500">Loading collection...</p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Collection not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/admin/dashboard/collections")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Collections
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{collection.title}</h1>
            <p className="mt-1 text-sm text-gray-500">Manage products in this collection</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#921e27] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Collection Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            {collection.coverImage ? <img src={collection.coverImage} alt={collection.title} className="w-full h-full object-cover rounded-lg" /> : <PhotoIcon className="h-8 w-8 text-gray-400" />}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{collection.title}</h2>
            <p className="text-sm text-gray-500 capitalize mb-2">{collection.category}</p>
            <p className="text-gray-600 mb-2">{collection.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-[#921e27] font-medium">{products.length} Products</span>
              {collection.isFeatured && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Featured Collection</span>}
              <button onClick={() => window.open(`/portfolio/${collection.id}`, "_blank")} className="text-blue-600 hover:text-blue-800 underline">
                View on Website
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (IDR)
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={newProduct.price}
                    placeholder="IDR 750,000"
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="materials" className="block text-sm font-medium text-gray-700">
                    Materials (comma separated)
                  </label>
                  <input
                    type="text"
                    id="materials"
                    value={newProduct.materials}
                    placeholder="Kain Ulos Batak, Cotton Premium"
                    onChange={(e) => setNewProduct({ ...newProduct, materials: e.target.value })}
                    className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
                    Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    id="sizes"
                    value={newProduct.sizes}
                    placeholder="S, M, L, XL"
                    onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                    className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
                    Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    id="colors"
                    value={newProduct.colors}
                    placeholder="Red, Blue, Green"
                    onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                    className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Product Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="product-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <PhotoIcon className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> product images
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                      </div>
                      <input
                        id="product-image-upload"
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

                  {/* Image Preview Grid */}
                  {newProduct.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploading && (
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[#921e27]"></div>
                      <span className="ml-2 text-sm text-gray-500">Uploading image...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                  className="h-4 w-4 text-[#921e27] focus:ring-[#921e27] border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Featured product
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={editingProduct ? handleCancelEdit : () => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#921e27] border border-transparent rounded-md shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Products ({products.length})</h3>

          {products.length === 0 ? (
            <div className="text-center py-8">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a product to this collection.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Product
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div className="flex items-center justify-center h-32 bg-gray-100">
                      {product.images && product.images[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" /> : <PhotoIcon className="h-8 w-8 text-gray-400" />}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                      {product.featured && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>}
                    </div>
                    <p className="text-sm text-[#921e27] font-medium mb-2">{product.price}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                    {/* Product Details */}
                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      {product.materials && product.materials.length > 0 && (
                        <div>
                          <span className="font-medium">Materials:</span> {product.materials.join(", ")}
                        </div>
                      )}
                      {product.sizes && product.sizes.length > 0 && (
                        <div>
                          <span className="font-medium">Sizes:</span> {product.sizes.join(", ")}
                        </div>
                      )}
                      {product.colors && product.colors.length > 0 && (
                        <div>
                          <span className="font-medium">Colors:</span> {product.colors.join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button onClick={() => toggleProductFeatured(product.id)} className={`text-xs px-2 py-1 rounded ${product.featured ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"}`}>
                        {product.featured ? "Remove Featured" : "Make Featured"}
                      </button>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-800">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
