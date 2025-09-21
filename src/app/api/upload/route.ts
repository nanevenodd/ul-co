import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `hero-${timestamp}.${fileExtension}`;
    const filePath = join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    // Auto-add uploaded file to git
    try {
      await execAsync(`git add public/uploads/${fileName}`);
      console.log(`✅ Auto-added ${fileName} to git`);
    } catch (gitError) {
      console.warn(`⚠️ Could not auto-add ${fileName} to git:`, gitError);
      // Don't fail the upload if git fails
    }

    return NextResponse.json({
      success: true,
      filePath: `/uploads/${fileName}`,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
