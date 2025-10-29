// app/products/page.tsx
import Link from "next/link";
import { fetchAllProducts, fetchCategories } from "@/lib/api";
import ProductGrid from "../../components/ProductGrid";
import { formatCategoryForUrl } from "@/lib/utils";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([fetchAllProducts(), fetchCategories()]);

  return (
    <section>
      <h1>All Products</h1>

      <div style={{ margin: "12px 0" }}>
        <strong>Categories:</strong>{" "}
        {categories.map(cat => (
          <Link key={cat} href={`/products/${encodeURIComponent(cat)}`} style={{ marginRight: 8 }}>
            {cat}
          </Link>
        ))}

      </div>

      <ProductGrid products={products} />
    </section>
  );
}
