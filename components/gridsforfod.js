import Link from "next/link";

export default function Grids({ key, name }) {
  const gridType = String(type); // 음식페이지, 혹은 카테고리 페이지로 가는링크

  return (
    <div className="grid-container">
      <Link href={gridType}>
        <div className="grid">img</div>
      </Link>
      <Link href={gridType}>
        <div className="grid">img</div>
      </Link>
      <Link href={gridType}>
        <div className="grid">img</div>
      </Link>
      <Link href={gridType}>
        <div className="grid">img</div>
      </Link>
      <Link href={gridType}>
        <div className="grid">img</div>
      </Link>
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
            cursor:pointer
          }
        `}
      </style>
    </div>
  );
}
