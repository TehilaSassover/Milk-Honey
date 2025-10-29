"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductById, Product } from "@/lib/api";
import ProductDetails from "@/components/ProductDetails";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const productId = Array.isArray(id) ? id[0] ?? "" : id;
    if (!productId) return;

    const loadProduct = async () => {
      try {
        const prod = await fetchProductById(productId);
        setProduct(prod);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section style={{ paddingTop: 12 }}>
      <ProductDetails product={product} />
    </section>
  );
}
