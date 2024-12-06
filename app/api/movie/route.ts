import { NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';
import { z } from 'zod';

const movieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  year: z.number().int().min(1900, 'Year must be at least 1900').max(2100, 'Year must not exceed 2100'),
  poster: z.string().url('Poster must be a valid URL'),
  userId: z.string().uuid('Invalid userId format'),
});

const deleteSchema = z.object({
  id: z.string().uuid('Invalid id format'),
});

export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}

export async function POST(req: Request) {

  try{

  const body = await req.json();
  const { title, year, poster, userId } = movieSchema.parse(body);
  //const { title, year, poster, userId } = await req.json();
  
  const movie = await prisma.movie.create({
    data: { title, year, poster, userId },
  });
  
  return NextResponse.json(movie);
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  }
  console.error('Error creating movie:', error);
  return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
}
}


export async function DELETE(req: Request) {
  try{
    const body = await req.json();
    const { id } = deleteSchema.parse(body);
      await prisma.movie.delete({
      where: { id },
  });
  return NextResponse.json({ message: 'Movie deleted' });
    }catch (error) {
    if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error deleting movie:', error);
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}