import Link from "next/link";
import Image from "next/image";
import styles from "./grids.module.css";

export default function Grids({ id, name, img, type, cat1, cat2, cat3 }) {
  if (type === "method") {
    return (
      <Link href={`/method/${id}`}>
        <div className={styles.grid}>
            <img className={styles.img} src={img}/>
          <span>{name}</span>
        </div>
      </Link>
    );
  }
  if (type === "ingredient") {
    return (
      <Link href={`/ingredient/${id}`}>
        <div className={styles.grid}>
            <img className={styles.img} src={img}/>
          <span>{name}</span>
        </div>
      </Link>
    );
  }
  if (type === "food") {
    return (
      <Link href={`/food/${id}`}>
        <div className={styles.grid}>
            <img className={styles.img} src={img}/>
          <span>{name}</span>
          <div>
            <span>{cat1}</span>
            <span>{cat2}</span>
            <span>{cat3}</span>
          </div>
        </div>
      </Link>
    );
  }

}
