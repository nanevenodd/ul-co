"use client";

import { useState, useEffect } from "react";

export default function ContactAdmin() {
  const [contactData, setContactData] = useState({
    title: "Get in Touch",
    subtitle: "Mari berdiskusi tentang proyek fashion impian Anda",
    whatsapp: "+6281234567890",
    whatsappMessage: "Halo, saya tertarik dengan produk UL.CO",
    email: "admin@ulco.com",
    address: "Jl. Fashion Street No. 123, Jakarta, Indonesia",
    workingHours: "Senin - Jumat: 09:00 - 18:00",
    socialMedia: {
      instagram: "@ulco_fashion",
      facebook: "UL.CO Fashion",
      tiktok: "@ulco_official",
    },
    quickFaqs: [
      {
        question: "Berapa lama proses pembuatan custom design?",
        answer: "Proses custom design biasanya memakan waktu 2-4 minggu tergantung kompleksitas desain.",
      },
      {
        question: "Apakah bisa konsultasi online?",
        answer: "Ya, kami menyediakan layanan konsultasi online via video call atau WhatsApp.",
      },
      {
        question: "Bagaimana cara pemesanan?",
        answer: "Anda bisa memesan melalui form di bawah ini, WhatsApp, atau kunjungi studio kami langsung.",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/content");
      if (response.ok) {
        const content = await response.json();
        if (content.contact) {
          setContactData(content.contact);
        }
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      // First get current content
      const currentResponse = await fetch("/api/content");
      const currentContent = await currentResponse.json();

      // Update only contact section
      const updatedContent = {
        ...currentContent,
        contact: contactData,
      };

      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      if (response.ok) {
        alert("Konten berhasil disimpan!");
      } else {
        throw new Error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Gagal menyimpan konten!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Kelola Halaman Kontak</h1>
        <p className="text-gray-600">Atur informasi kontak dan social media</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Kontak</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Halaman</label>
            <input
              type="text"
              value={contactData.title}
              onChange={(e) => setContactData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subjudul</label>
            <input
              type="text"
              value={contactData.subtitle}
              onChange={(e) => setContactData((prev) => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              type="text"
              value={contactData.whatsapp}
              onChange={(e) => setContactData((prev) => ({ ...prev, whatsapp: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea
              value={contactData.address}
              onChange={(e) => setContactData((prev) => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Message Template</label>
            <input
              type="text"
              value={contactData.whatsappMessage}
              onChange={(e) => setContactData((prev) => ({ ...prev, whatsappMessage: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Kerja</label>
            <input
              type="text"
              value={contactData.workingHours}
              onChange={(e) => setContactData((prev) => ({ ...prev, workingHours: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="text"
              value={contactData.socialMedia.instagram}
              onChange={(e) =>
                setContactData((prev) => ({
                  ...prev,
                  socialMedia: { ...prev.socialMedia, instagram: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
              placeholder="@username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              type="text"
              value={contactData.socialMedia.facebook}
              onChange={(e) =>
                setContactData((prev) => ({
                  ...prev,
                  socialMedia: { ...prev.socialMedia, facebook: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
            <input
              type="text"
              value={contactData.socialMedia.tiktok}
              onChange={(e) =>
                setContactData((prev) => ({
                  ...prev,
                  socialMedia: { ...prev.socialMedia, tiktok: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
              placeholder="@username"
            />
          </div>
        </div>
      </div>

      {/* Quick FAQs Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick FAQs</h2>

        <div className="space-y-4">
          {contactData.quickFaqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updatedFaqs = [...contactData.quickFaqs];
                      updatedFaqs[index].question = e.target.value;
                      setContactData((prev) => ({ ...prev, quickFaqs: updatedFaqs }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const updatedFaqs = [...contactData.quickFaqs];
                      updatedFaqs[index].answer = e.target.value;
                      setContactData((prev) => ({ ...prev, quickFaqs: updatedFaqs }));
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921e27]"
                  />
                </div>
                <button
                  onClick={() => {
                    const updatedFaqs = contactData.quickFaqs.filter((_, i) => i !== index);
                    setContactData((prev) => ({ ...prev, quickFaqs: updatedFaqs }));
                  }}
                  className="text-red-600 hover:text-red-800 text-sm">
                  Hapus FAQ
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              const newFaq = { question: "", answer: "" };
              setContactData((prev) => ({
                ...prev,
                quickFaqs: [...prev.quickFaqs, newFaq],
              }));
            }}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-[#921e27] hover:text-[#921e27] transition-colors">
            + Tambah FAQ
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button onClick={() => window.open("/contact", "_blank")} className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors">
          Preview Halaman Contact
        </button>
        <button onClick={saveContent} disabled={saving} className="w-full sm:w-auto bg-[#921e27] text-white px-6 py-3 rounded-md hover:bg-[#7a1921] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
        </button>
      </div>
    </div>
  );
}
