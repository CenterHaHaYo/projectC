import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Add User
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: hashedPassword,
      role: 'user',
    },
  });

  // Add Movie
  await prisma.movie.create({
    data: {
      title: 'Example Movie',
      year: 2023,
      poster: 'https://example.com/poster.jpg',
      userId: 'User_ID_from_DB', // Replace with valid user ID
    },
  });
}

main()
  .then(() => console.log('Seed data created!'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
