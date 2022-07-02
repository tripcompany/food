import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export default function admin({ category, food }) {
  const del = async (event) => {
    const delId = parseInt(event.target.value);
    const type = event.target.name;

    try {
      await axios.post("/api/delete", {
        headers: { "Content-Type": "application/json" },
        data: {
          delId: delId,
          type: type,
        },
      });
    } catch {
      alert("error");
    }
    location.reload();
  };

  return (
    <div>
      <Link href="/write">
        <button>신규 작성</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>dkdkdkdk</th>
            <th>dkdkdkdk</th>
            <th>dkdkdkdk</th>
          </tr>
          <tr>
            <th>dkdkdkdk</th>
            <th>dkdkdkdk</th>
            <th>dkdkdkdk</th>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>카테고리들</h2>

        {category.map((c) => (
          <div key={c.id}>
            <Link href={`/category/${c.id}`}>
              <span>{c.name}</span>
            </Link>
            <span>
              <button value={c.id} name="category" onClick={del}>
                삭제
              </button>
            </span>
          </div>
        ))}
      </div>
      <div>
        <h2>음식들</h2>
        {food.map((f) => (
          <div key={f.id}>
            <Link href={`/comment/${f.id}`}>
              <span>{f.name}</span>
            </Link>
            <span>
              <button value={f.id} name="food" onClick={del}>
                삭제
              </button>
            </span>
          </div>
        ))}
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
          span {
            margin: 3em;
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