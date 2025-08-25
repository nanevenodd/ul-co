'use client';

import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

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
  const [newFaq, setNewFaq] = useState<Omit<FAQ, 'id'>>({
    question: '',
    answer: '',
    isActive: true
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Error loading FAQs:', error);
      alert('Error loading FAQs');
    } finally {
      setLoading(false);
    }
  };

  const saveFAQ = async (faqData: FAQ | Omit<FAQ, 'id'>) => {
    try {
      const method = 'id' in faqData ? 'PUT' : 'POST';
      const response = await fetch('/api/faq', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faqData),
      });

      if (response.ok) {
        await loadFAQs();
        resetForm();
        alert('FAQ saved successfully!');
      } else {
        alert('Error saving FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Error saving FAQ');
    }
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const response = await fetch('/api/faq', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await loadFAQs();
        alert('FAQ deleted successfully!');
      } else {
        alert('Error deleting FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Error deleting FAQ');
    }
  };

  const resetForm = () => {
    setNewFaq({
      question: '',
      answer: '',
      isActive: true
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Breadcrumb items={[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'FAQ Management', href: '/admin/dashboard/faq' }
          ]} />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">FAQ Management</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Add New FAQ
            </button>
          </div>

          {showForm && (
            <div className="p-6 border-b bg-gray-50">
              <h3 className="text-lg font-medium mb-4">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
                    placeholder="Enter question..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
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
                    className="h-4 w-4 text-[#921e27] focus:ring-[#921e27] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Active</label>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => saveFAQ(editingFaq || newFaq)}
                    className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    {editingFaq ? 'Update FAQ' : 'Save FAQ'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
                <p className="text-gray-500 mb-4">Get started by adding your first FAQ.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Add First FAQ
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{faq.question}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            faq.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {faq.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteFAQ(faq.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
