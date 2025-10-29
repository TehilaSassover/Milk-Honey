// app/product/[id]/page.tsx
import { fetchProductById } from "@/lib/api";
import ProductDetails from "@/components/ProductDetails";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  console.log("Product ID:", id);

  try {
    const product = await fetchProductById(id);
    console.log("Fetched product:", product);

    return (
      <section style={{ paddingTop: 12 }}>
        <ProductDetails product={product} />
      </section>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p>Product not found or failed to load.</p>;
  }
}
