import Image from "next/image";
import chicken from "../../public/chicken.jpeg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Category({crtFood, category}) {

  return (
    <div>
      <div className="foodHead">
        <Image alt="Category" src={chicken} />
        {/* 어썸 슬라이더 활용하기 */}
        <h1>{crtFood.name}</h1>
        <h2>{crtFood.engName}</h2>
        <h2>{crtFood.thaiName}</h2>


        <Link href={`/category/${crtFood.Category[0].id}`}>
          <span className="toCategory">{crtFood.Category[0].name}</span>
        </Link>
        <Link href={`/category/${crtFood.Category[1].id}`}>
          <span className="toCategory">{crtFood.Category[1].name}</span>
        </Link>
        <Link href={`/category/${crtFood.Category[2].id}`}>
          <span className="toCategory">{crtFood.Category[2].name}</span>
        </Link>
      </div>
      <p>
   {crtFood.description}
      </p>

      <div>
        <h2>파생 요리</h2>
        <span>팟타이 꿍</span>
        <p>새우를 넣은 팟타이</p>
        <span>팟타이 까이</span>
        <p>닭고기를 넣은 팟타이</p>
        <span>팟타이 무</span>
        <p>돼지고기를 넣은 팟타이</p>
      </div>

      <h2>비슷한 음식들</h2>

      <h2>다른 카테고리들</h2>
      <div className="grid-container">
        {category.map((c) => (
          <Link key={c.id} href={`/category/${c.id}`}>
            <div className="grid">{c.name}</div>
          </Link>
        ))}
      </div>
      <style jsx>
        {`
          span {
            margin: 0 20px 0;

          }
          .toCategory:hover {
            color: rgb(12, 89, 254);
            font-weight: 600;
            cursor:pointer;
          }
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
      Category:true,
    },
  });
  const category = await prisma.category.findMany();

   return {
     props : {crtFood, category}
 };

 }

 