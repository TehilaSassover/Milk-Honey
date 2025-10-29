// lib/api.ts
import axios from "axios";

const BASE = "https://fakestoreapi.com";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(`${BASE}/products`);
  return data;
};

export const fetchProductById = async (id: string | number): Promise<Product> => {
  const { data } = await axios.get<Product>(`${BASE}/products/${id}`);
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(`${BASE}/products/categories`);
  return data;
};

export const fetchByCategory = async (category: string): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(`${BASE}/products/category/${encodeURIComponent(category)}`);
  return data;
};
