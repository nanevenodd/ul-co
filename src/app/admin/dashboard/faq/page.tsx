"use client";

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export default function FAQManagement() {
  const [faqData, setFaqData] = useState<FAQData>({
    title: "",
    subtitle: "",
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
  });

  // Load current content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const content = await response.json();
          if (content.faq) {
            setFaqData(content.faq);
          }
        }
      } catch (error) {
        console.error("Error loading FAQ content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Save content function
  const saveContent = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/content");
      if (response.ok) {
        const currentContent = await response.json();

        const updatedContent = {
          ...currentContent,
          faq: faqData,
        };

        const saveResponse = await fetch("/api/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        });

        if (saveResponse.ok) {
          setSaveMessage("✅ FAQ content saved successfully!");
          setTimeout(() => setSaveMessage(""), 3000);
        } else {
          throw new Error("Failed to save content");
        }
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setSaveMessage("❌ Failed to save FAQ content. Please try again.");
      setTimeout(() => setSaveMessage(""), 5000);
    } finally {
      setSaving(false);
    }
  };

  // Add new FAQ item
  const handleAddFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      const newId = Math.max(...faqData.items.map((item) => item.id), 0) + 1;
      const updatedItems = [
        ...faqData.items,
        {
          id: newId,
          question: newFAQ.question.trim(),
          answer: newFAQ.answer.trim(),
        },
      ];

      setFaqData({
        ...faqData,
        items: updatedItems,
      });

      setNewFAQ({ question: "", answer: "" });
      setShowAddFAQ(false);
    }
  };

  // Edit FAQ item
  const handleEditFAQ = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setNewFAQ({
      question: faq.question,
      answer: faq.answer,
    });
    setShowAddFAQ(true);
  };

  // Update FAQ item
  const handleUpdateFAQ = () => {
    if (editingFAQ && newFAQ.question.trim() && newFAQ.answer.trim()) {
      const updatedItems = faqData.items.map((item) => (item.id === editingFAQ.id ? { ...item, question: newFAQ.question.trim(), answer: newFAQ.answer.trim() } : item));

      setFaqData({
        ...faqData,
        items: updatedItems,
      });

      setNewFAQ({ question: "", answer: "" });
      setShowAddFAQ(false);
      setEditingFAQ(null);
    }
  };

  // Delete FAQ item
  const handleDeleteFAQ = (id: number) => {
    if (confirm("Are you sure you want to delete this FAQ item?")) {
      const updatedItems = faqData.items.filter((item) => item.id !== id);
      setFaqData({
        ...faqData,
        items: updatedItems,
      });
    }
  };

  // Cancel add/edit
  const handleCancel = () => {
    setNewFAQ({ question: "", answer: "" });
    setShowAddFAQ(false);
    setEditingFAQ(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage frequently asked questions and their answers</p>

        {/* Save Message */}
        {saveMessage && <div className={`mt-4 p-3 rounded-md ${saveMessage.includes("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{saveMessage}</div>}
      </div>

      {/* FAQ Header Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">FAQ Page Header</h3>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div>
            <label htmlFor="faqTitle" className="block text-sm font-medium text-gray-700">
              Page Title
            </label>
            <input
              type="text"
              id="faqTitle"
              value={faqData.title}
              onChange={(e) => setFaqData({ ...faqData, title: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Frequently Asked Questions"
            />
          </div>
          <div>
            <label htmlFor="faqSubtitle" className="block text-sm font-medium text-gray-700">
              Page Subtitle
            </label>
            <input
              type="text"
              id="faqSubtitle"
              value={faqData.subtitle}
              onChange={(e) => setFaqData({ ...faqData, subtitle: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Temukan jawaban untuk pertanyaan yang sering diajukan"
            />
          </div>
        </div>
      </div>

      {/* FAQ Items Management */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">FAQ Items</h3>
          <button
            onClick={() => setShowAddFAQ(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add FAQ
          </button>
        </div>

        {/* FAQ Items List */}
        <div className="px-6 py-5">
          {faqData.items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No FAQ items yet. Click &quot;Add FAQ&quot; to create your first item.</p>
          ) : (
            <div className="space-y-4">
              {faqData.items.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button onClick={() => handleEditFAQ(faq)} className="p-1 text-blue-600 hover:text-blue-800">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteFAQ(faq.id)} className="p-1 text-red-600 hover:text-red-800">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit FAQ Modal */}
      {showAddFAQ && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{editingFAQ ? "Edit FAQ Item" : "Add New FAQ Item"}</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="newQuestion" className="block text-sm font-medium text-gray-700">
                    Question
                  </label>
                  <input
                    type="text"
                    id="newQuestion"
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the question..."
                  />
                </div>

                <div>
                  <label htmlFor="newAnswer" className="block text-sm font-medium text-gray-700">
                    Answer
                  </label>
                  <textarea
                    id="newAnswer"
                    rows={4}
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the answer..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancel
                </button>
                <button
                  onClick={editingFAQ ? handleUpdateFAQ : handleAddFAQ}
                  disabled={!newFAQ.question.trim() || !newFAQ.answer.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {editingFAQ ? "Update FAQ" : "Add FAQ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={saveContent}
          disabled={saving}
          className={`px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl"}`}>
          {saving ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
