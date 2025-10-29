// components/ProductGrid.tsx
"use client";
import { Product } from "@/lib/api";
import ProductCard from "./ProductCard";
import styles from "@/styles/Products.module.css";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
