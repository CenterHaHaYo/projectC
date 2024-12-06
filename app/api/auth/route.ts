import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/utils/prisma';
import { z } from 'zod';

 
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // ใช้ .env

const loginSchema = z.object({
  email: z.string().email('Please type your Email to be correct'),
  password: z.string().min(6, 'Password must have at least 6'),
  name: z.string().min(2, 'Your name must at least 2 letters'),
  role: z.enum(['user', 'admin']).optional(),
});

export async function POST(req: Request) {
  try{
    /*const bcrypt = require('bcrypt');
    const hash = await bcrypt.hashSync('password', 10); 
    console.log(hash);*/

    const body = await req.json();
    //const { email, password } = await req.json();
    const { email, password, name, role } = loginSchema.parse(body);
    
    const user = await prisma.user.findUnique({
    where: { email },
    });

  
    /*if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`User not found for email: ${email}`);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }*/
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }   

    
     const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, SECRET_KEY, {
    expiresIn: '1h',
    });

  
    //ส่ง Token กลับไปยัง Frontend
    return NextResponse.json({ token, name: user.name });
    }catch (error) {
      if (error instanceof z.ZodError) {
        // จัดการข้อผิดพลาดจาก zod
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}