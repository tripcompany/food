import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import Grids from "../../components/grids";
import styles from "./food.module.css";
import clsx from "clsx";

const prisma = new PrismaClient();

export default function Category({
  crtFood,
  method,
  ingredient,
  similarIng1,
  similarIng2,
  similarMet,
  similarAll
}) {

  console.log(similarAll);
  const [nowShow, setNowShow] = useState(0);

  const setasCat0 = () => {
    setNowShow((current) => 0);
  };

  const setasCat1 = () => {
    setNowShow((current) => 1);
  };
  const setasCat2 = () => {
    setNowShow((current) => 2);
  };
  const setasCat3 = () => {
    setNowShow((current) => 3);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.head}>
          <h1>{crtFood.name}</h1>
          <div className={styles.othername}>
            <span>{crtFood.engName}</span>
            <span>{crtFood.thaiName}</span>
          </div>
        </div>
        <div className={styles.foodcats}>
          <span>
            <Link href={`/method/${crtFood.method[0].id}`}>
              <span className={styles.toCategory}>
                {crtFood.method[0].name}
              </span>
            </Link>
          </span>
          {crtFood.ingredient.map((i) => (
            <span key={i.id}>
              <Link href={`/ingredient/${i.id}`}>
                <span className={styles.toCategory}>{i.name}</span>
              </Link>
            </span>
          ))}
        </div>
        <div className={styles.foodcontainer}>
          {crtFood.img1 === null ? null : (
            <img className={styles.image} alt="" src={crtFood.img1} />
          )}
          {/* 어썸 슬라이더 활용하기 */}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: `${crtFood.description}` }}
          ></div>
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
      <div className={styles.similar}>
        <h2>비슷한 음식들</h2>
        <div>
          <h2
            className={clsx(styles.select, {
              [styles.selected]: nowShow === 0,
            })}
            onClick={setasCat0}
          >
            전체
          </h2>
          <h2
            className={clsx(styles.select, {
              [styles.selected]: nowShow === 1,
            })}
            onClick={setasCat1}
          >
            `{crtFood.method[0].name}`
          </h2>
          <h2
            className={clsx(styles.select, {
              [styles.selected]: nowShow === 2,
            })}
            onClick={setasCat2}
          >
            `{crtFood.ingredient[0].name}`
          </h2>
          <h2
            className={clsx(styles.select, {
              [styles.selected]: nowShow === 3,
            })}
            onClick={setasCat3}
          >
            `{crtFood.ingredient[1].name}`
          </h2>
        </div>
      </div>
      
      {nowShow === 0 && (
        <div className="grid-container">
          {similarAll.map((s) => (
            <Grids
              type="food"
              key={s.id}
              id={s.id}
              name={s.name}
              img={s.img1}
            />
          ))}
        </div>
      )} 

            {nowShow === 1 && (
        <div className="grid-container">
          {similarMet.map((s) => (
            <Grids
              type="food"
              key={s.id}
              id={s.id}
              name={s.name}
              img={s.img1}
            />
          ))}
        </div>
      )}
      {nowShow === 2 && (
        <div className="grid-container">
          {similarIng1.map((s) => (
            <Grids
              type="food"
              key={s.id}
              id={s.id}
              name={s.name}
              img={s.img1}
            />
          ))}
        </div>
      )}
      {nowShow === 3 && (
        <div className="grid-container">
          {similarIng2.map((s) => (
            <Grids
              type="food"
              key={s.id}
              id={s.id}
              name={s.name}
              img={s.img1}
            />
          ))}
        </div>
      )} 
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

      <style jsx>{`

                }`}</style>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const crtFood = await prisma.food.findUnique({
    where: { id: parseInt(id) },
    include: {
      method: true,
      ingredient: true,
      variations: true,
    },
    
  });

  const similarMet = await prisma.food.findMany({
    where: {
      method: {
        some: {
          name: {
            contains: crtFood.method[0].name,
          },
        },
      },
      NOT: {
        id: {
          in: crtFood.id
        },
      },
    },
  });
  const similarIng1 = await prisma.food.findMany({
    where: {
      ingredient: {
        some: {
          name: {
            contains: crtFood.ingredient[0].name,
          },
        },
      },
      NOT: {
        id: {
          in: crtFood.id
        },
      },
    },
  });
  const similarIng2 = await prisma.food.findMany({
    where: {
      ingredient: {
        some: {
          name: {
            contains: crtFood.ingredient[1].name,
          },
        },
      },
      NOT: {
        id: {
          in: crtFood.id
        },
      },
    },
  });

  const similarAll = await prisma.food.findMany({
    where: {
      OR: [
        {
          method: {
            some:{name: crtFood.method[0].name,},
          },
        },
        {
          ingredient: {
            some:{name: crtFood.ingredient[0].name},
          },
        },
        {
          ingredient: {
            some:{name: crtFood.ingredient[1].name},
          },
        },
      ],
      NOT: {
        id: {
          in: crtFood.id
        },
      },
    },
  });

  //여기서 카테고리 기반으로 찾기를 해야
  const method = await prisma.method.findMany();
  const ingredient = await prisma.ingredient.findMany();

  return {
    props: {
      crtFood,
      method,
      ingredient,
      similarMet,
      similarIng1,
      similarIng2,
      similarAll
    },
  };
};
