"use client";

import { useState } from "react";
import "../globals.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-rose-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-float delay-1000"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-indigo-300/30 rounded-full blur-3xl animate-float delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-extralight leading-tight mb-8 tracking-wide text-[#921e27]">
              Get In
              <span className="block text-8xl md:text-8xl font-light bg-[#931f28] bg-clip-text text-transparent mt-2" style={{ fontFamily: "'Alex Brush', cursive" }}>
                Touch
              </span>
            </h1>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <p className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">Let&apos;s collaborate on your next fashion project. I&apos;d love to hear your vision and bring it to life.</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-fade-in-scroll">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-800">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-3">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-3">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300 resize-none"
                      placeholder="Tell me about your vision, timeline, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#921e27] to-pink-600 text-white font-medium py-4 px-8 rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <span className="flex items-center justify-center">
                      <span className="mr-2">Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in-scroll delay-200">
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="bg-[#921e27] rounded-3xl p-8">
                  <h3 className="text-2xl font-light mb-6 text-white">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Email</h4>
                        <p className="text-white">ta8clothing@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Phone</h4>
                        <p className="text-white">083126066671</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Workshop</h4>
                        <p className="text-white">
                          Siantar, Sumatera Utara
                          <br />
                          Lewat Booking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-[#7b2c39] rounded-3xl p-8">
                  <h3 className="text-2xl font-light mb-6 text-white">Follow My Work</h3>

                  <div className="flex space-x-4">
                    <a href="http://instagram.com/ul.co_tarulipasaribu/" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378 0 0-.599 2.282-.744 2.840-.282 1.114-1.045 2.517-1.56 3.37 1.175.364 2.417.558 3.716.558 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z" />
                      </svg>
                    </a>

                    <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>

                    <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-[#f8e4e7] rounded-3xl p-8">
                  <h3 className="text-2xl font-light mb-6 text-gray-800">Availability</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">New Projects</span>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Available
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Consultations</span>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Open
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Response Time</span>
                      <span className="text-gray-600 text-sm">24-48 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          backgroundColor: "#921e27", // maroon-500
          padding: "5rem 1rem",
          color: "#f8e4e7", // maroon-100
        }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              animation: "fadeInUp 0.8s ease-out both",
            }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 300, color: "#f8e4e7" }}>Frequently Asked Questions</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}>
              <div
                style={{
                  height: "1px",
                  width: "3rem",
                  background: "linear-gradient(to right, transparent, #921e27)",
                }}
              />
              <div
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "#f8e4e7",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  height: "1px",
                  width: "3rem",
                  background: "linear-gradient(to left, transparent, #a03c4a)",
                }}
              />
            </div>
          </div>

          <div style={{ maxWidth: "768px", margin: "0 auto" }}>
            {[
              {
                question: "What's your design process like?",
                answer:
                  "My design process begins with understanding your vision and requirements. We start with concept development, create detailed sketches, select materials, and move through prototyping to final production. Each project typically takes 4–12 weeks depending on complexity.",
              },
              {
                question: "Do you work on custom pieces?",
                answer:
                  "Absolutely! Custom design is one of my specialties. Whether you need a one-of-a-kind piece for a special event or want to develop a complete collection, I work closely with clients to bring their unique vision to life.",
              },
              {
                question: "What are your sustainability practices?",
                answer:
                  "Sustainability is core to my design philosophy. I prioritize eco-friendly materials, work with ethical suppliers, minimize waste through careful planning, and create timeless pieces designed to last for years rather than seasons.",
              },
              {
                question: "How do you handle international projects?",
                answer:
                  "I work with clients globally through virtual consultations and detailed digital communication. For fittings and final adjustments, I can arrange travel or work with trusted local partners in major cities worldwide.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  animation: "fadeInUp 0.8s ease-out both",
                  animationDelay: `${(i + 1) * 0.1}s`,
                  marginBottom: "2rem",
                }}>
                <div
                  style={{
                    backgroundColor: "white",
                    color: "#921e27", // maroon-700
                    borderRadius: "1rem",
                    padding: "2rem",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                  }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem", color: "#921e27" }}>{faq.question}</h3>
                  <p style={{ lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
