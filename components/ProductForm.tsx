import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "../types/Product";

interface ProductForm {
  type: "add" | "edit";
  product?: Product;
}
const ProductForm = ({ type, product }: ProductForm) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "0");
  const router = useRouter();

  const sendRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      price: typeof price === "string" ? parseInt(price, 10) : price,
    };
    if (type === "add") {
      await axios.post(`http://localhost:8080/api/products`, payload);
    } else if (type === "edit") {
      await axios.put(
        `http://localhost:8080/api/products/${product?.id}`,
        payload
      );
    }
    router.push("/products");
  };

  return (
    <form onSubmit={sendRequest}>
      <label>name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">submit</button>
    </form>
  );
};

export default ProductForm;
