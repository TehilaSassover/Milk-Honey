// // // app/products/page.tsx
// // import Link from "next/link";
// // import { fetchAllProducts, fetchCategories } from "@/lib/api";
// // import ProductGrid from "../../components/ProductGrid";
// // import { formatCategoryForUrl } from "@/lib/utils";

// // export default async function ProductsPage() {
// //   const [products, categories] = await Promise.all([fetchAllProducts(), fetchCategories()]);

// //   return (
// //     <section>
// //       <h1>All Products</h1>

// //       <div style={{ margin: "12px 0" }}>
// //         <strong>Categories:</strong>{" "}
// //         {categories.map(cat => (
// //           <Link key={cat} href={`/products/${encodeURIComponent(cat)}`} style={{ marginRight: 8 }}>
// //             {cat}
// //           </Link>
// //         ))}

// //       </div>

// //       <ProductGrid products={products} />
// //     </section>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { fetchAllProducts, fetchCategories, Product } from "@/lib/api";
// import ProductGrid from "@/components/ProductGrid";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [prods, cats] = await Promise.all([
//           fetchAllProducts(),
//           fetchCategories()
//         ]);
//         setProducts(prods);
//         setCategories(cats);
//       } catch (err) {
//         console.error("Failed to fetch products or categories:", err);
//         setError("Failed to load data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <section>
//       <h1>All Products</h1>

//       <div style={{ margin: "12px 0" }}>
//         <strong>Categories:</strong>{" "}
//         {categories.map(cat => (
//           <Link key={cat} href={`/products/${encodeURIComponent(cat)}`} style={{ marginRight: 8 }}>
//             {cat}
//           </Link>
//         ))}
//       </div>

//       <ProductGrid products={products} />
//     </section>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchCategories, Product } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { formatCategoryForUrl } from "@/lib/utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, cats] = await Promise.all([
          fetchAllProducts(),
          fetchCategories()
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch products or categories:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>All Products</h1>

      <div style={{ margin: "12px 0" }}>
        <strong>Categories:</strong>{" "}
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/products/${formatCategoryForUrl(cat)}`}
            style={{ marginRight: 8 }}
          >
            {cat}
          </Link>
        ))}
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
