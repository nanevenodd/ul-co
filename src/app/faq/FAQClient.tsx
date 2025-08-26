"use client";

import { useState } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

interface FAQClientProps {
  faqs: FAQ[];
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const displayedFAQs = showAll ? faqs : faqs.slice(0, 5);

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600 mb-4">No FAQs available at the moment.</h3>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayedFAQs.map((faq) => (
        <div key={faq.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button onClick={() => toggleFAQ(faq.id)} className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:ring-inset">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
              <div className={`flex-shrink-0 transform transition-transform duration-200 ${openItems.has(faq.id) ? "rotate-180" : ""}`}>
                <svg className="w-6 h-6 text-[#921e27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>

          {openItems.has(faq.id) && (
            <div className="px-8 pb-6">
              <div className="border-t border-gray-100 pt-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Show More/Less Button */}
      {faqs.length > 5 && (
        <div className="text-center pt-8">
          <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-lg hover:shadow-lg transition-all">
            {showAll ? (
              <>
                Show Less
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Show More FAQs ({faqs.length - 5} more)
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
