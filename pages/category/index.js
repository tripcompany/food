import Grids from "../../components/grids";
import Image from 'next/image'
import chicken from '../../public/chicken.jpeg';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;


export default function Home( {category, food}) {
  return (
    <div>
      <button>{console.log(category)}</button>
      <h1>카테고리</h1>
      <div>
        <Image alt="Category" src={chicken} />
      </div>

      <p>
        카테고리는 카테고리이다 맛있게 조리해서 만들어서 아주 맛있다 굿굿
        짱이에요 하하호호 태국음식은 매일 먹어도 좋아 맛있어 짱짱
      </p>
      <h2>카테고리로 조리한 음식들</h2>
      <Grids type="/food" />
      <h2>다른 카테고리들</h2>
      <Grids type="/category"/>

    </div>
  );
}

export const getServerSideProps = async () =>{
  const category = await prisma.category.findMany();
  
  const food = await prisma.food.findMany();

return{
  props : {category, food}
};

}



//예시, 실질적으로 작업은 id로 진행됨