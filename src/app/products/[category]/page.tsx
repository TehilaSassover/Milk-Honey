// app/products/[category]/page.tsx
import { fetchByCategory, Product } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";


type Props = { params: Promise<{ category: string }> }; // Note: Promise

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;  // unwrap the promise
  const decodedCategory = decodeURIComponent(category);
  const products: Product[] = await fetchByCategory(decodedCategory);

  return (
    <section>
      <h1>Category: {decodedCategory}</h1>
      <ProductGrid products={products} />
    </section>
  );
}
