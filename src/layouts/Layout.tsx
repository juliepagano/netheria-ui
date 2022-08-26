import Header from "../components/common/Header";

import styles from "./Layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.root}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
