import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { delId, type },
    },
  } = req;

  if (type === "food") {
    const deleteVars = await prisma.variations.deleteMany({
        where: {
          originId: delId,
          
        },
      })
  const delfood = await prisma.food.delete({
      where: {
        id: delId,
      },
    });

    res.json({ ok: true });
  }
  if (type === "category") {
    const delcategory = await prisma.category.delete({
      where: {
        id: delId,
      },
    });
    res.json({ ok: true });
  }
}
