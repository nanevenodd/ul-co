import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface SocialLink {
  platform: string;
  url: string;
}

const footerPath = join(process.cwd(), "src/data/footer.json");

export async function GET() {
  try {
    const content = readFileSync(footerPath, "utf8");
    const data = JSON.parse(content);

    // Filter out invalid social links before sending
    const validSocialLinks = data.socialLinks.filter((link: SocialLink) => link.platform && link.platform.trim() !== "" && link.url && link.url.trim() !== "");

    return NextResponse.json(
      {
        ...data,
        socialLinks: validSocialLinks,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Error reading footer data:", error);
    // Return default data if file doesn't exist or has error
    return NextResponse.json({
      brandDescription: "UL.CO - Fashion Brand by Taruli Pasaribu",
      copyright: `© ${new Date().getFullYear()} All Rights Reserved.`,
      bottomText: "Built with ❤️ by UL.CO",
      socialLinks: [],
      navigation: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Contact", href: "/contact" },
      ],
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const footerData = await request.json();

    // Write directly to footer.json file
    writeFileSync(footerPath, JSON.stringify(footerData, null, 2));

    return NextResponse.json({ success: true, message: "Footer data saved successfully" });
  } catch (error) {
    console.error("Error saving footer data:", error);
    return NextResponse.json({ error: "Failed to save footer data" }, { status: 500 });
  }
}
