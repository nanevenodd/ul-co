import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const faqFilePath = path.join(process.cwd(), "src/data/faq.json");

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Ensure FAQ file exists
function ensureFaqFile() {
  if (!fs.existsSync(faqFilePath)) {
    const initialData = {
      faqs: [
        {
          id: "1",
          question: "How do I place an order?",
          answer: "You can place an order by contacting us through WhatsApp or Instagram. We'll guide you through the process and discuss your requirements.",
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          question: "What is the typical delivery time?",
          answer: "Delivery time varies depending on the complexity of the design and current workload. Generally, it takes 2-4 weeks for custom pieces.",
          order: 2,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          question: "Do you ship internationally?",
          answer: "Currently, we primarily serve customers in Indonesia. For international shipping, please contact us to discuss options and pricing.",
          order: 3,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };
    fs.writeFileSync(faqFilePath, JSON.stringify(initialData, null, 2));
  }
}

// GET - Fetch all FAQs
export async function GET(request: Request) {
  try {
    ensureFaqFile();
    const data = fs.readFileSync(faqFilePath, "utf8");
    const faqData = JSON.parse(data);

    const url = new URL(request.url);
    const activeOnly = url.searchParams.get("active") === "true";

    let faqs = faqData.faqs;
    if (activeOnly) {
      faqs = faqs.filter((faq: FAQ) => faq.isActive);
    }

    // Sort by order
    faqs.sort((a: FAQ, b: FAQ) => a.order - b.order);

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// POST - Create new FAQ
export async function POST(request: Request) {
  try {
    ensureFaqFile();
    const newFaq = await request.json();

    // Validation
    if (!newFaq.question || !newFaq.answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const data = fs.readFileSync(faqFilePath, "utf8");
    const faqData = JSON.parse(data);

    // Generate new ID
    const newId = (Math.max(...faqData.faqs.map((f: FAQ) => parseInt(f.id)), 0) + 1).toString();

    // Get next order number
    const nextOrder = Math.max(...faqData.faqs.map((f: FAQ) => f.order), 0) + 1;

    const faq: FAQ = {
      id: newId,
      question: newFaq.question,
      answer: newFaq.answer,
      order: newFaq.order || nextOrder,
      isActive: newFaq.isActive !== undefined ? newFaq.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    faqData.faqs.push(faq);
    fs.writeFileSync(faqFilePath, JSON.stringify(faqData, null, 2));

    return NextResponse.json({ faq }, { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

// PUT - Update FAQ
export async function PUT(request: Request) {
  try {
    ensureFaqFile();
    const updateData = await request.json();

    if (!updateData.id) {
      return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
    }

    const data = fs.readFileSync(faqFilePath, "utf8");
    const faqData = JSON.parse(data);

    const faqIndex = faqData.faqs.findIndex((f: FAQ) => f.id === updateData.id);
    if (faqIndex === -1) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    // Update FAQ
    faqData.faqs[faqIndex] = {
      ...faqData.faqs[faqIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(faqFilePath, JSON.stringify(faqData, null, 2));

    return NextResponse.json({ faq: faqData.faqs[faqIndex] });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

// DELETE - Delete FAQ
export async function DELETE(request: Request) {
  try {
    ensureFaqFile();
    const body = await request.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
    }

    const data = fs.readFileSync(faqFilePath, "utf8");
    const faqData = JSON.parse(data);

    const faqIndex = faqData.faqs.findIndex((f: FAQ) => f.id === id);
    if (faqIndex === -1) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    faqData.faqs.splice(faqIndex, 1);
    fs.writeFileSync(faqFilePath, JSON.stringify(faqData, null, 2));

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
