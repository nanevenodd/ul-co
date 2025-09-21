import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedCollections from "@/components/sections/FeaturedCollections";
import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "UL.CO - Fashion berbasis kain ulos dengan desain modern dan berkelanjutan oleh Taruli Pasaribu",
};

async function getContent() {
  try {
    // Read content directly from file in server component
    const contentPath = path.join(process.cwd(), "src/data/content.json");
    const fileContents = await fs.readFile(contentPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error fetching content:", error);
    // Return default content as fallback
    return {
      hero: {
        title: "UL.CO",
        subtitle: "Fashion Berbasis Kain Ulos",
        description: "Menghadirkan fashion berbasis kain ulos dengan desain modern dan berkelanjutan",
        ctaText: "Explore Collections",
        ctaLink: "/portfolio",
        ctaSecondaryText: "Learn More",
        ctaSecondaryLink: "/about",
      },
      philosophy: {
        title: "Design Philosophy",
        subtitle: "Tradisi Bertemu Modernitas",
        description: "UL.CO menggabungkan warisan budaya kain ulos dengan desain kontemporer, menciptakan fashion yang berkelanjutan dan bermakna.",
      },
    };
  }
}

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

export default async function Home() {
  const content = await getContent();
  const collectionsData = await getCollections();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <main
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: content.hero.backgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${content.hero.backgroundImage})` : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className={content.hero.backgroundImage ? "text-white" : "text-[#921e27]"}>{content.hero.title}</span>
          </h1>
          <h2 className={`mt-3 text-xl sm:text-2xl ${content.hero.backgroundImage ? "text-gray-100" : "text-gray-600"}`}>{content.hero.subtitle}</h2>
          <p className={`mt-5 max-w-md mx-auto text-base sm:text-lg md:mt-8 md:text-xl md:max-w-3xl ${content.hero.backgroundImage ? "text-gray-200" : "text-gray-500"}`}>{content.hero.description}</p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href={content.hero.ctaLink} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#921e27] hover:bg-[#7a1921] transition-colors">
              {content.hero.ctaText}
            </Link>
            <Link
              href={content.hero.ctaSecondaryLink}
              className={`inline-flex items-center px-6 py-3 border text-base font-medium rounded-md transition-colors ${
                content.hero.backgroundImage ? "border-white text-white hover:bg-white hover:text-[#921e27]" : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              }`}>
              {content.hero.ctaSecondaryText}
            </Link>
          </div>
        </div>
      </main>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Design Philosophy Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900">{content.philosophy.title}</h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{content.philosophy.subtitle}</p>
          <p className="mt-4 max-w-4xl mx-auto text-base text-gray-500">{content.philosophy.description}</p>
        </div>

        {/* Featured Collections Preview */}
        <FeaturedCollections collections={(collectionsData.collections as any) || []} />

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">{content.faq?.title || "Frequently Asked Questions"}</h3>
          <p className="text-center text-gray-600 mb-8">{content.faq?.subtitle}</p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {(content.faq?.items || []).map((faqItem: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{faqItem.question}</h4>
                <p className="text-gray-600">{faqItem.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center px-6 py-3 border border-[#921e27] text-base font-medium rounded-md text-[#921e27] bg-white hover:bg-[#921e27] hover:text-white">
              View All FAQ
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#921e27] to-[#7a1921] rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Let&apos;s Create Together</h3>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">Wujudkan impian fashion Anda dengan desain kustom yang dibuat khusus untuk Anda</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#921e27] transition-colors">
            Start Your Project
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
