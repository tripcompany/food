import Image from "next/image";
import chicken from "../../public/chicken.jpeg";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default function Category({ nowCategory, category, food }) {

  return (
    <div>
      <h1>{nowCategory.name}</h1>
      <div>
        <Image alt="Category" src={chicken} />
      </div>

      <p>{nowCategory.description}</p>
      <h2>카테고리로 조리한 음식들</h2>
      <div className="grid-container">
        {food.map((f) => (
          <Link key={f.id} href={`/food/${f.id}`}>
            <div className="grid">{f.name}</div>
          </Link>
        ))}
      </div>

      <h2>다른 카테고리들</h2>
      <div className="grid-container">
        {category.map((c) => (
          <Link key={c.id} href={`/category/${c.id}`}>
            <div className="grid">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>

  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const nowCategory = await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });
  const category = await prisma.category.findMany();

  const food = await prisma.food.findMany({
    where: {
      Category: {
        some: {
          name: {
            contains:nowCategory.name,
          },
        },
      },
    },
  });


  return {
    props: { nowCategory, category, food },
  };
};
