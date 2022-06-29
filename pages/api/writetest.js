import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();



export default async function handler(req, res) {

  const food = await prisma.food.findMany({
  
  });
  res.status(200).json(food);
}
