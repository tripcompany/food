import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { name, engName, thaiName, description, method, ing1, ing2,img, },
    }
  } = req;
  const makeFood = await prisma.food.create({
    data: {
      name: name,
      engName: engName,
      thaiName: thaiName,
      description: description,
      img1:img,
      method : {connect:[{name: method}]},
      ingredient : {connect:[{name: ing1}, {name: ing2}]}

    },
  });


  res.json({ ok: true });
}
