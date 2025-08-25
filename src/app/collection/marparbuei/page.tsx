"use client";

import { useState } from "react";

// Define interface untuk type safety
interface CollectionItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  inspiration: string;
}

export default function MarparbueiDetailPage() {
  // Fix: Proper typing untuk selectedImage
  const [selectedImage, setSelectedImage] = useState<CollectionItem | null>(null);

  const whatsappMessage = "Halo! Saya tertarik dengan koleksi Marparbuei Fashion. Bisa info lebih lanjut?";
  const whatsappNumber = "6281234567890";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Koleksi fashion design Marparbuei - Cultural Journey dengan proper typing
  const collections: CollectionItem[] = [
    {
      id: 1,
      name: "Outer Ulos",
      image: "/image/marparbuei/3_1.jpg",
      description: "Koleksi yang menceritakan perjalanan budaya Batak melalui interpretasi modern dari ritual tradisional Marparbuei, dengan emphasis pada storytelling melalui textile dan silhouette",
      category: "Marparbuei",
      inspiration: "Traditional Ceremony",
    },
    {
      id: 2,
      name: "Kemeja",
      image: "/image/marparbuei/1_3.jpg",
      description: "Kemeja Putih “Marparbuei” – elegan dan penuh makna. Dibuat dari kain brokat premium, ukuran L, dengan sentuhan khas hande-hande di bagian detailnya. Perpaduan modern dan tradisional ini menghadirkan kesan anggun sekaligus menonjolkan budaya Batak yang kaya makna. Cocok untuk acara formal, adat, maupun tampilan semi-formal",
      category: "Marparbuei",
      inspiration: "Sacred Geometry",
    },
    {
      id: 3,
      name: "Outer Hande - Hande",
      image: "/image/marparbuei/2_2.jpg",
      description: "Set koordinat yang menggabungkan pattern tradisional dengan urban aesthetics, menciptakan bridge antara warisan leluhur dan lifestyle modern metropolitan",
      category: "Marparbuei",
      inspiration: "City Meets Culture",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-red-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.2'%3E%3Cpath d='m30 0 30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
      </div>

      <div className="relative z-10 text-white p-6 lg:p-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-3 text-sm">
            <li>
              <a href="/portfolio" className="text-amber-300 hover:text-white transition-colors duration-200 flex items-center">
                <span className="mr-2">🏠</span>
                Portfolio
              </a>
            </li>
            <li className="text-gray-400">→</li>
            <li className="text-white font-medium">Marparbuei Collection</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent mb-6 font-serif">Marparbuei</h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            <p className="text-2xl lg:text-3xl text-gray-200 leading-relaxed">
              Sebuah <span className="text-amber-300 font-semibold">perjalanan budaya</span> yang dituangkan ke dalam <span className="text-amber-300 font-semibold">karya busana etnik modern</span>
            </p>

            <div className="text-gray-300 text-lg italic max-w-4xl mx-auto leading-relaxed">
              &ldquo;Marparbuei menghadirkan narasi tentang perjalanan spiritual dan budaya. Setiap collection piece merefleksikan wisdom tradisional yang dikemas dalam bahasa fashion contemporary, menciptakan bridge antara masa lalu dan
              masa depan.&rdquo;
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-amber-200 mt-8">
              <div className="text-center">
                <div className="font-bold text-2xl">Cultural</div>
                <div>Journey</div>
              </div>
              <div className="h-8 w-px bg-amber-300/50"></div>
              <div className="text-center">
                <div className="font-bold text-2xl">6</div>
                <div>Story Pieces</div>
              </div>
              <div className="h-8 w-px bg-amber-300/50"></div>
              <div className="text-center">
                <div className="font-bold text-2xl">Modern</div>
                <div>Ethnic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {collections.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedImage(item)}>
              <div className="bg-gradient-to-br from-amber-900/20 to-red-900/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-amber-300/20 hover:border-amber-300/60 transition-all duration-700 hover:shadow-2xl hover:shadow-amber-300/20 hover:-translate-y-3">
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                  {/* Decorative Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Cultural Pattern Overlay */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-2 border-amber-300/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-amber-300 text-2xl">🎭</span>
                  </div>

                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{item.category}</span>
                        <span className="text-amber-200 text-xs font-medium uppercase tracking-wider">{item.inspiration}</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{item.description.substring(0, 120)}...</p>
                      <button className="bg-amber-400/20 hover:bg-amber-400/30 backdrop-blur-sm rounded-full px-4 py-2 text-sm transition-colors flex items-center space-x-2">
                        <span>✨</span>
                        <span>Explore Story</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-amber-300 transition-colors leading-tight">{item.name}</h3>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.category}</div>
                      <div className="text-amber-300 text-sm font-semibold">{item.inspiration}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>

                  {/* Cultural Elements */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-400 text-sm">🌟</span>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Cultural Heritage</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 rounded-3xl p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full"></div>

            <div className="relative z-10">
              <div className="text-5xl mb-6">🎭</div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 font-serif">Journey Through Culture</h3>
              <p className="text-xl mb-10 text-amber-800 leading-relaxed max-w-2xl mx-auto">
                Temukan makna di balik setiap jahitan dan warna. Marparbuei mengajak Anda untuk merasakan perjalanan budaya yang mendalam melalui medium fashion yang penuh cerita dan filosofi.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <span className="text-2xl">💬</span>
                  <span>Explore Journey</span>
                </a>

                <button className="inline-flex items-center justify-center space-x-3 bg-amber-800 hover:bg-amber-900 text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <span className="text-2xl">📿</span>
                  <span>Cultural Story</span>
                </button>
              </div>

              <div className="border-t border-amber-700/30 pt-8">
                <a href="/portfolio" className="inline-flex items-center text-amber-800 hover:text-amber-900 font-medium text-lg transition-colors">
                  <span className="mr-3">←</span>
                  Back to Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Image Preview */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedImage.name}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-bold uppercase">{selectedImage.category}</span>
                    <span className="text-gray-600 text-sm uppercase tracking-wide font-medium">Inspiration: {selectedImage.inspiration}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-gray-500 hover:text-gray-700 text-3xl">
                  ×
                </button>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage.image} alt={selectedImage.name} className="w-full h-96 object-cover rounded-2xl mb-8" />

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Cultural Story</h4>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedImage.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Collection Journey</h4>
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-gray-600 text-sm">Category:</span>
                      <span className="ml-2 font-medium">{selectedImage.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Inspiration:</span>
                      <span className="ml-2 font-medium">{selectedImage.inspiration}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Cultural Element:</span>
                      <span className="ml-2 font-medium">Batak Heritage Integration</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Design Philosophy:</span>
                      <span className="ml-2 font-medium">Bridging Past & Future</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pt-6 border-t border-gray-200">
                <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors text-lg">
                  Discuss This Journey
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
