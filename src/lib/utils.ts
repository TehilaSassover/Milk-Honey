// Format category name for URL (e.g., "men's clothing" → "mens-clothing")
export const formatCategoryForUrl = (category: string) =>
  category.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");

// Parse category name from URL (e.g., "mens-clothing" → "men's clothing")
export const parseCategoryFromUrl = (urlCategory: string) =>
  urlCategory
    .replace(/-/g, " ")
    .replace(/^(.)/, (_, c) => c.toLowerCase());
