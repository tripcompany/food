import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { name, description,type, img1},
    }
  } = req;
  const createfood = await prisma.category.create({
    data: {
      name: name,
      description: description,
      type:type,
      img1:img1,

    },
  });

  res.json({ ok: true });
}
