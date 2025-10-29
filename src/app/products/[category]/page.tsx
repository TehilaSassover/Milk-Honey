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
import { fetchByCategory, Product, fetchCategories } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { formatCategoryForUrl } from "@/lib/utils";

type Props = { params: Promise<{ category: string }> }; // Params are a promise

// מאפשר Next.js ליצור דפי קטגוריה סטטיים מראש
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map(cat => ({
    category: formatCategoryForUrl(cat) // slugify לכל URL
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params; // unwrap the Promise
  console.log("Category param:", category);
  if (!category) {
    return <p>Category not found.</p>;
  }

  try {
    const products: Product[] = await fetchByCategory(category);
    return (
      <section>
        <h1>Category: {category.replace(/-/g, " ")}</h1>
        <ProductGrid products={products} />
      </section>
    );
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return <p>Failed to load products for this category.</p>;
  }
}
