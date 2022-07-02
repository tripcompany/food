import Image from "next/image";
import chicken from "../../public/chicken.jpeg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import Grids from "../../components/grids";
import styles from "./food.module.css";

const prisma = new PrismaClient();

export default function Category({ crtFood, category, similar }) {
  const catlength = crtFood.Category.length;

  return (
    <div >
      <div className={styles.content}>
      <div className={styles.head}>
        <h1>{crtFood.name}</h1>
        <div className={styles.othername}>
        <span>{crtFood.engName}</span>
        <span>{crtFood.thaiName}</span>
        </div>
        </div>
        <div className={styles.foodcats}>
          {crtFood.Category.map((c) => (
            <span key={c.id}>
              <Link href={`/category/${c.id}`}>
                <span className={styles.toCategory}>{c.name}</span>
              </Link>
            </span>
          ))}
        </div>
        <div className={styles.foodcontainer}>
        {crtFood.img1 === null ? null : (
          <img  className={styles.image} alt="" src={crtFood.img1} />
        )}
        {/* 어썸 슬라이더 활용하기 */}
        <p>{crtFood.description}</p>
      </div>
      </div>

      <div>
        <h2>파생 요리</h2>
        {crtFood.variations.map((v) => (
          <div key={v.id}>
            <div>{v.varName}</div>
            <div>{v.varDes}</div>
          </div>
        ))}
      </div>

      <h2>비슷한 음식들</h2>
      <div className="grid-container">
        {similar.map((s) => (
          <Grids
            type="category"
            key={s.id}
            id={s.id}
            name={s.name}
            img={s.img1}
          />
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
      <style jsx>
        {`

        `}
      </style>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const crtFood = await prisma.food.findUnique({
    where: { id: parseInt(id) },
    include: {
      Category: true,
      variations: true,
    },
  });

  const similar = await prisma.food.findMany({
    where: {
      Category: {
        some: { name: crtFood.Category[0].name },
      },
    },
  });
  //여기서 카테고리 기반으로 찾기를 해야
  const category = await prisma.Category.findMany();

  return {
    props: { crtFood, category, similar },
  };
};
