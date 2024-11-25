import { NextResponse } from 'next/server';
// import prisma from '@/utils/prisma';
import prisma from '../../../utils/prisma';


export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}

export async function POST(req: Request) {
  const { title, year, poster, userId } = await req.json();
  const movie = await prisma.movie.create({
    data: { title, year, poster, userId },
  });
  return NextResponse.json(movie);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.movie.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Movie deleted' });
}
