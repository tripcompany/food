import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { name, description},
    }
  } = req;
  const createfood = await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });

  res.json({ ok: true });
}
