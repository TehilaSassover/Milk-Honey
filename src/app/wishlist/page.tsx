import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const allProducts = await res.json();

  return <WishlistClient allProducts={allProducts} />;
}
