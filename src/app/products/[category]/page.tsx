export const dynamic = "force-dynamic";
import { fetchByCategory } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { parseCategoryFromUrl } from "@/lib/utils";

type Props = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;              // category יהיה "men's clothing"
  const decodedCategory = decodeURIComponent(category); // "men's clothing"
  const products = await fetchByCategory(decodedCategory);

  return (
    <section>
      <h1>Category: {decodedCategory}</h1>
      <ProductGrid products={products} />
    </section>
  );
}

