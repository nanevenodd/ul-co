import { NextResponse } from 'next/server';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactMessage = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Here you can add your email sending logic
    // For now, we'll just log the message and return success
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString()
    });
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
