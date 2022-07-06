import Link from "next/link";
import Head from "next/head";
import Image from "next/image";



export default function Nav() {
  const header = "https://res.cloudinary.com/dqplzfo9a/image/upload/v1657005453/Header_xgdjks.jpg";
  return (
    <div>
      <Head>
        <title>태국음식사전 by 트립콤파니</title>
      </Head>
      <div className="nav">
        <Link href="/">
          <img
            alt="home"
            src={header}
          />
        </Link>

      </div>

      <style jsx>{`
        .nav {
          margin: 2.15em;
          text-align: center;
          align-items: left;
        }
        img {
          width: 50%;
          height: 100%;
          cursor: pointer;
        }

        h1 {
          display: inline;
        }
        h4 {
          font-weight: 100;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
