"use client";

import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, LinkIcon, GlobeAltIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function FooterManagement() {
  const [footerData, setFooterData] = useState({
    brandInfo: {
      description: "UL.CO is a premium fashion brand that celebrates the beauty of traditional Indonesian artistry through contemporary design.",
      tagline: "Where tradition meets modern elegance",
    },
    contactInfo: {
      address: "Jl. Sudirman No. 123, Jakarta Pusat, Indonesia 10220",
      phone: "+62 21 1234 5678",
      email: "info@ulco.com",
    },
    socialLinks: [
      { id: 1, platform: "Instagram", url: "https://instagram.com/ulco_fashion", icon: "instagram" },
      { id: 2, platform: "Facebook", url: "https://facebook.com/ulco.fashion", icon: "facebook" },
      { id: 3, platform: "Twitter", url: "https://twitter.com/ulco_fashion", icon: "twitter" },
      { id: 4, platform: "LinkedIn", url: "https://linkedin.com/company/ulco", icon: "linkedin" },
    ],
    quickLinks: [
      { id: 1, title: "About Us", url: "/about", category: "main" },
      { id: 2, title: "Collections", url: "/collections", category: "main" },
      { id: 3, title: "Contact", url: "/contact", category: "main" },
      { id: 4, title: "Privacy Policy", url: "/privacy", category: "legal" },
      { id: 5, title: "Terms of Service", url: "/terms", category: "legal" },
      { id: 6, title: "Return Policy", url: "/returns", category: "legal" },
    ],
    footerText: {
      copyright: "© 2024 UL.CO. All rights reserved.",
      additionalInfo: "Designed with love in Indonesia. Crafted for the world.",
    },
  });

  const [showAddSocialLink, setShowAddSocialLink] = useState(false);
  const [showAddQuickLink, setShowAddQuickLink] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "", icon: "" });
  const [newQuickLink, setNewQuickLink] = useState({ title: "", url: "", category: "main" });
  const [activeTab, setActiveTab] = useState("brand");

  const handleSaveFooter = () => {
    alert("Footer settings saved! (This is a placeholder - implement with database)");
  };

  const handleAddSocialLink = () => {
    const socialLink = {
      ...newSocialLink,
      id: Date.now(),
    };
    setFooterData({
      ...footerData,
      socialLinks: [...footerData.socialLinks, socialLink],
    });
    setNewSocialLink({ platform: "", url: "", icon: "" });
    setShowAddSocialLink(false);
    alert("Social link added!");
  };

  const handleAddQuickLink = () => {
    const quickLink = {
      ...newQuickLink,
      id: Date.now(),
    };
    setFooterData({
      ...footerData,
      quickLinks: [...footerData.quickLinks, quickLink],
    });
    setNewQuickLink({ title: "", url: "", category: "main" });
    setShowAddQuickLink(false);
    alert("Quick link added!");
  };

  const handleDeleteSocialLink = (id: number) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      setFooterData({
        ...footerData,
        socialLinks: footerData.socialLinks.filter((link) => link.id !== id),
      });
    }
  };

  const handleDeleteQuickLink = (id: number) => {
    if (confirm("Are you sure you want to delete this quick link?")) {
      setFooterData({
        ...footerData,
        quickLinks: footerData.quickLinks.filter((link) => link.id !== id),
      });
    }
  };

  const socialPlatforms = ["Instagram", "Facebook", "Twitter", "LinkedIn", "YouTube", "TikTok", "Pinterest", "WhatsApp"];

  const linkCategories = [
    { value: "main", label: "Main Navigation" },
    { value: "legal", label: "Legal Pages" },
    { value: "support", label: "Support" },
    { value: "company", label: "Company Info" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Footer Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage footer content, links, and contact information to make it more dynamic</p>
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
          <button
            onClick={() => setActiveTab("links")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "links" ? "border-[#921e27] text-[#921e27]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Quick Links
          </button>
          <button
            onClick={() => setActiveTab("copyright")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "copyright" ? "border-[#921e27] text-[#921e27]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Copyright
          </button>
        </nav>
      </div>

      {/* Brand Info Tab */}
      {activeTab === "brand" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Brand Information</h3>
          </div>
          <div className="px-6 py-5 space-y-6">
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
                placeholder="Brief description about your brand that appears in the footer"
              />
            </div>
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
                Brand Tagline
              </label>
              <input
                type="text"
                id="tagline"
                value={footerData.brandInfo.tagline}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    brandInfo: { ...footerData.brandInfo, tagline: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Your brand's memorable tagline"
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
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="footerAddress" className="block text-sm font-medium text-gray-700">
                <MapPinIcon className="inline h-4 w-4 mr-1" />
                Address
              </label>
              <textarea
                id="footerAddress"
                rows={3}
                value={footerData.contactInfo.address}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    contactInfo: { ...footerData.contactInfo, address: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="footerPhone" className="block text-sm font-medium text-gray-700">
                  <PhoneIcon className="inline h-4 w-4 mr-1" />
                  Phone
                </label>
                <input
                  type="text"
                  id="footerPhone"
                  value={footerData.contactInfo.phone}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      contactInfo: { ...footerData.contactInfo, phone: e.target.value },
                    })
                  }
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="footerEmail" className="block text-sm font-medium text-gray-700">
                  <EnvelopeIcon className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  id="footerEmail"
                  value={footerData.contactInfo.email}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      contactInfo: { ...footerData.contactInfo, email: e.target.value },
                    })
                  }
                  className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === "social" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Social Media Links</h3>
            <button onClick={() => setShowAddSocialLink(true)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Social Link
            </button>
          </div>
          <div className="px-6 py-5">
            {showAddSocialLink && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="text-md font-medium text-gray-900 mb-4">Add New Social Link</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Platform</label>
                    <select
                      value={newSocialLink.platform}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value, icon: e.target.value.toLowerCase() })}
                      className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option value="">Select platform</option>
                      {socialPlatforms.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                      className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddSocialLink(false);
                      setNewSocialLink({ platform: "", url: "", icon: "" });
                    }}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSocialLink}
                    disabled={!newSocialLink.platform || !newSocialLink.url}
                    className="px-3 py-2 text-sm font-medium text-white bg-[#921e27] border border-transparent rounded-md hover:bg-red-800 disabled:bg-gray-400">
                    Add Link
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {footerData.socialLinks.map((link) => (
                <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{link.platform}</h4>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteSocialLink(link.id)} className="p-1 text-red-600 hover:text-red-800">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Links Tab */}
      {activeTab === "links" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Links</h3>
            <button onClick={() => setShowAddQuickLink(true)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#921e27] hover:bg-red-800">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Quick Link
            </button>
          </div>
          <div className="px-6 py-5">
            {showAddQuickLink && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="text-md font-medium text-gray-900 mb-4">Add New Quick Link</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      placeholder="Link title"
                      value={newQuickLink.title}
                      onChange={(e) => setNewQuickLink({ ...newQuickLink, title: e.target.value })}
                      className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="text"
                      placeholder="/page or https://..."
                      value={newQuickLink.url}
                      onChange={(e) => setNewQuickLink({ ...newQuickLink, url: e.target.value })}
                      className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={newQuickLink.category}
                      onChange={(e) => setNewQuickLink({ ...newQuickLink, category: e.target.value })}
                      className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      {linkCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddQuickLink(false);
                      setNewQuickLink({ title: "", url: "", category: "main" });
                    }}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddQuickLink}
                    disabled={!newQuickLink.title || !newQuickLink.url}
                    className="px-3 py-2 text-sm font-medium text-white bg-[#921e27] border border-transparent rounded-md hover:bg-red-800 disabled:bg-gray-400">
                    Add Link
                  </button>
                </div>
              </div>
            )}

            {/* Links grouped by category */}
            {linkCategories.map((category) => {
              const categoryLinks = footerData.quickLinks.filter((link) => link.category === category.value);
              if (categoryLinks.length === 0) return null;

              return (
                <div key={category.value} className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">{category.label}</h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {categoryLinks.map((link) => (
                      <div key={link.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">{link.title}</h5>
                              <p className="text-xs text-gray-500">{link.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <PencilIcon className="h-3 w-3" />
                            </button>
                            <button onClick={() => handleDeleteQuickLink(link.id)} className="p-1 text-red-600 hover:text-red-800">
                              <TrashIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Copyright Tab */}
      {activeTab === "copyright" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Copyright & Footer Text</h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="copyright" className="block text-sm font-medium text-gray-700">
                Copyright Text
              </label>
              <input
                type="text"
                id="copyright"
                value={footerData.footerText.copyright}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    footerText: { ...footerData.footerText, copyright: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="© 2024 Your Brand. All rights reserved."
              />
            </div>
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Footer Text
              </label>
              <textarea
                id="additionalInfo"
                rows={2}
                value={footerData.footerText.additionalInfo}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    footerText: { ...footerData.footerText, additionalInfo: e.target.value },
                  })
                }
                className="mt-1 focus:ring-[#921e27] focus:border-[#921e27] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Additional text that appears at the bottom of the footer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSaveFooter} className="bg-[#921e27] text-white px-6 py-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#921e27]">
          Save Footer Settings
        </button>
      </div>

      {/* Footer Preview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Footer Preview</h3>
        </div>
        <div className="px-6 py-5">
          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-2">UL.CO</h3>
                <p className="text-gray-300 text-sm mb-4">{footerData.brandInfo.description}</p>
                <p className="text-gray-400 text-xs italic">{footerData.brandInfo.tagline}</p>
              </div>

              {/* Quick Links Column */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {footerData.quickLinks
                    .filter((link) => link.category === "main")
                    .slice(0, 4)
                    .map((link) => (
                      <li key={link.id}>
                        <span className="text-gray-300 hover:text-white text-sm cursor-pointer">{link.title}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>{footerData.contactInfo.phone}</p>
                  <p>{footerData.contactInfo.email}</p>
                  <p className="text-xs">{footerData.contactInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">{footerData.footerText.copyright}</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                {footerData.socialLinks.slice(0, 4).map((link) => (
                  <span key={link.id} className="text-gray-400 hover:text-white cursor-pointer text-sm">
                    {link.platform}
                  </span>
                ))}
              </div>
            </div>
            {footerData.footerText.additionalInfo && (
              <div className="text-center mt-4">
                <p className="text-gray-400 text-xs italic">{footerData.footerText.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
