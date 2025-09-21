"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  description?: string;
  featured?: boolean;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  products?: Product[];
  image?: string;
  coverImage?: string;
}

interface FeaturedCollectionsProps {
  collections: Collection[];
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-[#921e27]">Collections</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our signature collections that blend traditional Ulos craftsmanship with contemporary design
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {collections?.slice(0, 3)?.map((collection) => (
            <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                {(collection.coverImage || collection.image) ? (
                  <Image 
                    src={collection.coverImage || collection.image || '/images/placeholder.jpg'} 
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : null}
                <div 
                  className={`absolute inset-0 flex items-center justify-center ${(collection.coverImage || collection.image) ? 'hidden' : 'flex'}`}
                >
                  <span className="text-gray-500 text-lg font-medium">{collection.name}</span>
                </div>
                <div className="absolute top-4 right-4 bg-[#921e27] text-white px-3 py-1 rounded-full text-sm">
                  {collection.products?.length || 0} Products
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{collection.name}</h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>

                <div className="flex justify-between items-center">
                  <Link 
                    href={`/portfolio/${collection.id}`} 
                    className="inline-flex items-center px-4 py-2 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors"
                  >
                    View Collection
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <span className="text-sm text-gray-500">
                    {collection.products && collection.products.length > 0 
                      ? `Starting from ${collection.products[0].price}` 
                      : "Coming Soon"
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        {collections?.some((collection) => 
          collection.products?.some((product) => product.featured)
        ) && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections?.map((collection) =>
                collection.products?.filter((product) => product.featured).map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                      {product.images && product.images.length > 0 ? (
                        <Image 
                          src={product.images[0]} 
                          alt={product.name} 
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : null}
                      <div className={`absolute inset-0 flex items-center justify-center ${product.images && product.images.length > 0 ? 'hidden' : 'flex'}`}>
                        <span className="text-gray-400">{product.name}</span>
                      </div>
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
                        <Link 
                          href={`/portfolio/${collection.id}/${product.id}`} 
                          className="text-sm text-[#921e27] hover:text-[#7a1921] font-medium"
                        >
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

        {/* View All Collections Button */}
        <div className="text-center">
          <Link 
            href="/portfolio"
            className="inline-flex items-center bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            View All Collections
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}