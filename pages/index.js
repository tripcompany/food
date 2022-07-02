import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Grids from "../components/grids";

const prisma = new PrismaClient();

export default function Home({ category, food }) {
  return (
    <div>
      <div>
        <h2>Category</h2>
        <div className="grid-container">
          {category.map((c) => (
            <Grids
              type="category"
              key={c.id}
              id={c.id}
              name={c.name}
              img={c.img1}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>Foods</h2>
        <div className="grid-container">
          {food.map((f) => (
            <Grids type="food" key={f.id} id={f.id} name={f.name} img={f.img1}
            />
          ))}
        </div>
      </div>
      <style jsx>
        {`

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
