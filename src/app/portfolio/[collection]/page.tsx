import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

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
  title?: string;
  description: string;
  products: Product[];
  image: string;
  coverImage?: string;
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionId } = await params;
  const data = await getCollections();
  const collections = (data.collections as Collection[]) || [];

  const collection = collections.find((c: Collection) => c.id === collectionId) as Collection;

  if (!collection) {
    notFound();
  }

  const products: Product[] = collection.products || [];

  const whatsappMessage = (productName: string, productPrice: string) => {
    return encodeURIComponent(`Halo! Saya tertarik dengan produk ${productName} dari koleksi ${collection.title || collection.name} dengan harga ${productPrice}. Bisa minta info lebih lanjut?`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Header */}
        <div className="text-center mb-12">
          <nav className="text-sm breadcrumbs mb-4">
            <Link href="/portfolio" className="text-[#921e27] hover:text-[#7a1921]">
              Portfolio
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900">{collection.title || collection.name}</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Koleksi <span className="text-[#921e27]">{collection.title || collection.name}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{collection.description}</p>

          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>{products.length} produk tersedia</span>
            <span>•</span>
            <span>Fashion berbasis kain ulos</span>
          </div>
        </div>

        {/* Collection Cover */}
        {(collection.coverImage || collection.image) && (
          <div className="mb-12 relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image src={collection.coverImage || collection.image} alt={collection.title || collection.name} fill className="object-cover" />
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                  {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">{product.name}</span>
                    </div>
                  )}

                  {/* Product Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-[#921e27] text-white px-3 py-1 rounded-full text-sm font-medium">{collection.title || collection.name}</div>
                    {product.featured && <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</div>}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                  {/* Product Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    {product.materials && product.materials.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="font-medium text-gray-700">Bahan:</span>
                        {product.materials.map((material, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {material}
                          </span>
                        ))}
                      </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="font-medium text-gray-700">Ukuran:</span>
                        {product.sizes.map((size, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    {product.colors && product.colors.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="font-medium text-gray-700">Warna:</span>
                        {product.colors.map((color, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {color}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#921e27]">{product.price}</span>

                    <div className="flex space-x-2">
                      <Link href={`/portfolio/${collection.id}/${product.id}`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                        Detail
                      </Link>
                      <a
                        href={`https://wa.me/6281234567890?text=${whatsappMessage(product.name, product.price)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors text-sm">
                        Pesan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Belum ada produk</h3>
              <p className="mt-1 text-gray-500">Produk untuk koleksi ini sedang dalam pengembangan.</p>
              <div className="mt-6">
                <Link href="/portfolio" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-[#7a1921]">
                  Lihat Koleksi Lain
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tertarik dengan koleksi {collection.title || collection.name}?</h2>
          <p className="text-gray-600 mb-6">Hubungi kami untuk konsultasi desain khusus atau pertanyaan produk</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo! Saya tertarik dengan koleksi ${collection.title || collection.name} dari UL.CO. Bisa minta info lebih lanjut?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
              </svg>
              WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Kontak Kami
            </Link>
          </div>
        </div>

        {/* Featured Products from Other Collections */}
        {collections && (collections as Collection[]).some((col: Collection) => col.products.some((product: Product) => product.featured && col.id !== collection?.id)) && (
          <section className="mt-20 py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Discover other featured products from our collections</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {(collections as Collection[])
                  .filter((col: Collection) => col.id !== collection?.id)
                  .flatMap((col: Collection) => col.products.filter((product: Product) => product.featured))
                  .slice(0, 4)
                  .map((product: Product, index: number) => (
                    <div key={`featured-${product.id}-${index}`} className="group">
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow mb-4">
                        {product.images && product.images.length > 0 ? (
                          <Image src={product.images[0]} alt={product.name} width={300} height={300} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <span className="text-gray-600">Product Image</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">Featured</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      {product.price && <p className="text-gray-600 font-medium">Rp {parseInt(product.price).toLocaleString("id-ID")}</p>}
                    </div>
                  ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/portfolio" className="inline-flex items-center border border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium">
                  View All Collections
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all collections
export async function generateStaticParams() {
  try {
    const data = await getCollections();
    const collections = (data.collections as Collection[]) || [];

    return collections.map((collection: Collection) => ({
      collection: collection.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
