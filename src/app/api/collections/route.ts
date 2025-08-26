import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const COLLECTIONS_FILE = path.join(process.cwd(), "src/data/collections.json");

// GET - Ambil semua collections
export async function GET() {
  try {
    const fileContent = await fs.readFile(COLLECTIONS_FILE, "utf8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading collections:", error);
    return NextResponse.json({ error: "Failed to load collections" }, { status: 500 });
  }
}

// POST - Tambah collection baru
export async function POST(request: NextRequest) {
  try {
    const newCollection = await request.json();

    const fileContent = await fs.readFile(COLLECTIONS_FILE, "utf8");
    const data = JSON.parse(fileContent);

    // Generate ID baru
    newCollection.id = newCollection.name.toLowerCase().replace(/\s+/g, "-");

    data.collections.push(newCollection);

    await fs.writeFile(COLLECTIONS_FILE, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, collection: newCollection });
  } catch (error) {
    console.error("Error adding collection:", error);
    return NextResponse.json({ error: "Failed to add collection" }, { status: 500 });
  }
}

// PUT - Update collection or collections
export async function PUT(request: NextRequest) {
  try {
    const requestData = await request.json();
    console.log("PUT request received:", requestData);

    const fileContent = await fs.readFile(COLLECTIONS_FILE, "utf8");
    const data = JSON.parse(fileContent);

    // Check if we're updating multiple collections or single collection
    if (requestData.collections) {
      // Update all collections (for bulk updates from product management)
      console.log("Updating all collections");
      data.collections = requestData.collections;
    } else {
      // Update single collection
      console.log("Updating single collection");
      const updatedCollection = requestData;
      const index = data.collections.findIndex((c: { id: string }) => c.id === updatedCollection.id);
      if (index === -1) {
        return NextResponse.json({ error: "Collection not found" }, { status: 404 });
      }
      data.collections[index] = updatedCollection;
    }

    await fs.writeFile(COLLECTIONS_FILE, JSON.stringify(data, null, 2));
    console.log("Collections updated successfully");

    return NextResponse.json({ success: true, collections: data.collections });
  } catch (error) {
    console.error("Error updating collection:", error);
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}

// DELETE - Hapus collection
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Collection ID is required" }, { status: 400 });
    }

    const fileContent = await fs.readFile(COLLECTIONS_FILE, "utf8");
    const data = JSON.parse(fileContent);

    const initialLength = data.collections.length;
    data.collections = data.collections.filter((collection: { id: string }) => collection.id !== id);

    if (data.collections.length === initialLength) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    await fs.writeFile(COLLECTIONS_FILE, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}
