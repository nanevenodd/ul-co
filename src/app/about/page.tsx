import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

async function getContent() {
  try {
    const contentPath = path.join(process.cwd(), "src/data/content.json");
    const fileContents = await fs.readFile(contentPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      about: {
        introduction: "Welcome to UL.CO, where traditional Indonesian artistry meets contemporary fashion design.",
        designerName: "Taruli Pasaribu",
        designerPhoto: "/designer/profile.jpg",
        experience: "10+ years of experience in fashion design",
        philosophyText: "Our design philosophy centers on creating timeless pieces that celebrate cultural heritage while embracing modern aesthetics.",
        biography: "Taruli Pasaribu is a renowned fashion designer who has dedicated her career to bridging the gap between traditional Indonesian textiles and contemporary fashion.",
        achievements: [],
      },
    };
  }
}

// Force no caching for About page to ensure real-time updates
export const dynamic = "force-dynamic";
export const revalidate = 0;

const achievements = ["Featured in Vogue Indonesia", "Collaborated with 50+ cultural artisans", "Showcased at Paris Fashion Week", "Sustainable fashion advocate", "Cultural preservation champion"];

export default async function About() {
  const content = await getContent();
  const aboutData = content.about || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About UL.CO</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{aboutData.introduction || "Selamat datang di dunia fashion UL.CO, di mana tradisi bertemu dengan inovasi."}</p>
            </div>
          </div>
        </section>

        {/* Designer Profile */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="mb-8 lg:mb-0">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                  {aboutData.designerPhoto ? (
                    <Image src={aboutData.designerPhoto} alt={aboutData.designerName || "Designer"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <span className="text-gray-400">Designer Photo</span>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutData.designerName || "Taruli Pasaribu"}</h2>
                <p className="text-lg text-gray-600 mb-6">Fashion Designer & Cultural Heritage Advocate</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {aboutData.biography || "Dengan pengalaman lebih dari 10 tahun dalam industri fashion, Taruli Pasaribu telah mendedikasikan kariernya untuk melestarikan warisan budaya melalui fashion."}
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {aboutData.philosophyText || "Melalui UL.CO, Taruli menggabungkan teknik tradisional kain ulos dengan desain kontemporer, menciptakan fashion yang berkelanjutan dan bermakna."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                    <p className="text-gray-600">{aboutData.experience || "10+ Years in Fashion Design"}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specialization</h4>
                    <p className="text-gray-600">{aboutData.specialization || "Traditional meets Modern"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Design Philosophy</h2>
              <blockquote className="text-2xl text-gray-600 font-medium leading-relaxed mb-8">
                &ldquo;{aboutData.philosophyQuote || "Setiap karya adalah cerita, setiap desain adalah warisan. Fashion bukan hanya tentang penampilan, tetapi juga tentang identitas dan makna."}&rdquo;
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-16 h-16 bg-[#921e27] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Heritage</h3>
                  <p className="text-gray-600">{aboutData.heritageDescription || "Melestarikan warisan budaya ulos untuk generasi mendatang"}</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-[#921e27] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600">{aboutData.innovationDescription || "Menggabungkan tradisi dengan desain modern dan kontemporer"}</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-[#921e27] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
                  <p className="text-gray-600">{aboutData.sustainabilityDescription || "Menciptakan fashion berkelanjutan yang ramah lingkungan"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Achievements</h2>
              <p className="text-lg text-gray-600">Pencapaian yang membanggakan dalam perjalanan fashion UL.CO</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(aboutData.simpleAchievements || achievements).map((achievement: string, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-sm text-gray-600">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
              <p className="text-lg text-gray-600">Penghargaan yang diterima sebagai pengakuan atas dedikasi dan inovasi</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(aboutData.achievements || []).map((award: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#921e27] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{award.year}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{award.title}</h3>
                      <p className="text-sm text-[#921e27] font-medium">{award.organization}</p>
                      <p className="text-gray-600 mt-2">{award.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#921e27] to-[#7a1921] rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Create Something Beautiful Together</h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">Mari berkolaborasi menciptakan karya fashion yang unik dan bermakna. Wujudkan visi fashion Anda bersama UL.CO.</p>
              <Link href="/contact" className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#921e27] transition-colors">
                Let&apos;s Collaborate
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
