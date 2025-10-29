// components/Header.tsx
"use client";
import Link from "next/link";
import { useCart } from "@/stores/useCart";
import { useWishlist } from "@/stores/useWishlist";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const items = useCart(s => s.items);
  const wishlist = useWishlist(s => s.ids);

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link href="/"><strong>Milk & Honey</strong></Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
        <Link href="/checkout">Cart ({totalCount})</Link>
      </nav>
    </header>
  );
}
