"use client";

import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function HeroManagement() {
  const [heroData, setHeroData] = useState({
    title: "UL.CO",
    subtitle: "Fashion Berbasis Kain Ulos",
    description: "Menghadirkan fashion berbasis kain ulos dengan desain modern dan berkelanjutan",
    ctaText: "Explore Collections",
    ctaLink: "/portfolio",
    ctaSecondaryText: "Learn More",
    ctaSecondaryLink: "/about",
    backgroundImage: "/hero-bg.jpg",
  });

  const [philosophyData, setPhilosophyData] = useState({
    title: "Design Philosophy",
    subtitle: "Tradisi Bertemu Modernitas",
    description: "UL.CO menggabungkan warisan budaya kain ulos dengan desain kontemporer, menciptakan fashion yang berkelanjutan dan bermakna.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      // Update the hero data with the new image path
      setHeroData({
        ...heroData,
        backgroundImage: result.filePath,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Load current content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const content = await response.json();
          setHeroData(content.hero);
          setPhilosophyData(content.philosophy);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get current content first
      const currentResponse = await fetch("/api/content");
      const currentContent = currentResponse.ok ? await currentResponse.json() : {};

      // Update with new hero and philosophy data
      const updatedContent = {
        ...currentContent,
        hero: heroData,
        philosophy: philosophyData,
      };

      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      if (response.ok) {
        alert("Hero content saved successfully! The changes are now live on the website.");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Error saving content. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hero Section Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage the main banner section of your homepage</p>
      </div>

      {/* Hero editor form */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Hero Section Content</h3>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Main Title
              </label>
              <input
                type="text"
                id="title"
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                value={heroData.subtitle}
                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={heroData.description}
                onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  id="ctaText"
                  value={heroData.ctaText}
                  onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="ctaLink" className="block text-sm font-medium text-gray-700">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  id="ctaLink"
                  value={heroData.ctaLink}
                  onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })}
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ctaSecondaryText" className="block text-sm font-medium text-gray-700">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  id="ctaSecondaryText"
                  value={heroData.ctaSecondaryText}
                  onChange={(e) => setHeroData({ ...heroData, ctaSecondaryText: e.target.value })}
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="ctaSecondaryLink" className="block text-sm font-medium text-gray-700">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  id="ctaSecondaryLink"
                  value={heroData.ctaSecondaryLink}
                  onChange={(e) => setHeroData({ ...heroData, ctaSecondaryLink: e.target.value })}
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Background Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Image</label>
              {heroData.backgroundImage && heroData.backgroundImage !== "/hero-bg.jpg" && (
                <div className="mt-2 mb-4">
                  <img src={heroData.backgroundImage} alt="Current hero background" className="w-full h-32 object-cover rounded-md border" />
                  <p className="text-sm text-gray-500 mt-1">Current background image</p>
                </div>
              )}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#921e27] hover:text-red-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section Editor */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Design Philosophy Section</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="philosophyTitle" className="block text-sm font-medium text-gray-700">
                Philosophy Title
              </label>
              <input
                type="text"
                id="philosophyTitle"
                value={philosophyData.title}
                onChange={(e) => setPhilosophyData({ ...philosophyData, title: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="philosophySubtitle" className="block text-sm font-medium text-gray-700">
                Philosophy Subtitle
              </label>
              <input
                type="text"
                id="philosophySubtitle"
                value={philosophyData.subtitle}
                onChange={(e) => setPhilosophyData({ ...philosophyData, subtitle: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="philosophyDescription" className="block text-sm font-medium text-gray-700">
                Philosophy Description
              </label>
              <textarea
                id="philosophyDescription"
                rows={3}
                value={philosophyData.description}
                onChange={(e) => setPhilosophyData({ ...philosophyData, description: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="bg-[#921e27] text-white px-6 py-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27] disabled:bg-gray-400">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Live Preview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Live Preview</h3>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span style={{ color: "#921e27" }}>{heroData.title}</span>
              </h1>
              <h2 className="mt-3 text-xl text-gray-600 sm:text-2xl">{heroData.subtitle}</h2>
              <p className="mt-5 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">{heroData.description}</p>
              <div className="mt-8 flex justify-center space-x-4">
                <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#921e27]">{heroData.ctaText}</span>
                <span className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white">{heroData.ctaSecondaryText}</span>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold text-gray-900">{philosophyData.title}</h3>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{philosophyData.subtitle}</p>
              <p className="mt-4 max-w-4xl mx-auto text-base text-gray-500">{philosophyData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
