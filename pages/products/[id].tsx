import axios from "axios";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductForm from "../../components/ProductForm";

import { Product } from "../../types/Product";

const ProductPage: NextPage = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const deleteProduct = async () => {
    console.log(product);
    await axios.delete(`http://localhost:8080/api/products/${product.id}`);

    router.push("/");
    console.log("deleted");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">back to home</Link>
        <br />
        <Link href="/products">back to products page</Link>
        <div>this is the main el</div>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>{product.price}</h3>
        <button onClick={() => setShowForm(!showForm)}>Edit product</button>
        {showForm && <ProductForm type="edit" product={product} />}
        <button onClick={deleteProduct}>Delete product</button>
      </main>

      <footer>
        <div>this is a footer</div>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await axios.get(
    `http://localhost:8080/api/products/${context.query.id}`
  );
  const { data } = res;

  // Pass data to the page via props
  return { props: { product: data } };
};

export default ProductPage;
