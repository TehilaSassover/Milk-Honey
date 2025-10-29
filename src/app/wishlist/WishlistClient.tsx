"use client";

import { useWishlist } from "@/stores/useWishlist";

type Props = {
  allProducts: any[];
};

export default function WishlistClient({ allProducts }: Props) {
  const ids = useWishlist((s) => s.ids);
  const saved = allProducts.filter((p) => ids.includes(p.id));

  if (saved.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div>
      <h1>My Wishlist</h1>
      <ul>
        {saved.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.title} width={50} />
            {p.title} – ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
