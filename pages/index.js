import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Grids from "../components/grids";

const prisma = new PrismaClient();

export default function Home({ method, ingredient, food }) {
  return (
    <div>
      <div>
        <h2>Method</h2>
        <div className="grid-container">
          {method.map((m) => (
            <Grids
              type="method"
              key={m.id}
              id={m.id}
              name={m.name}
              img={m.img1}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>Ingredient</h2>
        <div className="grid-container">
          {ingredient.map((i) => (
            <Grids
              type="ingredient"
              key={i.id}
              id={i.id}
              name={i.name}
              img={i.img1}
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
  const method = await prisma.method.findMany();
  const ingredient = await prisma.ingredient.findMany();

  const food = await prisma.food.findMany();

  return {
    props: { method, ingredient, food },
  };
};
