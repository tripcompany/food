
import Link
 from "next/link";
export default function Footer() {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <div>
        <div className="footer">
        <p>
          Copyright &copy; <span>{thisYear()}</span>
        </p>
        <Link href={"https://www.youtube.com/channel/UC0EQX5Z2TlaKeIw4O3ieZAQ"}><h2>유튜브 트립콤파니</h2></Link>
        </div>
        <style jsx>{`
        .footer {
          margin-top: 10em;
          text-align: center;
          align-items: left;
        
        }
        h2 {
            cursor: pointer;

        }

 
      `}</style>
    </div>

  );
}
