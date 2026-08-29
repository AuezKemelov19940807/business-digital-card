import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hero = await prisma.hero.upsert({
    where: {
      id: 'main',
    },
    update: {},
    create: {
      id: 'main',
      title: 'Backend Developer',
      fullName: 'Auez Kemelov',
      profession: 'TypeScript / NestJS Developer',
      description:
        'Backend developer focused on building modern and scalable web applications.',
      email: 'auez@example.com',
      location: 'Almaty, Kazakhstan',
      isOpenToWork: true,
      github: 'https://github.com/your-username',
      linkedin: 'https://www.linkedin.com/in/your-username',
      telegram: 'https://t.me/your-username',
      image: null,
    },
  });

  console.log('Hero seeded:', hero.id);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
