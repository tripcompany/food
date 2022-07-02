import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import React from "react";
import Grids from "../../components/grids";
import styles from "./category.module.css";

const prisma = new PrismaClient();

export default function Category({ nowCategory, category, food }) {
  console.log(nowCategory);

  return (
    <div>
      <div className={styles.content}>
      <div className={styles.head}>
      <h1>{nowCategory.name}</h1>
      </div>
      <div className={styles.catcontainer}>
        {nowCategory.img1 === null ? null : (
          <img className={styles.image} alt="" src={nowCategory.img1} />
        )}
        <p>{nowCategory.description}</p>{" "}
      </div>
      </div>
      <h2>카테고리로 조리한 음식들</h2>
      <div className="grid-container">
        {food.map((f) => (
          <Grids type="food" key={f.id} id={f.id} name={f.name} img={f.img1} />
        ))}
      </div>

      <h2>다른 카테고리들</h2>
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
            contains: nowCategory.name,
          },
        },
      },
    },
  });

  return {
    props: { nowCategory, category, food },
  };
};
