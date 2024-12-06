import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';

export async function POST(req: Request) {
  try {
    const { email, oldPassword, newPassword } = await req.json();

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ตรวจสอบรหัสผ่านเก่า
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Old password is incorrect' }, { status: 400 });
    }

    // เข้ารหัสรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // อัปเดตรหัสผ่านใหม่ในฐานข้อมูล
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
