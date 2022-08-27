import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import Home from "../../../../public/home.svg";
import Chart from "../../../../public/chart.svg";

import styles from "./Header.module.scss";

// All the links in here just go to the home page with octomize because I am
// not implementing additional pages as part of this exercise.
const Header = () => {
  return (
    <header className={styles.root}>
      <Image src={Logo} alt="Home" />
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <Image src={Home} alt="home" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <Image src={Chart} alt="analysis" />
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.profile}>
          <Link href="/">
            <a aria-label="view profile">
              <div className={styles.imgFallback} />
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
