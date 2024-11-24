import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/utils/prisma';

// เปลี่ยนเป็นค่า secret ของคุณ
// const SECRET = 'your_secret_key'; 
const SECRET = process.env.SECRET_KEY || 'default_secret'; // ใช้ .env

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ตรวจสอบว่าผู้ใช้มีอยู่ในระบบหรือไม่
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // สร้าง Token
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}