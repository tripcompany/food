import Link from "next/link";

export default function Header(){
    return (
        <Header>
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
              align-items: center;
              display:relative;
              position:fixed
    
            }
            h1 {}
            h4 {
              font-weight: 100;
              margin:0;
            }
          `}</style>
        </div>
        </Header>
      );
}