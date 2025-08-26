import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "src/data/content.json");

// GET - Ambil semua content
export async function GET() {
  try {
    const fileContent = await fs.readFile(CONTENT_FILE, "utf8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    const updatedContent = await request.json();

    await fs.writeFile(CONTENT_FILE, JSON.stringify(updatedContent, null, 2));

    return NextResponse.json({ success: true, content: updatedContent });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
