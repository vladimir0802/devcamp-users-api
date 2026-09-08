import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.deleteMany();

await prisma.user.createMany({
  data: [
    { id: 1, name: "Ana Anic", email: "ana@mail.com", age: 25 },
    { id: 2, name: "Marko Maric", email: "marko@mail.com", age: 31 },
    { id: 3, name: "Iva Ivic", email: "iva@mail.com", age: 17 },
  ],
});

console.log("Seed done - 3 korisnika u bazi (id 1, 2, 3)");
await prisma.$disconnect();
