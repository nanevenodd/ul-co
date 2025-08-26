"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/AdminHeader";
import ImageUpload from "@/components/ImageUpload";

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
  const [activeTab, setActiveTab] = useState("hero");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentSaveSection, setCurrentSaveSection] = useState("");

  useEffect(() => {
    document.title = "Content - ULCO Admin";
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section?: string) => {
    if (!content) return;

    const sectionName = section || "semua konten";
    setCurrentSaveSection(sectionName);
    setSaving(true);
    setShowSaveModal(true);

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSaveSuccess(true);
      } else {
        setSaveSuccess(false);
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setSaveSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveClick = () => handleSave();
  const handleSaveSection = (section: string) => () => handleSave(section);

  const closeSaveModal = () => {
    setShowSaveModal(false);
    setSaveSuccess(false);
    setCurrentSaveSection("");
  };
  const updateContent = (section: string, field: string, value: string) => {
    if (!content) return;

    setContent((prev) => ({
      ...prev!,
      [section]: {
        ...prev![section as keyof ContentData],
        [field]: value,
      },
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
    { id: "hero", label: "Hero Section", icon: "🏠" },
    { id: "philosophy", label: "Philosophy", icon: "💭" },
    { id: "about", label: "About Designer", icon: "👤" },
    { id: "contact", label: "Contact Info", icon: "📞" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <AdminHeader
        title="Content Management"
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        gradientColors="from-indigo-600 to-indigo-800"
        breadcrumbItems={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Content Management", current: true },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Save Button */}
        <div className="flex justify-end mb-8">
          <button onClick={handleSaveClick} disabled={saving} className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors disabled:opacity-50 flex items-center gap-2">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <span>💾</span>
                Simpan Perubahan
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow p-4">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === tab.id ? "bg-[#921e27] text-white" : "text-gray-700 hover:bg-gray-100"}`}>
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
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
                    <input type="text" value={content.hero.title} onChange={(e) => updateContent("hero", "title", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input type="text" value={content.hero.subtitle} onChange={(e) => updateContent("hero", "subtitle", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea value={content.hero.description} onChange={(e) => updateContent("hero", "description", e.target.value)} rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]" />
                  </div>

                  <div>
                    <ImageUpload currentImage={content.hero.backgroundImage} onImageChange={(url) => updateContent("hero", "backgroundImage", url)} folder="hero" label="Background Image" />
                    <input
                      type="text"
                      value={content.hero.backgroundImage}
                      onChange={(e) => updateContent("hero", "backgroundImage", e.target.value)}
                      placeholder="Or enter image URL manually"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] mt-2"
                    />
                  </div>

                  {/* Save Button for Hero Section */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button onClick={handleSaveSection("Hero Section")} disabled={saving} className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors disabled:opacity-50 flex items-center gap-2">
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          Simpan Hero Section
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Philosophy Section */}
              {activeTab === "philosophy" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Philosophy Section</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" value={content.philosophy.title} onChange={(e) => updateContent("philosophy", "title", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.philosophy.subtitle}
                      onChange={(e) => updateContent("philosophy", "subtitle", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={content.philosophy.description}
                      onChange={(e) => updateContent("philosophy", "description", e.target.value)}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  {/* Save Button for Philosophy Section */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button onClick={handleSaveSection("Philosophy")} disabled={saving} className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors disabled:opacity-50 flex items-center gap-2">
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          Simpan Philosophy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About Designer</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Designer Name</label>
                      <input
                        type="text"
                        value={content.about.designer.name}
                        onChange={(e) => updateNestedContent("about", "designer", "name", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={content.about.designer.title}
                        onChange={(e) => updateNestedContent("about", "designer", "title", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>
                  </div>

                  <div>
                    <ImageUpload currentImage={content.about.designer.image} onImageChange={(url) => updateNestedContent("about", "designer", "image", url)} folder="designer" label="Designer Photo" />
                    <input
                      type="text"
                      value={content.about.designer.image}
                      onChange={(e) => updateNestedContent("about", "designer", "image", e.target.value)}
                      placeholder="Or enter image URL manually"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27] mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                    <textarea
                      value={content.about.designer.bio}
                      onChange={(e) => updateNestedContent("about", "designer", "bio", e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy</label>
                    <textarea
                      value={content.about.designer.philosophy}
                      onChange={(e) => updateNestedContent("about", "designer", "philosophy", e.target.value)}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={content.about.designer.description}
                      onChange={(e) => updateNestedContent("about", "designer", "description", e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                    />
                  </div>

                  {/* Achievements Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                    {content.about.achievements.map((achievement, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={achievement.title}
                            onChange={(e) => {
                              const newAchievements = [...content.about.achievements];
                              newAchievements[index] = { ...achievement, title: e.target.value };
                              setContent((prev) => ({
                                ...prev!,
                                about: {
                                  ...prev!.about,
                                  achievements: newAchievements,
                                },
                              }));
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                          <input
                            type="text"
                            value={achievement.year}
                            onChange={(e) => {
                              const newAchievements = [...content.about.achievements];
                              newAchievements[index] = { ...achievement, year: e.target.value };
                              setContent((prev) => ({
                                ...prev!,
                                about: {
                                  ...prev!.about,
                                  achievements: newAchievements,
                                },
                              }));
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                          <input
                            type="text"
                            value={achievement.type}
                            onChange={(e) => {
                              const newAchievements = [...content.about.achievements];
                              newAchievements[index] = { ...achievement, type: e.target.value };
                              setContent((prev) => ({
                                ...prev!,
                                about: {
                                  ...prev!.about,
                                  achievements: newAchievements,
                                },
                              }));
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Save Button for About Section */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button onClick={handleSaveSection("About Designer")} disabled={saving} className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors disabled:opacity-50 flex items-center gap-2">
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          Simpan About Designer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <input
                        type="text"
                        value={content.contact.whatsapp}
                        onChange={(e) => updateContent("contact", "whatsapp", e.target.value)}
                        placeholder="e.g., +62812345678"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                      <input
                        type="text"
                        value={content.contact.instagram}
                        onChange={(e) => updateContent("contact", "instagram", e.target.value)}
                        placeholder="e.g., @ulco_official"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={content.contact.email}
                        onChange={(e) => updateContent("contact", "email", e.target.value)}
                        placeholder="e.g., info@ulco.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={content.contact.address}
                        onChange={(e) => updateContent("contact", "address", e.target.value)}
                        placeholder="Complete address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921e27]"
                      />
                    </div>
                  </div>

                  {/* Save Button for Contact Section */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button onClick={handleSaveSection("Contact Info")} disabled={saving} className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors disabled:opacity-50 flex items-center gap-2">
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          Simpan Contact Info
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27] mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Menyimpan {currentSaveSection || "Konten"}...</h3>
                  <p className="text-gray-600">Mohon tunggu sebentar</p>
                </>
              ) : saveSuccess ? (
                <>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil Disimpan!</h3>
                  <p className="text-gray-600 mb-4">{currentSaveSection || "Konten"} telah berhasil disimpan ke database</p>
                  <button onClick={closeSaveModal} className="bg-[#921e27] text-white px-6 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors">
                    Tutup
                  </button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagal Menyimpan</h3>
                  <p className="text-gray-600 mb-4">Terjadi kesalahan saat menyimpan {currentSaveSection || "konten"}</p>
                  <div className="flex gap-2 justify-center">
                    <button onClick={closeSaveModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                      Tutup
                    </button>
                    <button onClick={handleSaveClick} className="bg-[#921e27] text-white px-4 py-2 rounded-lg hover:bg-[#7a1a21] transition-colors">
                      Coba Lagi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
