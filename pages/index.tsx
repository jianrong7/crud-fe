import axios from "axios";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>this is the main el</div>
        From API (localhost:8080/){data}
        <Link href="/products">To Products Page</Link>
      </main>

      <footer className={styles.footer}>
        <div>this is a footer</div>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await axios.get(`http://localhost:8080/`);
  const { data } = res;
  // Pass data to the page via props
  return { props: { data } };
};

export default Home;
