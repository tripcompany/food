import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { name, description, thaiName, img },
    },
  } = req;
  const createMethod = await prisma.method.create({
    data: {
      name: name,
      thaiName: thaiName,
      description: description,
      img1: img,
    },
  });

  res.json({ ok: true })
}
