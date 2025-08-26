import { promises as fs } from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicBreadcrumb from "@/components/PublicBreadcrumb";
import FAQClient from "./FAQClient";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

async function getFAQs(): Promise<FAQ[]> {
  try {
    const faqFile = path.join(process.cwd(), "src/data/faq.json");
    const data = await fs.readFile(faqFile, "utf8");
    const faqData = JSON.parse(data);
    return faqData.faqs?.filter((faq: FAQ) => faq.isActive) || [];
  } catch (error) {
    console.error("Error loading FAQs:", error);
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white py-24">
          <div className="max-w-6xl mx-auto px-8">
            <PublicBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "FAQ", current: true },
              ]}
              className="mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white/80 max-w-2xl">Find answers to common questions about our products and services.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <FAQClient faqs={faqs} />

          {/* Contact Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Can&apos;t find the answer you&apos;re looking for? Please get in touch with our team.</p>
            <a href="/contact" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-lg hover:shadow-lg transition-all">
              Contact Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
