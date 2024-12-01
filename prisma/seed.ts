import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "admin123", // You can hash this later
      role: "admin",
    },
  });

  // Add a few pets
  await prisma.pet.createMany({
    data: [
      { name: "Fluffy", type: "Dog", image: "https://example.com/dog.png" },
      { name: "Whiskers", type: "Cat", image: "https://example.com/cat.png" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
