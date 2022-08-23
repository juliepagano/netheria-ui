import type { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Netheria</title>
        <meta
          name="description"
          content="Netheria helps you accelerate deep learning models."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default HomePage;
