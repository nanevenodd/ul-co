import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Koleksi fashion UL.CO berbasis kain ulos - Marparbuei, Butet, dan Aksesoris eksklusif",
};

async function getCollections() {
  try {
    // Read collections directly from content.json for SSR
    const contentFilePath = path.join(process.cwd(), "src", "data", "content.json");
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Convert collections object to array
    const collectionsArray = data.collections ? Object.values(data.collections) : [];

    return {
      collections: collectionsArray,
    };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return {
      collections: [],
    };
  }
}

interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  description?: string;
  materials?: string[];
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  products: Product[];
  image: string;
  coverImage?: string; // For API compatibility
}

interface CollectionData {
  collections: Collection[];
}

export default async function Portfolio() {
  const data = await getCollections();
  const collectionsData = data.collections || [];

  // Map collections from content.json to display format
  const collectionData = collectionsData.map((collection: any) => ({
    id: collection.id,
    name: collection.name, // name, not title
    description: collection.description,
    products: collection.products || [],
    image: collection.image, // use image field from content.json
    coverImage: collection.image, // for compatibility
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portfolio <span className="text-[#921e27]">Collections</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jelajahi koleksi UL.CO yang menggabungkan keindahan kain ulos dengan desain kontemporer</p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {collectionData.map((collection: Collection) => (
            <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                {collection.coverImage || collection.image ? (
                  <Image
                    src={collection.coverImage || collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-lg font-medium">{collection.name}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-[#921e27] text-white px-3 py-1 rounded-full text-sm">{collection.products.length} Products</div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{collection.name}</h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>

                <div className="flex justify-between items-center">
                  <Link href={`/portfolio/${collection.id}`} className="inline-flex items-center px-4 py-2 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors">
                    View Collection
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <span className="text-sm text-gray-500">{collection.products.length > 0 ? `Starting from ${collection.products[0].price}` : "Coming Soon"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        {collectionData.some((collection: Collection) => collection.products?.some((product: Product) => product.featured)) && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collectionData.map((collection: Collection) =>
                collection.products
                  ?.filter((product: Product) => product.featured)
                  .map((product: Product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                        {product.images && product.images.length > 0 ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400">{product.name}</span>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 space-y-1">
                          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">{collection.name}</div>
                          <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">Featured</div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[#921e27]">{product.price}</span>
                          <Link href={`/portfolio/${collection.id}/${product.id}`} className="text-sm text-[#921e27] hover:text-[#7a1921] font-medium">
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#921e27] to-[#7a1921] rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Custom Design Available</h3>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">Ingin desain khusus untuk acara istimewa Anda? Mari berdiskusi dengan designer kami</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#921e27] transition-colors">
            Konsultasi Custom Design
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
