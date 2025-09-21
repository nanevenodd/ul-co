import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

async function getContent() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/content`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      collections: {
        aksesoris: { products: [] },
      },
    };
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  materials?: string[];
  sizes?: string[];
  colors?: string[];
}

export default async function AksesorisCollection() {
  const content = await getContent();
  const products: Product[] = content.collections?.aksesoris?.products || [];

  const whatsappMessage = (productName: string, productPrice: number) => {
    return encodeURIComponent(`Halo! Saya tertarik dengan produk ${productName} dari koleksi Aksesoris seharga Rp ${productPrice.toLocaleString()}. Bisa minta info lebih lanjut?`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Header */}
        <div className="text-center mb-12">
          <nav className="flex justify-center items-center mb-6 text-sm">
            <Link href="/portfolio" className="text-gray-500 hover:text-[#921e27]">
              Portfolio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#921e27] font-medium">Aksesoris</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Collection <span className="text-[#921e27]">Aksesoris</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Pelengkap fashion berbahan ulos untuk sentuhan tradisional yang elegan. Sempurnakan penampilan Anda dengan aksesoris berkualitas tinggi.</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {products.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                  {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{product.name}</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-[#921e27] text-white px-2 py-1 rounded text-xs font-medium">Rp {product.price?.toLocaleString()}</div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  {product.materials && (
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">Bahan: </span>
                      <span className="text-xs font-medium text-gray-700">{product.materials.join(", ")}</span>
                    </div>
                  )}

                  {product.colors && (
                    <div className="mb-3">
                      <span className="text-xs text-gray-500">Warna: </span>
                      <span className="text-xs font-medium text-gray-700">{product.colors.join(", ")}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <Link href={`/portfolio/aksesoris/${product.id}`} className="text-center px-3 py-2 border border-[#921e27] text-[#921e27] rounded-md hover:bg-[#921e27] hover:text-white transition-colors text-sm">
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/6281234567890?text=${whatsappMessage(product.name, product.price)}`}
                      className="text-center px-3 py-2 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer">
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Koleksi Sedang Dikembangkan</h3>
            <p className="text-gray-600 mb-6">Koleksi Aksesoris sedang dalam tahap pengembangan. Stay tuned untuk update terbaru!</p>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors">
              Konsultasi Custom Design
            </Link>
          </div>
        )}

        {/* Collection Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tentang Koleksi Aksesoris</h3>
              <p className="text-gray-600 mb-4">
                Koleksi Aksesoris UL.CO menghadirkan pelengkap fashion yang menawan dengan sentuhan ulos tradisional. Setiap piece dirancang untuk menambah nilai estetika dan makna budaya pada penampilan Anda.
              </p>
              <p className="text-gray-600">Dari tas, syal, hingga perhiasan, semua dibuat dengan detail yang memperhatikan kualitas dan keindahan motif ulos yang autentik.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Karakteristik Koleksi</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Berbagai jenis aksesoris fashion
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Material berkualitas tinggi
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Motif ulos autentik
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cocok untuk berbagai ocasion
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Kategori Aksesoris</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Tas", icon: "👜", description: "Tas dengan motif ulos" },
              { name: "Syal", icon: "🧣", description: "Syal dan selendang" },
              { name: "Perhiasan", icon: "💍", description: "Aksesoris perhiasan" },
              { name: "Ikat Pinggang", icon: "🎗️", description: "Belt dengan aksen ulos" },
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#921e27] to-[#7a1921] rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Custom Aksesoris Available</h3>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">Ingin aksesoris unik dengan motif ulos pilihan Anda? Mari kita ciptakan aksesoris yang menceritakan kisah Anda.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#921e27] transition-colors">
              Konsultasi Design
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo! Saya tertarik untuk konsultasi custom design koleksi Aksesoris. Bisa dibantu?"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer">
              WhatsApp Designer
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
