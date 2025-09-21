import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const contentPath = path.join(process.cwd(), "src/data/content.json");

export async function GET() {
  try {
    const fileContents = await fs.readFile(contentPath, "utf8");
    const content = JSON.parse(fileContents);
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newContent = await request.json();

    // Add timestamp
    newContent.lastUpdated = new Date().toISOString();

    // Write to file
    await fs.writeFile(contentPath, JSON.stringify(newContent, null, 2));

    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
