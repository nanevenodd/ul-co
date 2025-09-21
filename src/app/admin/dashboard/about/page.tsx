"use client";

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";

interface Achievement {
  id: number;
  title: string;
  description: string;
  year: string;
  organization: string;
  image?: string;
}

export default function AboutManagement() {
  const [aboutData, setAboutData] = useState({
    introduction: "",
    designerName: "",
    designerPhoto: "",
    experience: "",
    philosophyText: "",
    biography: "",
    specialization: "",
    philosophyQuote: "",
    heritageDescription: "",
    innovationDescription: "",
    sustainabilityDescription: "",
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [simpleAchievements, setSimpleAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Load current content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const content = await response.json();
          if (content.about) {
            setAboutData(content.about);
            setAchievements(content.about.achievements || []);
            setSimpleAchievements(content.about.simpleAchievements || []);
          }
        }
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  // Save content
  const saveContent = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/content");
      if (response.ok) {
        const currentContent = await response.json();

        const updatedContent = {
          ...currentContent,
          about: {
            ...aboutData,
            achievements: achievements,
            simpleAchievements: simpleAchievements,
          },
        };

        const saveResponse = await fetch("/api/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        });

        if (saveResponse.ok) {
          setSaveMessage("✅ Content saved successfully!");
          setTimeout(() => setSaveMessage(""), 3000); // Clear message after 3 seconds
        } else {
          throw new Error("Failed to save content");
        }
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setSaveMessage("❌ Failed to save content. Please try again.");
      setTimeout(() => setSaveMessage(""), 5000); // Clear error message after 5 seconds
    } finally {
      setSaving(false);
    }
  };

  // Handle image upload
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

      // Update the about data with the new image path
      setAboutData({
        ...aboutData,
        designerPhoto: result.filePath,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<number | null>(null);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    year: "",
    organization: "",
    description: "",
  });
  const [editAchievement, setEditAchievement] = useState({
    title: "",
    year: "",
    organization: "",
    description: "",
  });

  const handleAddAchievement = () => {
    const achievement = {
      ...newAchievement,
      id: Date.now(),
    };
    setAchievements([...achievements, achievement]);
    setNewAchievement({ title: "", year: "", organization: "", description: "" });
    setShowAddAchievement(false);
    alert("Achievement added!");
  };

  const handleDeleteAchievement = (id: number) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      setAchievements(achievements.filter((a) => a.id !== id));
    }
  };

  const handleEditAchievement = (achievement: any) => {
    setEditingAchievement(achievement.id);
    setEditAchievement({
      title: achievement.title,
      year: achievement.year,
      organization: achievement.organization,
      description: achievement.description,
    });
  };

  const handleSaveEditAchievement = () => {
    setAchievements(achievements.map((a) => (a.id === editingAchievement ? { ...a, ...editAchievement } : a)));
    setEditingAchievement(null);
    setEditAchievement({ title: "", year: "", organization: "", description: "" });
  };

  const handleCancelEdit = () => {
    setEditingAchievement(null);
    setEditAchievement({ title: "", year: "", organization: "", description: "" });
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About Content Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage designer information, biography, achievements, and awards</p>

        {/* Save Message */}
        {saveMessage && <div className={`mt-4 p-3 rounded-md ${saveMessage.includes("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{saveMessage}</div>}
      </div>

      {/* Designer Basic Info */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Designer Information</h3>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="designerName" className="block text-sm font-medium text-gray-700">
                Designer Name
              </label>
              <input
                type="text"
                id="designerName"
                value={aboutData.designerName}
                onChange={(e) => setAboutData({ ...aboutData, designerName: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                value={aboutData.experience}
                onChange={(e) => setAboutData({ ...aboutData, experience: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                value={aboutData.specialization}
                onChange={(e) => setAboutData({ ...aboutData, specialization: e.target.value })}
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g., Traditional meets Modern"
              />
            </div>
          </div>

          <div>
            <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
              Introduction
            </label>
            <textarea
              id="introduction"
              rows={3}
              value={aboutData.introduction}
              onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
              Biography
            </label>
            <textarea
              id="biography"
              rows={4}
              value={aboutData.biography}
              onChange={(e) => setAboutData({ ...aboutData, biography: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="philosophyText" className="block text-sm font-medium text-gray-700">
              Design Philosophy
            </label>
            <textarea
              id="philosophyText"
              rows={3}
              value={aboutData.philosophyText}
              onChange={(e) => setAboutData({ ...aboutData, philosophyText: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="philosophyQuote" className="block text-sm font-medium text-gray-700">
              Philosophy Quote
            </label>
            <textarea
              id="philosophyQuote"
              rows={3}
              value={aboutData.philosophyQuote}
              onChange={(e) => setAboutData({ ...aboutData, philosophyQuote: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Inspirational quote for philosophy section"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designer Photo</label>
            {aboutData.designerPhoto && (
              <div className="mt-2 mb-4">
                <img src={aboutData.designerPhoto} alt="Designer photo preview" className="w-32 h-32 object-cover rounded-lg border" />
              </div>
            )}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#921e27] hover:text-red-500">
                    <span>{uploading ? "Uploading..." : "Upload a photo"}</span>
                    <input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Philosophy Pillars</h3>
          <p className="mt-1 text-sm text-gray-500">Manage the three core pillars of your design philosophy</p>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div>
            <label htmlFor="heritageDescription" className="block text-sm font-medium text-gray-700">
              Heritage Description
            </label>
            <textarea
              id="heritageDescription"
              rows={2}
              value={aboutData.heritageDescription}
              onChange={(e) => setAboutData({ ...aboutData, heritageDescription: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Describe how you preserve cultural heritage"
            />
          </div>
          <div>
            <label htmlFor="innovationDescription" className="block text-sm font-medium text-gray-700">
              Innovation Description
            </label>
            <textarea
              id="innovationDescription"
              rows={2}
              value={aboutData.innovationDescription}
              onChange={(e) => setAboutData({ ...aboutData, innovationDescription: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Describe your innovative approach"
            />
          </div>
          <div>
            <label htmlFor="sustainabilityDescription" className="block text-sm font-medium text-gray-700">
              Sustainability Description
            </label>
            <textarea
              id="sustainabilityDescription"
              rows={2}
              value={aboutData.sustainabilityDescription}
              onChange={(e) => setAboutData({ ...aboutData, sustainabilityDescription: e.target.value })}
              className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Describe your sustainability practices"
            />
          </div>
        </div>
      </div>

      {/* Simple Achievements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Simple Achievements</h3>
            <p className="mt-1 text-sm text-gray-500">Quick achievement highlights for the achievements grid</p>
          </div>
          <button onClick={() => setSimpleAchievements([...simpleAchievements, ""])} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Achievement
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {simpleAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={achievement}
                onChange={(e) => {
                  const updated = [...simpleAchievements];
                  updated[index] = e.target.value;
                  setSimpleAchievements(updated);
                }}
                className="flex-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Achievement text"
              />
              <button
                onClick={() => {
                  const updated = simpleAchievements.filter((_, i) => i !== index);
                  setSimpleAchievements(updated);
                }}
                className="p-2 text-red-600 hover:text-red-800">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          {simpleAchievements.length === 0 && <p className="text-gray-500 text-sm">No simple achievements added yet.</p>}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Achievements</h3>
          <button onClick={() => setShowAddAchievement(true)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Achievement
          </button>
        </div>
        <div className="px-6 py-5">
          {showAddAchievement && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="text-md font-medium text-gray-900 mb-4">Add New Achievement</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Achievement title"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newAchievement.year}
                  onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                  className="focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <input
                type="text"
                placeholder="Organization"
                value={newAchievement.organization}
                onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                className="mt-4 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Description"
                rows={2}
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                className="mt-4 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddAchievement(false);
                    setNewAchievement({ title: "", year: "", organization: "", description: "" });
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                  Cancel
                </button>
                <button onClick={handleAddAchievement} className="px-3 py-2 text-sm font-medium text-white bg-[#921e27] border border-transparent rounded-md hover:bg-red-800">
                  Add Achievement
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                {editingAchievement === achievement.id ? (
                  // Edit mode
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Edit Achievement</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Achievement title"
                        value={editAchievement.title}
                        onChange={(e) => setEditAchievement({ ...editAchievement, title: e.target.value })}
                        className="focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={editAchievement.year}
                        onChange={(e) => setEditAchievement({ ...editAchievement, year: e.target.value })}
                        className="focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Organization"
                      value={editAchievement.organization}
                      onChange={(e) => setEditAchievement({ ...editAchievement, organization: e.target.value })}
                      className="focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Description"
                      rows={2}
                      value={editAchievement.description}
                      onChange={(e) => setEditAchievement({ ...editAchievement, description: e.target.value })}
                      className="focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="flex justify-end space-x-3">
                      <button onClick={handleCancelEdit} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        Cancel
                      </button>
                      <button onClick={handleSaveEditAchievement} className="px-3 py-2 text-sm font-medium text-white bg-[#921e27] border border-transparent rounded-md hover:bg-red-800">
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">
                        {achievement.organization} • {achievement.year}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">{achievement.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button onClick={() => handleEditAchievement(achievement)} className="p-2 text-blue-600 hover:text-blue-800">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteAchievement(achievement.id)} className="p-2 text-red-600 hover:text-red-800">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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
