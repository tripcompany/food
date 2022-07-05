import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export default function Category({ crtFood, variations }) {
  const [varName, setVarname] = useState("");
  const [varDes, setVardes] = useState("");
  const originFood = crtFood.id;

  const saveComment = async () => {
    alert(JSON.stringify([varName, varDes, originFood]));
    try {
      await axios.post("/api/commentwrite", {
        headers: { "Content-Type": "application/json" },
        data: {
          varName: varName,
          varDes: varDes,
          originFood: originFood,
        },
      });
      location.reload()
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div>
      <div className="foodHead">
        {/* 어썸 슬라이더 활용하기 */}
        <h1>{crtFood.name}</h1>
        <h2>{crtFood.engName}</h2>
        <h2>{crtFood.thaiName}</h2>
      </div>
      <p>{crtFood.description}</p>

      <div>
        <h2>파생 요리</h2>
      </div>

      <div>
        <h2>Variations</h2>
        {variations.length > 0 ? (
          variations.map((v) => (
            <div key={v.id}>
              <div>{v.varName}</div>
              <div>{v.varDes}</div>
            </div>
          ))
        ) : (
          <div>비었음</div>
        )}

        <h3>파생 입력</h3>
        <form onSubmit={saveComment}>
          <label htmlFor="varName">파생 이름</label>
          <input
            onChange={(e) => setVarname(e.target.value)}
            type="text"
            value={varName}
            name="varName"
            placeholder="write name"
          />
          <label htmlFor="varDes">파생 설명</label>
          <input
            onChange={(e) => setVardes(e.target.value)}
            value={varDes}
            type="text"
            name="varDes"
            placeholder="write description"
          />
          <input type="submit" />
        </form>
      </div>
      <style jsx>
        {`
          span {
            margin: 0 20px 0;
          }
          .toCategory:hover {
            color: rgb(12, 89, 254);
            font-weight: 600;
            cursor: pointer;
          }
          form * {
            display: block;
            margin: 10px;
          }
          div {
            position: relative;
            margin: 20px;
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

  });
  const variations = await prisma.variations.findMany();

  return {
    props: { crtFood, variations },
  };
};
