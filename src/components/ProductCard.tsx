// components/ProductCard.tsx
"use client";
import Link from "next/link";
import { Product } from "@/lib/api";
import { useCart } from "@/stores/useCart";
import { useWishlist } from "@/stores/useWishlist";
import styles from "@/styles/Products.module.css";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const toggle = useWishlist((s) => s.toggle);
  const isSaved = useWishlist((s) => s.isSaved(product.id));

  // 🚀 שלב קריטי — מניעת Hydration mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <article className={styles.card}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </Link>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.row}>
          <strong>${product.price.toFixed(2)}</strong>
          <div>
            <button onClick={() => addItem(product, 1)} className={styles.btn}>
              Add
            </button>

            {isClient ? (
              <button
                onClick={() => toggle(product.id)}
                className={styles.btnAlt}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            ) : (
              <button disabled className={styles.btnAlt}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
