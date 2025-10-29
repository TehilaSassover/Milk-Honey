// ממיר שם קטגוריה ל-slug URL
export const formatCategoryForUrl = (category: string) =>
  category.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");
