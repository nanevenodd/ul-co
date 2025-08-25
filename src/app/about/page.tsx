import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-rose-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-float delay-1000"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-indigo-300/30 rounded-full blur-3xl animate-float delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-2xl font-extralight leading-tight mb-8 tracking-wide text-gray-800">
              Tentang
              <span className="block text-5xl md:text-8xl mt-2 bg-[#931f28] bg-clip-text text-transparent" style={{ fontFamily: "'Alex Brush', cursive" }}>
                Taruli Pasaribu
              </span>
            </h1>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <p className="text-xl md:text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Taruli Pasaribu is a visionary fashion designer and the founder of UL.CO Taruli Pasaribu, a brand that blends bold creativity with timeless elegance. With a strong presence in the Indonesian fashion scene, Taruli is also the
              creative force behind @fashion.design.siantar, where she nurtures emerging talent and promotes local design excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Designer Profile Section */}
      <section className="py-20 bg-gradient-to-b from-[#921e27] to-[#5e0e15] relative text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image Side */}
            <div className="animate-fade-in-scroll">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-[#7a1a21] to-[#921e27] rounded-3xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/image/uli.jpg" alt="Fashion Designer Portrait" width={600} height={700} className="w-full h-96 lg:h-[500px] object-cover object-[0_20%]" />
                </div>

                {/* Floating stats */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-light text-[#921e27] mb-1">6+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>

                <div className="absolute top-8 -right-4 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-light mb-1">100+</div>
                    <div className="text-xs">Designs Created</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="animate-fade-in-scroll">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-white">Taruli Pasaribu</h2>
                  <p className="text-lg leading-relaxed mb-6 text-neutral-200">Setiap benang adalah warisan. Setiap motif adalah cerita. Setiap karya adalah penghormatan.</p>
                  <p className="text-lg leading-relaxed text-neutral-200">
                    Sebagai desainer dari Tanah Batak, Taruli Pasaribu menjadikan ulos bukan sekadar kain, melainkan simbol identitas, kekuatan, dan kasih sayang. Filosofi desainnya berakar pada nilai-nilai leluhur, namun tumbuh dalam
                    semangat inovasi dan keberlanjutan.
                  </p>
                </div>

                {/* Achievement highlights */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#921e27] to-[#7a1a21] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-light text-[#921e27] mb-1">Juara 2</div>
                    <div className="text-sm text-gray-600">Desain Wastra Tapanuli</div>
                  </div>

                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#7a1a21] to-[#5e0e15] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div className="text-2xl font-light text-[#921e27] mb-1">Juara 3</div>
                    <div className="text-sm text-gray-600">Toba Jou Jou 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-800 tracking-wide">Design Philosophy</h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">Setiap benang adalah warisan. Setiap motif adalah cerita. Setiap karya adalah penghormatan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Philosophy 1 */}
            <div className="animate-fade-in-scroll delay-100">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800 text-center">Cultural Integrity</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Mengangkat kekayaan tekstil Batak melalui eksplorasi motif ulos yang autentik, Taruli merancang dengan rasa hormat terhadap tradisi, menjadikannya relevan di panggung mode global.
                </p>
              </div>
            </div>

            {/* Philosophy 2 */}
            <div className="animate-fade-in-scroll delay-200">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800 text-center"> Sustainable Craftsmanship</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Setiap koleksi dibuat dengan pendekatan ramah lingkungan—menggunakan bahan alami, teknik pewarnaan tradisional, dan produksi etis yang memberdayakan pengrajin lokal.
                </p>
              </div>
            </div>

            {/* Philosophy 3 */}
            <div className="animate-fade-in-scroll delay-300">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-800 text-center">Timeless Innovation</h3>
                <p className="text-gray-600 text-center leading-relaxed">Taruli memadukan siluet kontemporer dengan tekstur ulos yang khas, menciptakan busana yang tak lekang oleh waktu namun tetap berani bereksperimen secara artistik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-[#921e27] to-[#5e0e15] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">Recognition & Awards</h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Award 1 */}
            <div className="animate-fade-in-scroll delay-100">
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-[#f8c85c] to-[#d89c00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#921e27]">Fashion show bersama Dekranasda</h3>
                <p className="text-sm text-gray-600">2023</p>
              </div>
            </div>

            {/* Award 2 */}
            <div className="animate-fade-in-scroll delay-200">
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-[#921e27] to-[#7a1a21] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#921e27]">Lolos Inkubator Bisnis Kementerian Perindustrian</h3>
                <p className="text-sm text-gray-600">2024</p>
              </div>
            </div>

            {/* Award 3 */}
            <div className="animate-fade-in-scroll delay-300">
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7a1a21] to-[#5e0e15] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#921e27]">Lolos Binaan Wirusaha Unggulan Bank Indonesia</h3>
                <p className="text-sm text-gray-600">2025</p>
              </div>
            </div>

            {/* Award 4 */}
            <div className="animate-fade-in-scroll delay-400">
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-[#fbeaec] to-[#cfa1a6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#921e27]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#921e27]">Juara 3 Lomba Wirausaha Muda </h3>
                <p className="text-sm text-gray-600">2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-100 via-white to-amber-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-rose-300/30 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-300/30 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-800 tracking-wide">Let&apos;s Create Something Beautiful</h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <p className="text-xl font-light text-gray-600 mb-12 max-w-2xl mx-auto">Ready to collaborate on your next fashion project? I&apos;d love to hear your vision.</p>

            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#931f28] text-white font-medium py-4 px-8 rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-rose-300/50">
                <span className="mr-2">Get in Touch</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center border-2 border-gray-800 text-gray-800 font-medium py-4 px-8 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
