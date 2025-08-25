import Image from "next/image";
import Link from "next/link";

const portfolioItems = [
  {
    title: "Marparbuei",
    category: "Marparbuei Collection",
    description: "Marparbuei,sebuah perjalanan budaya yang dituangkan ke dalam karya busana etnik modern.",
    image: "/image/marparbuei.jpg",
    color: "rose",
    slug: "marparbuei",
  },
  {
    title: "Butet",
    category: "Butet Collection",
    description: "Koleksi terbaru dari UL.CO yang memadukan kekuatan perempuan dengan keindahan kain ulos pucca.",
    image: "/image/butet.jpg",
    color: "blue",
    slug: "butet",
  },
  {
    title: "Aksesoris",
    category: "Koleksi Aksesoris",
    description: "Koleksi Dramatic statements and luxurious textures for evening wear",
    image: "/image/aksesoris.jpeg",
    color: "purple",
    slug: "aksesoris",
  },
];

const getColorClasses = (color: string) => {
  const colorMap = {
    rose: "from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700",
    blue: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
    purple: "from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700",
    amber: "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
    gray: "from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900",
    emerald: "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.rose;
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#921e27] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#7a1a21]/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-[#5e0e15]/30 rounded-full blur-3xl animate-float delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-[#921e27]/30 rounded-full blur-3xl animate-float delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-4xl font-extralight leading-tight mb-8 tracking-wide text-white">
              Halo Dongan
              <span className="block text-3xl md:text-8xl font-light text-[#f8c85c] font-[var(--font-script)]">UL.CO</span>
            </h1>

            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="h-px w-16 bg-white/40"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="h-px w-16 bg-white/40"></div>
            </div>

            <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              UL.CO, merayakan slow fashion dengan desain yang abadi. Dari sisa jadi makna, setiap karya terlahir lewat konsep zero waste yang berkelanjutan.
            </p>
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">#ULCOberDampak</p>
          </div>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-rose-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-[#921e27] text-white rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg">All Collections</button>
            <button className="px-6 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-[#921e27] hover:text-[#921e27] transition-all duration-300 hover:scale-105">Marparbuei</button>
            <button className="px-6 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-[#921e27] hover:text-[#921e27] transition-all duration-300 hover:scale-105">Butet</button>
            <button className="px-6 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-[#921e27] hover:text-[#921e27] transition-all duration-300 hover:scale-105">Aksesoris</button>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={item.title} className="group animate-fade-in-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
                  <div className="relative overflow-hidden">
                    <Image src={item.image} alt={item.title} width={500} height={600} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-6 left-6 right-6">
                        <Link
                          href={`/collection/${item.slug}`}
                          className={`inline-flex items-center px-4 py-2 bg-[#921e27] ${getColorClasses(
                            item.color
                          )} text-white rounded-full text-sm font-medium mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300`}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-2 rounded-full font-medium">{item.category}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-light mb-3 text-gray-800 group-hover:text-[#921e27] transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <Link href={`/collection/${item.slug}`} className="flex items-center text-[#921e27] group-hover:text-[#921e27] transition-colors">
                        <span className="text-sm font-medium mr-2">Explore Collection</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>

                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-gray-100 hover:bg-rose-100 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110">
                          <svg className="w-4 h-4 text-gray-600 hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 bg-gray-100 hover:bg-rose-100 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110">
                          <svg className="w-4 h-4 text-gray-600 hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-white via-rose-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-rose-300/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-800 tracking-wide">Interested in Custom Design?</h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <p className="text-xl font-light text-gray-600 mb-12 max-w-2xl mx-auto">Let&apos;s collaborate to create something extraordinary that reflects your unique vision.</p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#921e27] text-white font-medium py-4 px-8 rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-rose-300/50">
              <span className="mr-2">Start a Project</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
