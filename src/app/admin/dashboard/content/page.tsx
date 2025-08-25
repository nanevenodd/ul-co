"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  philosophy: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    designer: {
      name: string;
      title: string;
      bio: string;
      image: string;
      philosophy: string;
      description: string;
    };
    achievements: Array<{
      title: string;
      year: string;
      type: string;
    }>;
  };
  contact: {
    whatsapp: string;
    instagram: string;
    email: string;
    address: string;
  };
}

export default function ContentManagement() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

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
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (section: string, field: string, value: string) => {
    if (!content) return;

    setContent(prev => ({
      ...prev!,
      [section]: {
        ...prev![section as keyof ContentData],
        [field]: value
      }
    }));
  };

  const updateNestedContent = (section: string, subsection: string, field: string, value: string) => {
    if (!content) return;

    const newContent = { ...content };
    const sectionData = newContent[section as keyof ContentData] as Record<string, unknown>;
    const subsectionData = sectionData[subsection] as Record<string, unknown>;
    subsectionData[field] = value;
    
    setContent(newContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return <div>Error loading content</div>;
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: '🏠' },
    { id: 'philosophy', label: 'Philosophy', icon: '💭' },
    { id: 'about', label: 'About Designer', icon: '👤' },
    { id: 'contact', label: 'Contact Info', icon: '📞' },
  ];

  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label || 'Hero Section';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-[#921e27] hover:text-[#7a1a21] mr-4">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#921e27]">Content Management</h1>
            </div>
            
            <div className="flex items-center">
              <Link 
                href="/" 
                target="_blank"
                className="mr-4 text-gray-600 hover:text-[#921e27]"
              >
                Preview Website
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <Breadcrumb 
          items={[
            { label: 'Content Management', href: '/admin/dashboard/content' },
            { label: activeTabLabel, current: true }
          ]} 
          className="mb-8" 
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#921e27] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Hero Section */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => updateContent('hero', 'title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent('hero', 'description', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image URL
                    </label>
                    <input
                      type="text"
                      value={content.hero.backgroundImage}
                      onChange={(e) => updateContent('hero', 'backgroundImage', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>
                </div>
              )}

              {/* Philosophy Section */}
              {activeTab === 'philosophy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Philosophy Section</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={content.philosophy.title}
                      onChange={(e) => updateContent('philosophy', 'title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.philosophy.subtitle}
                      onChange={(e) => updateContent('philosophy', 'subtitle', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={content.philosophy.description}
                      onChange={(e) => updateContent('philosophy', 'description', e.target.value)}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About Designer</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designer Name
                      </label>
                      <input
                        type="text"
                        value={content.about.designer.name}
                        onChange={(e) => updateNestedContent('about', 'designer', 'name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={content.about.designer.title}
                        onChange={(e) => updateNestedContent('about', 'designer', 'title', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biography
                    </label>
                    <textarea
                      value={content.about.designer.bio}
                      onChange={(e) => updateNestedContent('about', 'designer', 'bio', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Philosophy Quote
                    </label>
                    <textarea
                      value={content.about.designer.philosophy}
                      onChange={(e) => updateNestedContent('about', 'designer', 'philosophy', e.target.value)}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={content.about.designer.description}
                      onChange={(e) => updateNestedContent('about', 'designer', 'description', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={content.about.designer.image}
                      onChange={(e) => updateNestedContent('about', 'designer', 'image', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={content.contact.whatsapp}
                        onChange={(e) => updateContent('contact', 'whatsapp', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                        placeholder="6281234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={content.contact.instagram}
                        onChange={(e) => updateContent('contact', 'instagram', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                        placeholder="@ul.co_tarulipasaribu"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={content.contact.email}
                        onChange={(e) => updateContent('contact', 'email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={content.contact.address}
                        onChange={(e) => updateContent('contact', 'address', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
