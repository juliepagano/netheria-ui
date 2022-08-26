import type { NextPage } from "next";
import Head from "next/head";
import OctomizeContainer from "../components/OctomizeContainer";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Netheria</title>
        <meta
          name="description"
          content="Netheria helps you accelerate deep learning models."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OctomizeContainer />
    </>
  );
};

export default HomePage;
