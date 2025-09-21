"use client";

import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface FooterData {
  brandInfo: {
    title: string;
    description: string;
    designer: string;
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  socialLinks: SocialLink[];
  copyrightText: string;
}

export default function FooterManagement() {
  const [footerData, setFooterData] = useState<FooterData>({
    brandInfo: {
      title: "UL.CO",
      description: "Fashion berbasis kain ulos dengan desain modern dan berkelanjutan. Setiap karya adalah cerita, setiap desain adalah warisan.",
      designer: "Taruli Pasaribu",
    },
    contactInfo: {
      address: "Jakarta, Indonesia",
      phone: "+62 123 4567 890",
      email: "hello@ulco.com",
    },
    socialLinks: [],
    copyrightText: "© 2024 UL.CO. All rights reserved. | Designed by Taruli Pasaribu",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddSocialLink, setShowAddSocialLink] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ name: "", url: "", icon: "instagram" });
  const [activeTab, setActiveTab] = useState("brand");

  // Load footer data from content.json
  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        
        // Map data from content.json to footer structure
        if (data) {
          setFooterData({
            brandInfo: {
              title: "UL.CO",
              description: "Fashion berbasis kain ulos dengan desain modern dan berkelanjutan. Setiap karya adalah cerita, setiap desain adalah warisan.",
              designer: data.about?.designerName || "Taruli Pasaribu",
            },
            contactInfo: {
              address: data.contact?.address || "Jakarta, Indonesia",
              phone: data.contact?.whatsapp || "+62 123 4567 890",
              email: data.contact?.email || "hello@ulco.com",
            },
            socialLinks: data.footer?.socialLinks || [],
            copyrightText: "© 2024 UL.CO. All rights reserved. | Designed by Taruli Pasaribu",
          });
        }
      } catch (error) {
        console.error("Error loading footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFooterData();
  }, []);

  const handleSaveFooter = async () => {
    setSaving(true);
    try {
      // Update contact info
      const contactResponse = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            address: footerData.contactInfo.address,
            whatsapp: footerData.contactInfo.phone,
            email: footerData.contactInfo.email,
          },
        }),
      });

      // Update footer social links
      const footerResponse = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          footer: {
            socialLinks: footerData.socialLinks,
          },
        }),
      });

      if (contactResponse.ok && footerResponse.ok) {
        alert("Footer settings saved successfully!");
      } else {
        throw new Error("Failed to save footer settings");
      }
    } catch (error) {
      console.error("Error saving footer:", error);
      alert("Error saving footer settings");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSocialLink = () => {
    const socialLink = {
      ...newSocialLink,
      id: Date.now().toString(),
    };
    setFooterData({
      ...footerData,
      socialLinks: [...footerData.socialLinks, socialLink],
    });
    setNewSocialLink({ name: "", url: "", icon: "instagram" });
    setShowAddSocialLink(false);
  };

  const handleDeleteSocialLink = (id: string) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      setFooterData({
        ...footerData,
        socialLinks: footerData.socialLinks.filter((link) => link.id !== id),
      });
    }
  };

  const socialPlatforms = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "tiktok", label: "TikTok" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "youtube", label: "YouTube" },
    { value: "globe", label: "Website" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Footer Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage footer content sesuai dengan struktur public website</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("brand")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "brand" ? "border-[#921e27] text-[#921e27]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Brand Info
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "contact" ? "border-[#921e27] text-[#921e27]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Contact Info
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "social" ? "border-[#921e27] text-[#921e27]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Social Links
          </button>
        </nav>
      </div>

      {/* Brand Info Tab */}
      {activeTab === "brand" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Brand Information</h3>
            <p className="text-sm text-gray-500">Informasi brand yang tampil di footer public website</p>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Brand Title
              </label>
              <input
                type="text"
                id="title"
                value={footerData.brandInfo.title}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    brandInfo: { ...footerData.brandInfo, title: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="UL.CO"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Brand Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={footerData.brandInfo.description}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    brandInfo: { ...footerData.brandInfo, description: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Fashion berbasis kain ulos dengan desain modern dan berkelanjutan..."
              />
            </div>
            <div>
              <label htmlFor="designer" className="block text-sm font-medium text-gray-700">
                Designer Name
              </label>
              <input
                type="text"
                id="designer"
                value={footerData.brandInfo.designer}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    brandInfo: { ...footerData.brandInfo, designer: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Taruli Pasaribu"
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Tab */}
      {activeTab === "contact" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
            <p className="text-sm text-gray-500">Informasi kontak yang tampil di section &quot;Get In Touch&quot;</p>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={footerData.contactInfo.email}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    contactInfo: { ...footerData.contactInfo, email: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="hello@ulco.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                <PhoneIcon className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={footerData.contactInfo.phone}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    contactInfo: { ...footerData.contactInfo, phone: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="+62 123 4567 890"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                <MapPinIcon className="w-4 h-4 inline mr-1" />
                Address
              </label>
              <input
                type="text"
                id="address"
                value={footerData.contactInfo.address}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    contactInfo: { ...footerData.contactInfo, address: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Jakarta, Indonesia"
              />
            </div>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === "social" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Social Media Links</h3>
                <p className="text-sm text-gray-500">Social media links yang tampil di footer</p>
              </div>
              <button
                onClick={() => setShowAddSocialLink(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800">
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Link
              </button>
            </div>
          </div>
          <div className="px-6 py-5">
            {/* Add Social Link Form */}
            {showAddSocialLink && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Social Link</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Platform</label>
                    <select
                      value={newSocialLink.icon}
                      onChange={(e) => setNewSocialLink({ 
                        ...newSocialLink, 
                        icon: e.target.value,
                        name: socialPlatforms.find(p => p.value === e.target.value)?.label || ""
                      })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#921e27] focus:border-[#921e27] sm:text-sm">
                      {socialPlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="url"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#921e27] focus:border-[#921e27] sm:text-sm"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <button
                      onClick={() => {
                        setNewSocialLink({ name: "", url: "", icon: "instagram" });
                        setShowAddSocialLink(false);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSocialLink}
                      disabled={!newSocialLink.url}
                      className="px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[#921e27] hover:bg-red-800 disabled:bg-gray-300">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Social Links List */}
            <div className="space-y-3">
              {footerData.socialLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{link.icon}</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">{link.name}</h4>
                      <p className="text-sm text-gray-500">{link.url}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSocialLink(link.id)}
                    className="p-1 text-red-600 hover:text-red-800">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {footerData.socialLinks.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>No social links added yet.</p>
                  <p className="text-sm">Click &quot;Add Link&quot; to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveFooter}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#921e27] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27] disabled:opacity-50">
          {saving ? "Saving..." : "Save Footer Settings"}
        </button>
      </div>

      {/* Footer Preview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Footer Preview</h3>
          <p className="text-sm text-gray-500">Preview bagaimana footer akan tampil di public website</p>
        </div>
        <div className="px-6 py-5">
          <div className="bg-[#921e27] text-white p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Brand Section */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold mb-3">{footerData.brandInfo.title}</h3>
                <p className="text-red-100 mb-3 text-sm">{footerData.brandInfo.description}</p>
                <p className="text-xs text-red-200">Designer: {footerData.brandInfo.designer}</p>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="font-semibold mb-3">Navigation</h4>
                <ul className="space-y-1 text-sm text-red-100">
                  <li>Home</li>
                  <li>Portfolio</li>
                  <li>About</li>
                  <li>FAQ</li>
                  <li>Contact</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-3">Get In Touch</h4>
                <ul className="space-y-1 text-sm text-red-100">
                  <li>{footerData.contactInfo.email}</li>
                  <li>{footerData.contactInfo.phone}</li>
                  <li>{footerData.contactInfo.address}</li>
                </ul>
                <div className="mt-3 flex space-x-2">
                  {footerData.socialLinks.map((link) => (
                    <div key={link.id} className="w-5 h-5 bg-red-100 bg-opacity-20 rounded" title={link.name}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-red-800 mt-6 pt-4 text-center">
              <p className="text-xs text-red-200">{footerData.copyrightText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}