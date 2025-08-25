"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

interface FooterData {
  footer: {
    brandDescription: string;
    copyright: string;
    bottomText: string;
    socialLinks: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    navigation: Array<{
      label: string;
      href: string;
    }>;
  };
}

export default function FooterManagement() {
  const [content, setContent] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert('Footer content saved successfully!');
      } else {
        alert('Failed to save footer content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateFooter = (field: string, value: string | Array<{ platform: string; url: string; icon: string }> | Array<{ label: string; href: string }>) => {
    if (!content) return;

    setContent(prev => ({
      ...prev!,
      footer: {
        ...prev!.footer,
        [field]: value
      }
    }));
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    if (!content) return;

    const newSocialLinks = [...content.footer.socialLinks];
    newSocialLinks[index] = {
      ...newSocialLinks[index],
      [field]: value
    };

    updateFooter('socialLinks', newSocialLinks);
  };

  const addSocialLink = () => {
    if (!content) return;

    const newSocialLinks = [
      ...content.footer.socialLinks,
      { platform: '', url: '', icon: '' }
    ];

    updateFooter('socialLinks', newSocialLinks);
  };

  const removeSocialLink = (index: number) => {
    if (!content) return;

    const newSocialLinks = content.footer.socialLinks.filter((_, i) => i !== index);
    updateFooter('socialLinks', newSocialLinks);
  };

  const updateNavigation = (index: number, field: string, value: string) => {
    if (!content) return;

    const newNavigation = [...content.footer.navigation];
    newNavigation[index] = {
      ...newNavigation[index],
      [field]: value
    };

    updateFooter('navigation', newNavigation);
  };

  const addNavigation = () => {
    if (!content) return;

    const newNavigation = [
      ...content.footer.navigation,
      { label: '', href: '' }
    ];

    updateFooter('navigation', newNavigation);
  };

  const removeNavigation = (index: number) => {
    if (!content) return;

    const newNavigation = content.footer.navigation.filter((_, i) => i !== index);
    updateFooter('navigation', newNavigation);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#921e27] mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg">Loading footer content...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-[#921e27] hover:text-[#7a1a21] mr-6 font-semibold">
                ← Back to Dashboard
              </Link>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Footer Management
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                target="_blank"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Preview Website
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-[#921e27] to-[#7a1a21] text-white rounded-xl hover:from-[#7a1a21] hover:to-[#5e0e15] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Footer Management', current: true }]} className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Brand & General Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Brand Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Brand Description
                </label>
                <textarea
                  value={content.footer.brandDescription}
                  onChange={(e) => updateFooter('brandDescription', e.target.value)}
                  rows={3}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Describe your brand..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Copyright Text
                </label>
                <input
                  type="text"
                  value={content.footer.copyright}
                  onChange={(e) => updateFooter('copyright', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Bottom Text
                </label>
                <input
                  type="text"
                  value={content.footer.bottomText}
                  onChange={(e) => updateFooter('bottomText', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Social Media Links</h2>
              </div>
              <button
                onClick={addSocialLink}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-medium"
              >
                + Add Link
              </button>
            </div>

            <div className="space-y-4">
              {content.footer.socialLinks.map((link, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                      placeholder="Platform"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <input
                      type="text"
                      value={link.icon}
                      onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                      placeholder="Icon name"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Footer Navigation</h2>
              </div>
              <button
                onClick={addNavigation}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-medium"
              >
                + Add Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.footer.navigation.map((nav, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={nav.label}
                      onChange={(e) => updateNavigation(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <input
                      type="text"
                      value={nav.href}
                      onChange={(e) => updateNavigation(index, 'href', e.target.value)}
                      placeholder="URL"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <button
                      onClick={() => removeNavigation(index)}
                      className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
