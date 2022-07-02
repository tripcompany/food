import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { name, engName, thaiName, descripcion, method, ing1, ing2,img1, },
    }
  } = req;
  const createfood = await prisma.food.create({
    data: {
      name: name,
      engName: engName,
      thaiName: thaiName,
      description: descripcion,
      img1:img1,
      Category : {connect:[{name: method}, {name: ing1}, {name: ing2}]}

    },
  });

  res.json({ ok: true });
}
