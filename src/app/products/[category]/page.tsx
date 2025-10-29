// // app/products/[category]/page.tsx
// import { fetchByCategory, Product } from "@/lib/api";
// import ProductGrid from "@/components/ProductGrid";


// type Props = { params: Promise<{ category: string }> }; // Note: Promise

// export default async function CategoryPage({ params }: Props) {
//   const { category } = await params;  // unwrap the promise
//   const decodedCategory = decodeURIComponent(category);
//   const products: Product[] = await fetchByCategory(decodedCategory);

//   return (
//     <section>
//       <h1>Category: {decodedCategory}</h1>
//       <ProductGrid products={products} />
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchByCategory, fetchCategories, Product } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { formatCategoryForUrl } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams(); // Next.js hook to get the [category] param
  const slug = params?.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);

        const realCategory =
          cats.find(cat => formatCategoryForUrl(cat) === slug) || null;

        if (!realCategory) {
          setError("Category not found.");
          setProducts([]);
          return;
        }

        const prods = await fetchByCategory(realCategory);
        setProducts(prods);
      } catch (err) {
        console.error("Failed to fetch category products:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Category: {typeof slug === 'string' ? slug.replace(/-/g, " ") : ''}</h1>
      <ProductGrid products={products} />
    </section>
  );
}
