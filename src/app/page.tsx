import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-rose-50 via-white to-amber-50 min-h-screen">
      {/* Hero Section - Modern Fashion Design */}
      <section className="h-screen obg-cover bg-center flex items-center justify-center text-center text-gray-900 relative overflow-hidden" style={{ backgroundImage: "url('/image/1_1.jpg')" }}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#f5d4d7] to-[#921e27] rounded-full opacity-70 animate-float"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-[#f8cfcf] to-[#921e27] rounded-full opacity-60 animate-float delay-1000"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-[#e8cce0] to-[#921e27] rounded-full opacity-50 animate-float delay-2000"></div>

        <div className="relative z-10 animate-fade-in max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-extralight leading-tight mb-6 tracking-wide">
              <span className="text-[#921e27]">UL.CO</span>
              <br />
              <span className="text-4xl md:text-5xl font-light text-[#921e27]">TARULI PASARIBU</span>
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>

          <p className="text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto text-gray-600 leading-relaxed">
            UL.CO menghadirkan koleksi ready-to-wear berbahan Ulos dengan desain modern yang fungsional , menjadikan warisan budaya relevan dalam keseharian
          </p>

          <div className="animate-slide-up delay-500 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center bg-[#921e27] text-white font-medium py-4 px-8 rounded-full hover:bg-[#7a1a21] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-[#921e27]/50">
              <span className="mr-2">View Collection</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center border-2 border-gray-800 text-gray-800 font-medium py-4 px-8 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
              About Designer
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-[#921e27] relative">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#cfa1a6] to-[#921e27] rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[#e8b4b8] to-[#921e27] rounded-full opacity-35 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <div className="animate-fade-in-scroll">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-white tracking-wide">Design Philosophy</h2>
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white"></div>
            </div>

            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#fbeaec] mb-8">WARISAN ELEGAN KEINDAHAN ABADI</p>

            <p className="text-lg leading-relaxed text-[#f8d4d8] max-w-3xl mx-auto">
              UL.CO menghadirkan fashion berbasis kain ulos,mengenakan warisan budaya suku Batak dalam keseharian. Melalui pendekatan sustainable fashion, UL.CO memastikan setiap produk ramah lingkungan melalui konsep Zero Waste,
              pemanfaatan limbah tenun, serta pewarnaan alami.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gradient-to-br from-red-100 via-rose-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-scroll">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-800 tracking-wide">Featured Collections</h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the latest collections that blend contemporary aesthetics with timeless craftsmanship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Collection 1 */}
            <Link href="/collection/marparbuei" className="group animate-fade-in-scroll delay-100">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image src="/image/marparbuei.jpg" alt="Ethereal Spring Collection" width={500} height={600} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-sm px-4 py-2 rounded-full font-medium">Marparbuei Collection</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light mb-3 text-gray-800">Marparbuei Collection</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Marparbuei,sebuah perjalanan budaya yang dituangkan ke dalam karya busana etnik modern. Tunjukkan keanggunan tradisi dengan cara baru! Jangan tunggu lagi, miliki koleksi ini sekarang juga! Pesan dengan mudah melalui
                    WhatsApp atau temukan kami di Shopee untuk pengalaman belanja yang praktis dan menyenangkan.
                  </p>
                  <div className="flex items-center text-[#921e27] group-hover:text-[#7a1a21] transition-colors">
                    <span className="text-sm font-medium mr-2">View Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Collection 2 */}
            <Link href="/collection/butet" className="group animate-fade-in-scroll delay-200">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image src="/image/butet.jpg" alt="Urban Minimalist Collection" width={500} height={600} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-sm px-4 py-2 rounded-full font-medium">Butet Collection</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light mb-3 text-gray-800">Butet Collection</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    koleksi terbaru dari UL.CO yang memadukan kekuatan perempuan dengan keindahan kain ulos pucca. Setiap potongannya diciptakan dengan desain personal dan penuh makna, dibuat terbatas agar kamu jadi satu-satunya yang
                    memilikinya.
                  </p>
                  <div className="flex items-center text-[#921e27] group-hover:text-[#7a1a21] transition-colors">
                    <span className="text-sm font-medium mr-2">View Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Collection 3 */}
            <Link href="/collection/aksesoris" className="group animate-fade-in-scroll delay-300">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image src="/image/aksesoris.jpeg" alt="Avant-Garde Evening Collection" width={500} height={600} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-sm px-4 py-2 rounded-full font-medium">UL.CO Aksesoris</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light mb-3 text-gray-800">UL.CO Aksesoris</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Warisan Budaya dalam Sentuhan Modern Perpaduan kain ulos yang kaya makna dengan desain khas UL.CO menciptakan aksesori elegan dan timeless. Tambahkan nuansa budaya dalam gaya Anda! Dapatkan sekarang & tunjukkan
                    kebanggaanmu!
                  </p>
                  <div className="flex items-center text-[#921e27] group-hover:text-[#7a1a21] transition-colors">
                    <span className="text-sm font-medium mr-2">View Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* View All Button */}
          <div className="text-center mt-16 animate-fade-in-scroll delay-400">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center bg-[#921e27] text-white font-medium py-4 px-12 rounded-full hover:bg-[#7a1a21] transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[#921e27]/50">
              <span className="mr-2">Explore All Collections</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#921e27] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#921e27]/20"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#cfa1a6]/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#fbeaec]/30 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-scroll">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-white tracking-wide">Let&apos;s Create Together</h2>
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white"></div>
            </div>

            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#fbeaec] mb-12 max-w-3xl mx-auto">Ready to bring your fashion vision to life? Let&apos;s collaborate on your next project.</p>

            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-[#921e27] font-medium py-4 px-8 rounded-full hover:bg-[#fbeaec] transition-all duration-300 transform hover:scale-105 shadow-xl shadow-white/30">
                <span className="mr-2">Start a Project</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
