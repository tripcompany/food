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
  if (type === "method") {
    const delcategory = await prisma.method.delete({
      where: {
        id: delId,
      },
    });
    res.json({ ok: true });
  }
  if (type === "ingredient") {
    const delcategory = await prisma.ingredient.delete({
      where: {
        id: delId,
      },
    });
    res.json({ ok: true });
  }
}
