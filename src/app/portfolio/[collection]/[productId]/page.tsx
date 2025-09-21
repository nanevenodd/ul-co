"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeftIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  materials: string[];
  sizes?: string[];
  colors?: string[];
  features?: string[];
  featured: boolean;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.collection as string;
  const productId = params.productId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [whatsappSettings, setWhatsappSettings] = useState({
    number: "6281234567890",
    messageTemplate: "Hi, I'm interested in this product: {productName} - {productPrice}. Can you provide more details?"
  });

  // Fetch product and collection data
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/content");
      if (response.ok) {
        const data = await response.json();
        const collections = data.collections || {};

        // Load WhatsApp settings if available
        if (data.settings?.whatsapp) {
          setWhatsappSettings(data.settings.whatsapp);
        }

        if (collections[collectionId]) {
          const collectionData = collections[collectionId];
          setCollection(collectionData);

          const foundProduct = collectionData.products?.find((p: Product) => p.id === productId);
          if (foundProduct) {
            setProduct(foundProduct);
            setSelectedSize(foundProduct.sizes?.[0] || "");

            // Get other products in the same collection (excluding current product)
            const others = collectionData.products?.filter((p: Product) => p.id !== productId) || [];
            setOtherProducts(others);
          } else {
            console.error("Product not found");
            router.push(`/portfolio/${collectionId}`);
          }
        } else {
          console.error("Collection not found");
          router.push("/portfolio");
        }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionId && productId) {
      fetchProductData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId, productId]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;

    // Use template from admin settings or fallback to default
    let message = whatsappSettings.messageTemplate
      .replace("{productName}", product.name)
      .replace("{productPrice}", product.price);

    // Add size and quantity info
    if (selectedSize) {
      message += `\nSize: ${selectedSize}`;
    }
    message += `\nQuantity: ${quantity}`;

    const whatsappUrl = `https://wa.me/${whatsappSettings.number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: `${product.name} - UL.CO`,
      text: `Check out this amazing product: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Product URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Product URL copied to clipboard!");
      } catch (clipboardError) {
        console.error("Clipboard error:", clipboardError);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#921e27]"></div>
          <p className="ml-2 text-sm text-gray-500">Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product || !collection) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <Link href="/portfolio" className="text-[#921e27] hover:text-[#7a1921]">
              Back to Portfolio
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/portfolio" className="hover:text-[#921e27]">
              Portfolio
            </Link>
            <span>/</span>
            <Link href={`/portfolio/${collectionId}`} className="hover:text-[#921e27]">
              {collection.name}
            </Link>
            <span>/</span>
            <span className="text-[#921e27] font-medium">{product.name}</span>
          </nav>

          {/* Back Button */}
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-[#921e27] mb-6 transition-colors">
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-[#921e27] rounded-lg overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center">
                  {product.images && product.images[selectedImage] ? (
                    <Image src={product.images[selectedImage]} alt={product.name} width={600} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#921e27] to-[#7a1921]">
                      <span className="text-white text-xl font-medium">{product.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-[#921e27] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index ? "border-white scale-105" : "border-transparent hover:border-gray-400 hover:scale-102"
                      }`}>
                      <div className="w-full h-full flex items-center justify-center">
                        <Image src={image} alt={`${product.name} ${index + 1}`} width={200} height={200} className="w-full h-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-2xl font-bold text-[#921e27]">{product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    {isFavorite ? <HeartIconSolid className="h-6 w-6 text-[#921e27]" /> : <HeartIcon className="h-6 w-6 text-gray-400" />}
                  </button>
                  <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Share product">
                    <ShareIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-gray-900 font-medium mb-3">Size</h3>
                  <div className="flex space-x-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border rounded-lg font-medium transition-all ${selectedSize === size ? "border-[#921e27] bg-[#921e27] text-white" : "border-gray-300 text-gray-600 hover:border-[#921e27]"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-gray-900 font-medium mb-3">Colors Available</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-gray-900 font-medium mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleQuantityChange(-1)} className="w-10 h-10 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                    -
                  </button>
                  <span className="text-gray-900 font-medium w-8 text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="w-10 h-10 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <button onClick={handleWhatsAppOrder} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Order via WhatsApp</span>
              </button>

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h3 className="text-gray-900 font-medium mb-3">Materials</h3>
                  <ul className="space-y-1">
                    {product.materials.map((material, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-[#921e27] rounded-full mr-3"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-gray-900 font-medium mb-3">Features</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-[#921e27] rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Other Items in Collection */}
          {otherProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Other Items in {collection.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProducts.slice(0, 6).map((otherProduct) => (
                  <Link key={otherProduct.id} href={`/portfolio/${collectionId}/${otherProduct.id}`} className="group">
                    <div className="bg-[#921e27] rounded-lg overflow-hidden aspect-square mb-4 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full flex items-center justify-center">
                        {otherProduct.images && otherProduct.images[0] ? (
                          <Image src={otherProduct.images[0]} alt={otherProduct.name} width={300} height={300} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white text-lg font-medium">{otherProduct.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-gray-900 font-medium mb-2 group-hover:text-[#921e27] transition-colors">{otherProduct.name}</h3>
                      <p className="text-[#921e27] font-bold">{otherProduct.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
