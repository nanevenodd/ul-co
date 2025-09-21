import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const contentFilePath = path.join(process.cwd(), "src", "data", "content.json");

export async function GET() {
  try {
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Return collections data in format expected by admin dashboard
    const collections = Object.values(data.collections || {}).map((collection: any) => ({
      id: collection.id,
      name: collection.name, // Add name field for frontend
      title: collection.name,
      category: collection.id, // Use collection id as category
      description: collection.description,
      coverImage: collection.image, // Use image field from content.json
      productCount: collection.products?.length || 0,
      products: collection.products || [],
      isFeatured: collection.products?.some((p: any) => p.featured) || false,
      isActive: true,
    }));

    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Error reading collections:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, description, coverImage, isFeatured } = body;

    // Read current content
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Generate new collection ID based on category or title
    const newId = category || title.toLowerCase().replace(/\s+/g, "");

    // Create new collection
    const newCollection = {
      id: newId,
      name: title,
      description: description,
      image: coverImage || `/collections/${newId}.jpg`,
      products: [],
    };

    // Add to collections
    data.collections = data.collections || {};
    data.collections[newId] = newCollection;

    // Save updated content - Add Vercel error handling
    try {
      await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2));
    } catch (writeError) {
      console.error("File write error (Vercel filesystem is readonly):", writeError);
      return NextResponse.json({ 
        error: "Database write failed. This is a known Vercel limitation. Please use a database instead of file storage for production.",
        details: "Vercel serverless functions have read-only filesystem. Consider using Vercel KV, PostgreSQL, or another database solution."
      }, { status: 500 });
    }

    return NextResponse.json({
      message: "Collection created successfully",
      collection: {
        id: newId,
        title: title,
        category: newId,
        description: description,
        coverImage: coverImage || `/collections/${newId}.jpg`,
        productCount: 0,
        products: [],
        isFeatured: isFeatured || false,
        isActive: true,
      },
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    
    // Check if it's a filesystem permission error
    if (error instanceof Error && error.message.includes('EROFS')) {
      return NextResponse.json({ 
        error: "Read-only filesystem error on Vercel. File writes are not supported in production.",
        solution: "Please set up a database (PostgreSQL, MongoDB, etc.) instead of file-based storage."
      }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category, description, coverImage, isFeatured } = body;

    // Read current content
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Check if collection exists
    if (!data.collections || !data.collections[id]) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Update collection
    data.collections[id] = {
      ...data.collections[id],
      name: title,
      description: description,
      image: coverImage || data.collections[id].image,
    };

    // Save updated content - Add Vercel error handling
    try {
      await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2));
    } catch (writeError) {
      console.error("File write error (Vercel filesystem is readonly):", writeError);
      return NextResponse.json({ 
        error: "Database write failed. This is a known Vercel limitation. Please use a database instead of file storage for production.",
        details: "Vercel serverless functions have read-only filesystem. Consider using Vercel KV, PostgreSQL, or another database solution."
      }, { status: 500 });
    }

    return NextResponse.json({
      message: "Collection updated successfully",
      collection: {
        id: id,
        title: title,
        category: id,
        description: description,
        coverImage: coverImage || data.collections[id].image,
        productCount: data.collections[id].products?.length || 0,
        products: data.collections[id].products || [],
        isFeatured: isFeatured || false,
        isActive: true,
      },
    });
  } catch (error) {
    console.error("Error updating collection:", error);
    
    // Check if it's a filesystem permission error
    if (error instanceof Error && error.message.includes('EROFS')) {
      return NextResponse.json({ 
        error: "Read-only filesystem error on Vercel. File writes are not supported in production.",
        solution: "Please set up a database (PostgreSQL, MongoDB, etc.) instead of file-based storage."
      }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Collection ID is required" }, { status: 400 });
    }

    // Read current content
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Check if collection exists
    if (!data.collections || !data.collections[id]) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Delete collection
    delete data.collections[id];

    // Save updated content - Add Vercel error handling
    try {
      await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2));
    } catch (writeError) {
      console.error("File write error (Vercel filesystem is readonly):", writeError);
      return NextResponse.json({ 
        error: "Database write failed. This is a known Vercel limitation. Please use a database instead of file storage for production.",
        details: "Vercel serverless functions have read-only filesystem. Consider using Vercel KV, PostgreSQL, or another database solution."
      }, { status: 500 });
    }

    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    
    // Check if it's a filesystem permission error
    if (error instanceof Error && error.message.includes('EROFS')) {
      return NextResponse.json({ 
        error: "Read-only filesystem error on Vercel. File writes are not supported in production.",
        solution: "Please set up a database (PostgreSQL, MongoDB, etc.) instead of file-based storage."
      }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}
