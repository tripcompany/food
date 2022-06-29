import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

export default function Home({ category, food }) {
  return (
    <div>
      <div>
        <h2>Category</h2>
        <div className="grid-container">
          {category.map((c) => (
            <Link key={c.id} href={`/category/${c.id}`}>
              <div className="grid">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2>Foods</h2>
        <div className="grid-container">
          {food.map((f) => (
            <Link key={f.id} href={`/food/${f.id}`}>
              <div className="grid">{f.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          body {
            width: 100%;
            height: 100%;
          }
          .grid-container {
            display: grid;
            grid-template-columns: auto auto auto auto;
            gap: 10px;
            padding: 10px;
            margin: 20px;
            padding: 30px;
          }

          .grid-container > div {
            background-color: rgba(255, 255, 255, 0.8);
            text-align: center;
            padding: 20px 0;
            font-size: 30px;
            box-shadow: 1px 1px;
            border-radius: 10px;
            transition-timing-function: ease;
          }
          .grid:hover {
            transform: scale(1.1, 1.1);
            transition: transform 0.3s;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export const getServerSideProps = async () => {
  const category = await prisma.category.findMany();

  const food = await prisma.food.findMany();

  return {
    props: { category, food },
  };
};
