
// import { fetchByCategory } from "@/lib/api";
// import ProductGrid from "@/components/ProductGrid";
// import { parseCategoryFromUrl } from "@/lib/utils";

// type Props = { params: Promise<{ category: string }> };

// export default async function CategoryPage({ params }: Props) {
//   const { category } = await params;              // category יהיה "men's clothing"
//   const decodedCategory = decodeURIComponent(category); // "men's clothing"
//   const products = await fetchByCategory(decodedCategory);

//   return (
//     <section>
//       <h1>Category: {decodedCategory}</h1>
//       <ProductGrid products={products} />
//     </section>
//   );
// }

"use client"; // <--- חשוב

import { useEffect, useState } from "react";
import { fetchByCategory, Product } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

type Props = { params: { category: string } };

export default function CategoryPage({ params }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const decodedCategory = decodeURIComponent(params.category);
        const data = await fetchByCategory(decodedCategory);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [params.category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Category: {decodeURIComponent(params.category)}</h1>
      <ProductGrid products={products} />
    </section>
  );
}
