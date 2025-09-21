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
        butet: { products: [] },
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

export default async function ButetCollection() {
  const content = await getContent();
  const products: Product[] = content.collections?.butet?.products || [];

  const whatsappMessage = (productName: string, productPrice: number) => {
    return encodeURIComponent(`Halo! Saya tertarik dengan produk ${productName} dari koleksi Butet seharga Rp ${productPrice.toLocaleString()}. Bisa minta info lebih lanjut?`);
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
            <span className="text-[#921e27] font-medium">Butet</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Collection <span className="text-[#921e27]">Butet</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Koleksi kasual modern dengan kain ulos sebagai aksen utama. Nyaman untuk aktivitas sehari-hari dengan sentuhan tradisional yang stylish.</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                  {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">{product.name}</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-[#921e27] text-white px-2 py-1 rounded text-sm font-medium">Rp {product.price?.toLocaleString()}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                  {product.materials && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-500">Bahan: </span>
                      <span className="text-sm font-medium text-gray-700">{product.materials.join(", ")}</span>
                    </div>
                  )}

                  {product.sizes && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">Ukuran: </span>
                      <span className="text-sm font-medium text-gray-700">{product.sizes.join(", ")}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link href={`/portfolio/butet/${product.id}`} className="flex-1 text-center px-4 py-2 border border-[#921e27] text-[#921e27] rounded-md hover:bg-[#921e27] hover:text-white transition-colors">
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/6281234567890?text=${whatsappMessage(product.name, product.price)}`}
                      className="flex-1 text-center px-4 py-2 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Koleksi Sedang Dikembangkan</h3>
            <p className="text-gray-600 mb-6">Koleksi Butet sedang dalam tahap pengembangan. Stay tuned untuk update terbaru!</p>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-[#921e27] text-white rounded-md hover:bg-[#7a1921] transition-colors">
              Konsultasi Custom Design
            </Link>
          </div>
        )}

        {/* Collection Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tentang Koleksi Butet</h3>
              <p className="text-gray-600 mb-4">
                Koleksi Butet menghadirkan fashion kasual yang nyaman namun tetap stylish dengan sentuhan ulos tradisional. Dirancang untuk generasi modern yang menghargai warisan budaya dalam aktivitas sehari-hari.
              </p>
              <p className="text-gray-600">Setiap piece menggabungkan kenyamanan material modern dengan keindahan motif ulos, menciptakan busana yang versatile untuk berbagai ocasion kasual.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Karakteristik Koleksi</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Material nyaman untuk daily wear
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Desain kasual modern
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Aksen ulos yang stylish
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-[#921e27] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Versatile untuk berbagai ocasion
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#921e27] to-[#7a1921] rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Custom Butet Design Available</h3>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">Ingin style kasual yang unik dengan sentuhan ulos? Mari kita diskusikan desain Butet yang sesuai dengan kepribadian Anda.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#921e27] transition-colors">
              Konsultasi Design
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo! Saya tertarik untuk konsultasi custom design koleksi Butet. Bisa dibantu?"
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
