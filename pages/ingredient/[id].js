import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import React from "react";
import Grids from "../../components/grids";
import styles from "./category.module.css";

const prisma = new PrismaClient();

export default function Category({ nowIng, ingredient, food, method }) {

  return (
    <div>
      <div className={styles.content}>
      <div className={styles.head}>
      <h1>{nowIng.name}</h1>
      </div>
      <div className={styles.catcontainer}>
        {nowIng.img1 === null ? null : (
          <img className={styles.image} alt="" src={nowIng.img1} />
        )}
        <div className={styles.description} dangerouslySetInnerHTML={{__html: `${nowIng.description}`}}></div>
      </div>
      </div>
      <h2>카테고리로 조리한 음식들</h2>
      <div className="grid-container">
        {food.map((f) => (
          <Grids type="food" key={f.id} id={f.id} name={f.name} img={f.img1} />
        ))}
      </div>

      <h2>by Ingredient</h2>
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
      <h2>by Method</h2>
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
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const nowIng = await prisma.ingredient.findUnique({
    where: { id: parseInt(id) },
  });
  const ingredient = await prisma.ingredient.findMany();
  const method = await prisma.method.findMany();


  const food = await prisma.food.findMany({
    where: {
      ingredient: {
        some: {
          name: {
            contains: nowIng.name,
          },
        },
      },
    },
  });

  return {
    props: { nowIng, ingredient, food, method },
  };
};
