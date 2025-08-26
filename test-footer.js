// Test script untuk menambah social media platform
const testData = {
  brandDescription: "UL.CO menghadirkan fashion berbasis kain ulos dengan desain modern dan berkelanjutan",
  copyright: "© 2025 UL.CO Taruli Pasaribu. All Rights Reserved.",
  bottomText: "Built with ❤️ by UL.CO",
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://instagram.com/ul.co_tarulipasaribu/",
      icon: "instagram",
      displayName: "instagram",
    },
    {
      platform: "Email",
      url: "mailto:info@ulco.com",
      icon: "mail",
      displayName: "email",
    },
    {
      platform: "WhatsApp",
      url: "https://wa.me/6283126066671",
      icon: "whatsapp",
      displayName: "whatsapp",
    },
  ],
  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Portfolio",
      href: "/portfolio",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
};

// Test menggunakan curl
// curl -X PUT http://localhost:3000/api/footer -H "Content-Type: application/json" -d '@test-footer.json'

console.log("Test data:", JSON.stringify(testData, null, 2));
