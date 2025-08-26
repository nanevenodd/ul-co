"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/AdminHeader";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newFaq, setNewFaq] = useState<Omit<FAQ, "id">>({
    question: "",
    answer: "",
    isActive: true,
  });

  useEffect(() => {
    document.title = "FAQ - ULCO Admin";
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const response = await fetch("/api/faq");
      if (response.ok) {
        const data = await response.json();
        setFaqs(data.faqs || []); // The API returns { faqs: [...] }
      }
    } catch (error) {
      console.error("Error loading FAQs:", error);
      alert("Error loading FAQs");
    } finally {
      setLoading(false);
    }
  };

  const saveFAQ = async (faqData: FAQ | Omit<FAQ, "id">) => {
    try {
      const method = "id" in faqData ? "PUT" : "POST";
      const response = await fetch("/api/faq", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqData),
      });

      if (response.ok) {
        await loadFAQs();
        resetForm();
        alert("FAQ saved successfully!");
      } else {
        alert("Error saving FAQ");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Error saving FAQ");
    }
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const response = await fetch("/api/faq", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await loadFAQs();
        alert("FAQ deleted successfully!");
      } else {
        alert("Error deleting FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Error deleting FAQ");
    }
  };

  const resetForm = () => {
    setNewFaq({
      question: "",
      answer: "",
      isActive: true,
    });
    setEditingFaq(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Admin Header */}
      <AdminHeader
        title="FAQ Management"
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradientColors="from-blue-600 to-blue-800"
        breadcrumbItems={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "FAQ Management", current: true },
        ]}
      />

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New FAQ
            </button>
          </div>

          {showForm && (
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{editingFaq ? "Edit FAQ" : "Add New FAQ"}</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Question</label>
                  <input
                    type="text"
                    value={editingFaq ? editingFaq.question : newFaq.question}
                    onChange={(e) => {
                      if (editingFaq) {
                        setEditingFaq({ ...editingFaq, question: e.target.value });
                      } else {
                        setNewFaq({ ...newFaq, question: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#921e27] focus:border-transparent transition-all duration-300"
                    placeholder="Enter question..."
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Answer</label>
                  <textarea
                    value={editingFaq ? editingFaq.answer : newFaq.answer}
                    onChange={(e) => {
                      if (editingFaq) {
                        setEditingFaq({ ...editingFaq, answer: e.target.value });
                      } else {
                        setNewFaq({ ...newFaq, answer: e.target.value });
                      }
                    }}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#921e27] focus:border-transparent transition-all duration-300"
                    placeholder="Enter answer..."
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingFaq ? editingFaq.isActive : newFaq.isActive}
                    onChange={(e) => {
                      if (editingFaq) {
                        setEditingFaq({ ...editingFaq, isActive: e.target.checked });
                      } else {
                        setNewFaq({ ...newFaq, isActive: e.target.checked });
                      }
                    }}
                    className="h-5 w-5 text-[#921e27] focus:ring-[#921e27] border-gray-300 rounded"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">Active</label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button onClick={resetForm} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-300 font-medium">
                  Cancel
                </button>
                <button onClick={() => saveFAQ(editingFaq || newFaq)} className="px-6 py-3 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingFaq ? "Update FAQ" : "Save FAQ"}
                </button>
              </div>
            </div>
          )}

          <div className="p-8">
            {faqs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No FAQs found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">Get started by adding your first FAQ to help customers understand your services better.</p>
                <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add First FAQ
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-bold text-lg text-gray-900">{faq.question}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${faq.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{faq.isActive ? "Active" : "Inactive"}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex space-x-2 ml-6">
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                          title="Edit FAQ">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => deleteFAQ(faq.id)} className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50" title="Delete FAQ">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
