import Grids from "../../components/grids";
import Image from "next/image";
import chicken from "../../public/chicken.jpeg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default function Category({food}) {


  return (
    <div>
      <div className="foodHead">
        <Image alt="Category" src={chicken} />
        {/* 어썸 슬라이더 활용하기 */}
        <h1>{food.name}</h1>
        <h2>{food.engName}</h2>
        <h2>{food.thaiName}</h2>


        <Link href="/category">
          <span className="toCategory">{food.Category[0].name}</span>
        </Link>
        <Link href="/category">
          <span className="toCategory">{food.Category[1].name}</span>
        </Link>
        <Link href="/category">
          <span className="toCategory">{food.Category[2].name}</span>
        </Link>
      </div>
      <p>
   {food.description}
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

export const getServerSideProps = async () => {

  const food = await prisma.food.findUnique({
    where: {
      id: 1,
    },
    include: {
      Category: true,
    }, 
  } );
   return {
     props : {food}
 };

 }

 