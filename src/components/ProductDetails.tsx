"use client";
import { Product } from "@/lib/api";
import { useCart } from "@/stores/useCart";
import { useWishlist } from "@/stores/useWishlist";
import styles from "@/styles/Product.module.css";
import { useState } from "react";
export const dynamic = "force-dynamic";


export default function ProductDetails({ product }: { product?: Product }) {
  const addItem = useCart(s => s.addItem);
  const toggle = useWishlist(s => s.toggle);
  const isSaved = useWishlist(s => s.isSaved(product?.id ?? 0));
  const [qty, setQty] = useState(1);
  if (!product) {
    return <p style={{ padding: 20 }}>Product not found or failed to load.</p>;
  }

  return (
    <div className={styles.wrap}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.image}
      />

      <div className={styles.info}>
        <h2>{product.title}</h2>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.desc}>{product.description}</p>

        <p className={styles.price}>
          {product.price ? `$${product.price.toFixed(2)}` : "No price available"}
        </p>

        <div style={{ marginTop: 12 }}>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number(e.target.value)))
            }
            style={{ width: 80, marginRight: 8 }}
          />
          <button onClick={() => addItem(product, qty)}>Add to cart</button>
          <button
            onClick={() => toggle(product.id)}
            style={{ marginLeft: 8 }}
          >
            {isSaved ? "Saved" : "Save to wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
