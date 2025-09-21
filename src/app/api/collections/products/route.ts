import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const contentFilePath = path.join(process.cwd(), "src", "data", "content.json");

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId");

    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    if (collectionId) {
      // Return products for specific collection
      const collection = (data as any).collections?.[collectionId];
      if (!collection) {
        return NextResponse.json({ error: "Collection not found" }, { status: 404 });
      }
      return NextResponse.json({ products: collection.products || [] });
    }

    // Return all products from all collections
    const allProducts = [];
    if ((data as any).collections) {
      for (const [collectionId, collection] of Object.entries((data as any).collections)) {
        const products = (collection as any).products || [];
        allProducts.push(
          ...products.map((product: any) => ({
            ...product,
            collectionId,
            collectionName: (collection as any).name,
          }))
        );
      }
    }

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { collectionId, name, description, price, images, materials, sizes, colors, featured } = body;

    if (!collectionId) {
      return NextResponse.json({ error: "Collection ID is required" }, { status: 400 });
    }

    // Read current content
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Check if collection exists
    if (!data.collections || !data.collections[collectionId]) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Generate new product ID
    const existingProducts = data.collections[collectionId].products || [];
    const maxId =
      existingProducts.length > 0
        ? Math.max(
            ...existingProducts.map((p: any) => {
              const idNum = parseInt(p.id.slice(2)); // Remove first 2 chars (e.g., "mp" from "mp001")
              return isNaN(idNum) ? 0 : idNum;
            })
          )
        : 0;

    const newIdNum = (maxId + 1).toString().padStart(3, "0");
    const collectionPrefix = collectionId.slice(0, 2); // First 2 characters of collection id
    const newId = `${collectionPrefix}${newIdNum}`;

    // Create new product
    const newProduct = {
      id: newId,
      name,
      description,
      price: typeof price === "string" ? price : `IDR ${price?.toLocaleString()}`,
      images: images || [`/products/${newId}-1.jpg`, `/products/${newId}-2.jpg`],
      materials: materials || [],
      sizes: sizes || [],
      colors: colors || [],
      featured: featured || false,
    };

    // Add product to collection
    data.collections[collectionId].products = [...existingProducts, newProduct];

    // Save updated content
    await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { collectionId, productId, name, description, price, images, materials, sizes, colors, featured } = body;

    if (!collectionId || !productId) {
      return NextResponse.json({ error: "Collection ID and Product ID are required" }, { status: 400 });
    }

    // Read current content
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Check if collection exists
    if (!data.collections || !data.collections[collectionId]) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Find and update product
    const products = data.collections[collectionId].products || [];
    const productIndex = products.findIndex((p: any) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      name,
      description,
      price: typeof price === "string" ? price : `IDR ${price?.toLocaleString()}`,
      images: images || products[productIndex].images,
      materials: materials || products[productIndex].materials,
      sizes: sizes || products[productIndex].sizes,
      colors: colors || products[productIndex].colors,
      featured: featured !== undefined ? featured : products[productIndex].featured,
    };

    data.collections[collectionId].products[productIndex] = updatedProduct;

    // Save updated content
    await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId");
    const productId = searchParams.get("productId");

    if (!collectionId || !productId) {
      return NextResponse.json({ error: "Collection ID and Product ID are required" }, { status: 400 });
    }

    // Read current content
    const fileContents = await fs.readFile(contentFilePath, "utf8");
    const data = JSON.parse(fileContents);

    // Check if collection exists
    if (!data.collections || !data.collections[collectionId]) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Filter out the product
    const products = data.collections[collectionId].products || [];
    const updatedProducts = products.filter((p: any) => p.id !== productId);

    if (products.length === updatedProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    data.collections[collectionId].products = updatedProducts;

    // Save updated content
    await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
