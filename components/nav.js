import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <Link href="/">
        <div className="nav">
          <h1>Thai food dictionary</h1>
          <h4>by tripcompany</h4>
        </div>
      </Link>

      <style jsx>{`
        .nav {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1 {}
        h4 {
          font-weight: 100;
          margin:0;
        }
      `}</style>
    </div>
  );
}
