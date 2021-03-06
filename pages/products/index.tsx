import axios from "axios";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductForm from "../../components/ProductForm";

import type { Product } from "../../types/Product";

const ProductsPage: NextPage = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">back to home</Link>
        <div>this is the main el</div>
        <button onClick={() => setShowAddProductForm(!showAddProductForm)}>
          add product
        </button>
        {showAddProductForm && <ProductForm type="add" />}
        <ol>
          {products.map((product: Product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                <span>
                  {product.name}, {product.price}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>

      <footer>
        <div>this is a footer</div>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await axios.get(`http://localhost:8080/api/products`);
  const { data } = res;

  // Pass data to the page via props
  return { props: { products: data } };
};

export default ProductsPage;
