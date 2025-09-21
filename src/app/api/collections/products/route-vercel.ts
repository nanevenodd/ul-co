import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory storage for Vercel compatibility
// In production, this should be replaced with a real database
let contentData: any = null;

// Initialize with default data
const initializeData = () => {
  if (!contentData) {
    contentData = {
      hero: {
        title: "UL.CO Portfolio",
        subtitle: "Fashion berbasis kain ulos",
        backgroundImage: "/uploads/hero-1758391109645.jpg"
      },
      designPhilosophy: {
        title: "Design Philosophy",
        content: "Our design philosophy centers on...",
        backgroundImage: "/philosophy-bg.jpg"
      },
      collections: {
        marparbuei: {
          id: "marparbuei",
          name: "Marparbuei",
          description: "Koleksi tradisional dengan sentuhan modern",
          image: "/uploads/hero-1758413922506.jpg",
          products: []
        },
        butet: {
          id: "butet",
          name: "Butet",
          description: "Elegan dan mewah dengan detail ulos yang memukau",
          image: "/uploads/hero-1758416053264.jpg",
          products: []
        },
        aksesoris: {
          id: "aksesoris",
          name: "Aksesoris",
          description: "Aksesoris fashion dengan sentuhan ulos",
          image: "/uploads/hero-1758414986583.jpg",
          products: []
        }
      }
    };
  }
  return contentData;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId");

    const data = initializeData();

    if (collectionId) {
      const collection = data.collections[collectionId];
      if (!collection) {
        return NextResponse.json({ error: "Collection not found" }, { status: 404 });
      }
      return NextResponse.json({ products: collection.products || [] });
    }

    return NextResponse.json({ collections: data.collections });
  } catch (error) {
    console.error("Error fetching products:", error);
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

    const data = initializeData();

    if (!data.collections || !data.collections[collectionId]) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Generate new product ID
    const existingProducts = data.collections[collectionId].products || [];
    const maxId = existingProducts.length > 0
      ? Math.max(...existingProducts.map((p: any) => {
          const idNum = parseInt(p.id.slice(2));
          return isNaN(idNum) ? 0 : idNum;
        }))
      : 0;

    const newIdNum = (maxId + 1).toString().padStart(3, "0");
    const collectionPrefix = collectionId.slice(0, 2);
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

    const data = initializeData();

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

    const data = initializeData();

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

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}