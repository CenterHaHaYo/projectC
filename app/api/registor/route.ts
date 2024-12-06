import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';
import { z } from 'zod';


const registerSchema = z.object({
  name: z.string().min(2, 'Your name must at least 2 letters'),
  email: z.string().email('Please type your email to be correct'), 
  password: z.string().min(6, 'Password at least 6 letters'),
  role: z.enum(['user', 'admin']).optional(), // role ต้องเป็น 'user' หรือ 'admin'
});

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { name, email, password, role } = registerSchema.parse(body);
    //const { name, email, password, role } = await req.json();

  
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'user', 
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
