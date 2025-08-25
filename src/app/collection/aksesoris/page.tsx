"use client";

import { useState } from "react";

// Define interface untuk type safety
interface CollectionItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
}

export default function AksesorisDetailPage() {
  // Fix: Proper typing untuk selectedImage
  const [selectedImage, setSelectedImage] = useState<CollectionItem | null>(null);

  const whatsappMessage = "Halo! Saya tertarik dengan koleksi Aksesoris Ulos Butet. Bisa info lebih lanjut?";
  const whatsappNumber = "6281234567890";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Koleksi fashion design aksesoris dengan proper typing
  const collections: CollectionItem[] = [
    {
      id: 1,
      name: "Anting Bulat Mini",
      image: "/image/aksesoris/1.jpg",
      description:
        "Aksesoris UL.CO lahir dari sisa pembuatan koleksi utama. Setiap potongan kain diolah kembali menjadi karya luar biasa dengan konsep zero waste, menghadirkan desain unik sekaligus menjaga keberlanjutan. Dengan UL.CO, fashion tak hanya indah, tapi juga penuh makna.",
      category: "Anting",
    },
    {
      id: 2,
      name: "Kalung Sibolang Mutiara",
      image: "/image/aksesoris/2.jpg",
      description:
        "Aksesoris UL.CO lahir dari sisa pembuatan koleksi utama. Setiap potongan kain diolah kembali menjadi karya luar biasa dengan konsep zero waste, menghadirkan desain unik sekaligus menjaga keberlanjutan. Dengan UL.CO, fashion tak hanya indah, tapi juga penuh makna.",
      category: "Kalung",
    },
    {
      id: 3,
      name: "Kalung Susun Sibolang",
      image: "/image/aksesoris/3.jpg",
      description:
        "Aksesoris UL.CO lahir dari sisa pembuatan koleksi utama. Setiap potongan kain diolah kembali menjadi karya luar biasa dengan konsep zero waste, menghadirkan desain unik sekaligus menjaga keberlanjutan. Dengan UL.CO, fashion tak hanya indah, tapi juga penuh makna.",
      category: "Kalung",
    },
    {
      id: 4,
      name: "Kalung Pom-Pom Sibolang",
      image: "/image/aksesoris/4.jpg",
      description:
        "Aksesoris UL.CO lahir dari sisa pembuatan koleksi utama. Setiap potongan kain diolah kembali menjadi karya luar biasa dengan konsep zero waste, menghadirkan desain unik sekaligus menjaga keberlanjutan. Dengan UL.CO, fashion tak hanya indah, tapi juga penuh makna.",
      category: "Kalung",
    },
    {
      id: 5,
      name: "Kaling Mutiara Abu",
      image: "/image/aksesoris/5.jpg",
      description:
        "Aksesoris UL.CO lahir dari sisa pembuatan koleksi utama. Setiap potongan kain diolah kembali menjadi karya luar biasa dengan konsep zero waste, menghadirkan desain unik sekaligus menjaga keberlanjutan. Dengan UL.CO, fashion tak hanya indah, tapi juga penuh makna.",
      category: "Kalung",
    },
    {
      id: 6,
      name: "Kalung Kristal",
      image: "/image/aksesoris/6.jpg",
      description:
        "Aksesoris UL.CO lahir dari sisa pembuatan koleksi utama. Setiap potongan kain diolah kembali menjadi karya luar biasa dengan konsep zero waste, menghadirkan desain unik sekaligus menjaga keberlanjutan. Dengan UL.CO, fashion tak hanya indah, tapi juga penuh makna.",
      category: "Kalung",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <li className="text-white font-medium">Aksesoris Collection</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent mb-4">Aksesoris</h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full"></div>
          </div>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-6">
            Koleksi aksesoris yang memadukan <span className="text-yellow-300 font-semibold">warisan budaya Batak</span> dengan
            <span className="text-yellow-300 font-semibold"> estetika fashion kontemporer</span>
          </p>
          <div className="text-gray-400 text-lg italic">&ldquo;Setiap pieces menceritakan filosofi ulos sebagai simbol perlindungan dan kekuatan&rdquo;</div>
        </div>

        {/* Collection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {collections.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedImage(item)}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-300/20 hover:-translate-y-2">
                {/* Image Container */}
                <div className="aspect-square relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm mb-3 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{item.category}</span>
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors">
                        <span className="text-xl">👁️</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-yellow-300 transition-colors leading-tight">{item.name}</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.category}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-3xl p-10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Jelajahi Koleksi Lengkap</h3>
              <p className="text-lg mb-8 text-gray-800">Temukan cerita di balik setiap design dan filosofi budaya yang terkandung dalam koleksi ini</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <span className="text-2xl">💬</span>
                  <span>Diskusi Koleksi</span>
                </a>

                <button className="inline-flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <span className="text-2xl">📖</span>
                  <span>Baca Design Story</span>
                </button>
              </div>

              <div className="border-t border-gray-700/30 pt-6">
                <a href="/portfolio" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  <span className="mr-2">←</span>
                  Kembali ke Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Image Preview */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedImage.name}</h3>
                <button onClick={() => setSelectedImage(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage.image} alt={selectedImage.name} className="w-full h-80 object-cover rounded-lg mb-6" />
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">{selectedImage.category}</div>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedImage.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Design Philosophy</p>
                  <p className="text-lg font-semibold text-gray-900">Cultural Heritage × Contemporary Fashion</p>
                </div>
                <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                  Diskusi Design
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
