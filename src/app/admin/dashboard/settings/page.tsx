"use client";

import { useState, useEffect } from "react";
import { ChatBubbleLeftRightIcon, LinkIcon, CogIcon } from "@heroicons/react/24/outline";

interface Settings {
  whatsapp: {
    number: string;
    messageTemplate: string;
  };
  socialLinks: Array<{
    id: string;
    name: string;
    url: string;
    icon: string;
  }>;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    whatsapp: {
      number: "",
      messageTemplate: "Hi, I'm interested in this product: {productName} - {productPrice}. Can you provide more details?"
    },
    socialLinks: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("whatsapp");

  // Load settings from content.json
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        
        if (data.settings) {
          setSettings(data.settings);
        }
        if (data.footer?.socialLinks) {
          setSettings(prev => ({
            ...prev,
            socialLinks: data.footer.socialLinks
          }));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleWhatsAppSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            whatsapp: settings.whatsapp,
            socialLinks: settings.socialLinks
          }
        })
      });

      if (response.ok) {
        alert("WhatsApp settings saved successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSocialLinkAdd = () => {
    const newLink = {
      id: Date.now().toString(),
      name: "",
      url: "",
      icon: "globe"
    };
    setSettings(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink]
    }));
  };

  const handleSocialLinkUpdate = (id: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleSocialLinkDelete = (id: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };

  const handleSocialLinksSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          footer: {
            socialLinks: settings.socialLinks
          }
        })
      });

      if (response.ok) {
        alert("Social links saved successfully!");
      } else {
        throw new Error("Failed to save social links");
      }
    } catch (error) {
      console.error("Error saving social links:", error);
      alert("Error saving social links");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your website settings and integrations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "whatsapp"
                ? "border-[#921e27] text-[#921e27]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5 inline mr-2" />
            WhatsApp Settings
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "social"
                ? "border-[#921e27] text-[#921e27]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <LinkIcon className="w-5 h-5 inline mr-2" />
            Social Links
          </button>
        </nav>
      </div>

      {/* WhatsApp Settings Tab */}
      {activeTab === "whatsapp" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#921e27] mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">WhatsApp Configuration</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="whatsapp-number" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                id="whatsapp-number"
                placeholder="e.g. 6281234567890 (with country code, no +)"
                value={settings.whatsapp.number}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, number: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter your WhatsApp business number with country code (without + sign)
              </p>
            </div>

            <div>
              <label htmlFor="message-template" className="block text-sm font-medium text-gray-700 mb-2">
                Message Template
              </label>
              <textarea
                id="message-template"
                rows={4}
                placeholder="Default message when customers click 'Order via WhatsApp'"
                value={settings.whatsapp.messageTemplate}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, messageTemplate: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use {`{productName}`} and {`{productPrice}`} as placeholders for dynamic content
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleWhatsAppSave}
                disabled={saving}
                className="bg-[#921e27] text-white px-6 py-2 rounded-md hover:bg-[#7a1a22] focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:ring-offset-2 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save WhatsApp Settings"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === "social" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <LinkIcon className="w-6 h-6 text-[#921e27] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Social Media Links</h2>
            </div>
            <button
              onClick={handleSocialLinkAdd}
              className="bg-[#921e27] text-white px-4 py-2 rounded-md hover:bg-[#7a1a22] focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:ring-offset-2"
            >
              Add Link
            </button>
          </div>

          <div className="space-y-4">
            {settings.socialLinks.map((link) => (
              <div key={link.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Platform name (e.g. Instagram)"
                    value={link.name}
                    onChange={(e) => handleSocialLinkUpdate(link.id, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:border-transparent mb-2"
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => handleSocialLinkUpdate(link.id, "url", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
                  />
                </div>
                <div className="flex-shrink-0">
                  <select
                    value={link.icon}
                    onChange={(e) => handleSocialLinkUpdate(link.id, "icon", e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:border-transparent"
                  >
                    <option value="globe">Website</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
                <button
                  onClick={() => handleSocialLinkDelete(link.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))}

            {settings.socialLinks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <LinkIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No social links configured yet.</p>
                <p className="text-sm">Click &quot;Add Link&quot; to get started.</p>
              </div>
            )}
          </div>

          {settings.socialLinks.length > 0 && (
            <div className="pt-6">
              <button
                onClick={handleSocialLinksSave}
                disabled={saving}
                className="bg-[#921e27] text-white px-6 py-2 rounded-md hover:bg-[#7a1a22] focus:outline-none focus:ring-2 focus:ring-[#921e27] focus:ring-offset-2 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Social Links"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}