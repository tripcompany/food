import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const prisma = new PrismaClient();

export default function Admin({ method, ingredient, food }) {
  const { data: session, status } = useSession();

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

  if (session) {
    return (
      <div>
        {status === "authenticated" && (
          <div>
            <button onClick={signOut}>Sign Out</button>
            <p>{session.user.email}</p>
          </div>
        )}
        {status === "unauthenticated" && (
          <button onClick={signIn}>Sign in</button>
        )}
        <Link href="/write">
          <button>음식 작성</button>
        </Link>
        <Link href="/write-category">
          <button>카테고리 작성</button>
        </Link>

        <div>
          <h2>조리법</h2>
          <table>
            <tbody>
              <tr></tr>
              {method.map((m) => (
                <tr key={m.id}>
                  <th>
                    <Link href={`/method/${m.id}`}>{m.name}</Link>
                  </th>
                  <th>
                    <button value={m.id} name="method" onClick={del}>
                      삭제
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>재료</h2>

          <table>
            <tbody>
              {ingredient.map((i) => (
                <tr key={i.id}>
                  <th>
                    <Link href={`/ingredient/${i.id}`}>{i.name}</Link>
                  </th>
                  <th>
                    <button value={i.id} name="ingredient" onClick={del}>
                      삭제
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>음식들</h2>
          <table>
            <tbody>
              {food.map((f) => (
                <tr key={f.id}>
                  <th>
                    <Link href={`/food/${f.id}`}>{f.name}</Link>
                  </th>
                  <th>
                    <Link href={`/comment/${f.id}`}>
                      <span>파생음식</span>
                    </Link>
                  </th>
                  <th>
                    <button value={f.id} name="food" onClick={del}>
                      삭제
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
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
  } else {
    return (
      <div>
        <Link href="/admin/login"><h1>접근 불가</h1></Link>
      </div>
    );
  }
}

export const getServerSideProps = async () => {
  const method = await prisma.method.findMany();
  const ingredient = await prisma.ingredient.findMany();

  const food = await prisma.food.findMany();

  return {
    props: { method, ingredient, food },
  };
};
