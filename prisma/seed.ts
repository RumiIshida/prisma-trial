import { Prisma, PrismaClient } from '@prisma/client';
// DB

const prisma = new PrismaClient();

// Seed data
const users: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice.test@prisma.co.jp",
    "Post":{
        create: {
            title: "Hello, Prisma!",
            content: "This is my first post with Prisma",
        }
    }
    },
]

// Main function
async function main() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });