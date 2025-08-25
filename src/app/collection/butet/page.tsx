"use client";

import { useState } from "react";

// Define interface untuk type safety
interface CollectionItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  concept: string;
}

export default function ButetDetailPage() {
  // Fix: Proper typing untuk selectedImage
  const [selectedImage, setSelectedImage] = useState<CollectionItem | null>(null);

  const whatsappMessage = "Halo! Saya tertarik dengan koleksi Butet Fashion. Bisa info lebih lanjut?";
  const whatsappNumber = "6281234567890";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Koleksi fashion design Butet dengan proper typing
  const collections: CollectionItem[] = [
    {
      id: 1,
      name: "Outer Pucca",
      image: "/image/butet/butet.jpeg",
      description:
        "Outer elegan dengan desain modern dan sentuhan etnik. Dibuat dari bahan berkualitas, dihias detail payet eksklusif yang memberi kilau mewah tanpa berlebihan. Cocok untuk acara formal, pesta, atau momen spesial yang ingin menonjolkan gaya anggun dengan identitas budaya.",
      category: "Ready-to-Wear",
      concept: "Feminine Power",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2L76 40h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
      </div>

      <div className="relative z-10 text-white p-6 lg:p-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-3 text-sm">
            <li>
              <a href="/portfolio" className="text-yellow-300 hover:text-white transition-colors duration-200 flex items-center">
                <span className="mr-2">🏠</span>
                Portfolio
              </a>
            </li>
            <li className="text-gray-400">→</li>
            <li className="text-white font-medium">Butet Collection</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <h1 className="text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent mb-6 font-serif">Butet</h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            <p className="text-2xl lg:text-3xl text-gray-200 leading-relaxed">
              Koleksi yang memadukan <span className="text-yellow-300 font-semibold">kekuatan perempuan Batak</span> dengan
              <span className="text-yellow-300 font-semibold"> keindahan kain ulos pucca</span>
            </p>

            <div className="text-gray-300 text-lg italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;Butet - sebuah narasi tentang perempuan yang kuat, mandiri, dan berkarakter. Setiap pieces dalam koleksi ini merefleksikan filosofi ulos sebagai simbol perlindungan dan kekuatan yang diwariskan turun temurun.&rdquo;
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-yellow-200 mt-8">
              <div className="text-center">
                <div className="font-bold text-2xl">1</div>
                <div>Signature Pieces</div>
              </div>
              <div className="h-8 w-px bg-yellow-300/50"></div>
              <div className="text-center">
                <div className="font-bold text-2xl">2024</div>
                <div>Collection</div>
              </div>
              <div className="h-8 w-px bg-yellow-300/50"></div>
              <div className="text-center">
                <div className="font-bold text-2xl">Heritage</div>
                <div>Inspired</div>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {collections.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedImage(item)}>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-300/50 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-300/20 hover:-translate-y-3">
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{item.category}</span>
                        <span className="text-yellow-300 text-xs font-medium uppercase tracking-wider">{item.concept}</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{item.description.substring(0, 120)}...</p>
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 text-sm transition-colors flex items-center space-x-2">
                        <span>👁️</span>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-yellow-300 transition-colors leading-tight">{item.name}</h3>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.category}</div>
                      <div className="text-yellow-300 text-sm font-semibold">{item.concept}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-3xl p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>

            <div className="relative z-10">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 font-serif">Explore Butet Universe</h3>
              <p className="text-xl mb-10 text-gray-800 leading-relaxed max-w-2xl mx-auto">
                Masuki dunia fashion yang menghormati warisan budaya sambil merangkul inovasi. Setiap pieces adalah manifestasi dari kekuatan dan keanggunan perempuan modern.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <span className="text-2xl">💬</span>
                  <span>Discuss Collection</span>
                </a>

                <button className="inline-flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <span className="text-2xl">📚</span>
                  <span>Design Philosophy</span>
                </button>
              </div>

              <div className="border-t border-gray-700/30 pt-8">
                <a href="/portfolio" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium text-lg transition-colors">
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
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold uppercase">{selectedImage.category}</span>
                    <span className="text-gray-600 text-sm uppercase tracking-wide font-medium">Concept: {selectedImage.concept}</span>
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
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Design Story</h4>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedImage.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Collection Details</h4>
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-gray-600 text-sm">Category:</span>
                      <span className="ml-2 font-medium">{selectedImage.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Design Concept:</span>
                      <span className="ml-2 font-medium">{selectedImage.concept}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Heritage Element:</span>
                      <span className="ml-2 font-medium">Ulos Pucca Integration</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pt-6 border-t border-gray-200">
                <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors text-lg">
                  Discuss This Piece
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
