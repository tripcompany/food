import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    body: {
      data: { varName, varDes, originFood },
    },
  } = req;
  const createVar = await prisma.food.update({
    where:{
      id:originFood
    },
    data: {
      variations:{
        create: [{
          varName:varName,
          varDes:varDes,
        }],
      },
    },
  });
  res.json({ ok: true });
}
