"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DarkBreadcrumb from "@/components/DarkBreadcrumb";

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

interface ProductDetailPageProps {
  collectionId: string;
}

export default function ProductDetailPage({ collectionId }: ProductDetailPageProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // WhatsApp contact number
  const whatsappNumber = "6283126066671";

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch("/api/collections");
        if (response.ok) {
          const data = await response.json();
          const foundCollection = data.collections.find((col: Collection) => col.id === collectionId);
          if (foundCollection) {
            setCollection(foundCollection);
            if (foundCollection.items.length > 0) {
              setSelectedProduct(foundCollection.items[0]);
              setSelectedImage(foundCollection.items[0].image);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const handleProductSelect = (product: ProductItem) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    setSelectedSize("");
    setQuantity(1);
  };

  const handleWhatsAppOrder = () => {
    if (!selectedProduct) return;

    let message = selectedProduct.whatsappTemplate || `Halo! Saya tertarik dengan *${selectedProduct.name}* (${selectedProduct.price}).`;

    if (selectedSize) {
      message += ` Ukuran: ${selectedSize}.`;
    }

    if (quantity > 1) {
      message += ` Quantity: ${quantity}.`;
    }

    message += " Bisa info detail dan ketersediaan?";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27] mx-auto"></div>
          <p className="mt-4 text-white">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (!collection || !selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Collection not found</h2>
          <p>The requested collection could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Breadcrumb */}
      <DarkBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/portfolio" },
          { label: collection.name, href: `/collection/${collection.id}` },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
              <Image src={selectedImage} alt={selectedProduct.name} fill className="object-cover" priority />
            </div>

            {/* Thumbnail Images */}
            {collection.items.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {collection.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleProductSelect(item)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedProduct.id === item.id ? "border-[#921e27] scale-105" : "border-white/20 hover:border-white/40"}`}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#921e27]/20 text-[#921e27] rounded-full text-sm font-medium border border-[#921e27]/30">{collection.name}</span>
                {selectedProduct.available && <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">Available</span>}
              </div>

              <h1 className="text-4xl font-bold text-white leading-tight">{selectedProduct.name}</h1>

              <div className="text-3xl font-bold text-[#921e27]">{selectedProduct.price}</div>

              <p className="text-gray-300 leading-relaxed text-lg">{selectedProduct.description}</p>
            </div>

            {/* Size Selection */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Size</h3>
                <div className="flex space-x-3">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all duration-300 ${selectedSize === size ? "border-[#921e27] bg-[#921e27] text-white" : "border-white/30 text-white hover:border-[#921e27]/50"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-xl border border-white/30 text-white hover:border-[#921e27]/50 transition-colors flex items-center justify-center">
                  -
                </button>
                <span className="text-2xl font-semibold text-white w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-xl border border-white/30 text-white hover:border-[#921e27]/50 transition-colors flex items-center justify-center">
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>Order via WhatsApp</span>
            </button>

            {/* Product Features */}
            {selectedProduct.materials && selectedProduct.materials.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Materials</h3>
                <div className="space-y-2">
                  {selectedProduct.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#921e27] rounded-full"></div>
                      <span className="text-gray-300">{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Features</h3>
                <div className="space-y-2">
                  {selectedProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#921e27] rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Products in Collection */}
        {collection.items.length > 1 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Other Items in {collection.name}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {collection.items
                .filter((item) => item.id !== selectedProduct.id)
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleProductSelect(item)}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#921e27]/50 transition-all duration-300 transform hover:scale-105">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                    <p className="text-[#921e27] font-bold">{item.price}</p>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
