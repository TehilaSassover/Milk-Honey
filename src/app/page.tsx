// app/page.tsx
import { fetchAllProducts } from "@/lib/api";
import ProductGrid from "../components/ProductGrid";
import styles from "@/styles/Home.module.css";
export const dynamic = "force-dynamic";


export default async function Home() {
  const products = await fetchAllProducts();
  const latest = products.slice(-12).reverse(); // last 12 items

  return (
    <section className={styles.container}>
      <h1>Latest Products</h1>
      <ProductGrid products={latest} />
    </section>
  );
}
