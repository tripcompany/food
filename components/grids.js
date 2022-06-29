import Link from "next/link";

export default function Grids(props) {
  const {list} = props;

  return (
    <div>
      {console.log(list)}
  
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
        `}
      </style>
    </div>
  );
}
