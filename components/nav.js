import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <Link href='/'>
      <div className="container">
        <h1>Thai food dictionary</h1>
        <h4>by tripcompany</h4>
      </div>
      </Link>

      <style jsx>{`
      .container {
        position: relative;
        left:50%;
        right:50;
        transform: translate(-50%, 50%);
        text-align: center;
        margin: 50px;
      }
      `}</style>
    </div>
  );
}
