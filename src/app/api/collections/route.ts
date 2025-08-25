import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const COLLECTIONS_FILE = path.join(process.cwd(), 'src/data/collections.json');

// GET - Ambil semua collections
export async function GET() {
  try {
    const fileContent = await fs.readFile(COLLECTIONS_FILE, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading collections:', error);
    return NextResponse.json({ error: 'Failed to load collections' }, { status: 500 });
  }
}

// POST - Tambah collection baru
export async function POST(request: NextRequest) {
  try {
    const newCollection = await request.json();
    
    const fileContent = await fs.readFile(COLLECTIONS_FILE, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Generate ID baru
    newCollection.id = newCollection.name.toLowerCase().replace(/\s+/g, '-');
    
    data.collections.push(newCollection);
    
    await fs.writeFile(COLLECTIONS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, collection: newCollection });
  } catch (error) {
    console.error('Error adding collection:', error);
    return NextResponse.json({ error: 'Failed to add collection' }, { status: 500 });
  }
}

// PUT - Update collection
export async function PUT(request: NextRequest) {
  try {
    const updatedCollection = await request.json();
    
    const fileContent = await fs.readFile(COLLECTIONS_FILE, 'utf8');
    const data = JSON.parse(fileContent);
    
    const index = data.collections.findIndex((c: { id: string }) => c.id === updatedCollection.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    
    data.collections[index] = updatedCollection;
    
    await fs.writeFile(COLLECTIONS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, collection: updatedCollection });
  } catch (error) {
    console.error('Error updating collection:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}
