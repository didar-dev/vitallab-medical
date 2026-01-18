import { getNotionClient } from "./notion";

// Data Source Configuration
const DATA_SOURCES = {
  PRODUCTS: "1405be39-db14-4e5c-ad2b-9a11a81de33f",
  BRANDS: "36399e74-e444-4987-b2ad-dfcb4e286d06",
} as const;

const MAX_PRODUCTS_PER_BRAND = 6;
const QUERY_PAGE_SIZE = 100;

// Types
interface NotionPage {
  id: string;
  properties: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  brandId: string;
  categoryId: string;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface ProductsData {
  products: Product[];
  brands: Brand[];
  productsByBrand: Record<string, Product[]>;
  error?: string;
}

// Helper Functions
function extractTextFromTitle(title: any[]): string {
  if (!title?.length) return "";
  return title[0]?.plain_text || "";
}

function transformNotionProduct(page: NotionPage): Product {
  const { properties } = page;

  return {
    id: page.id,
    name: extractTextFromTitle(properties["Product Name"]?.title),
    image: properties["Image"]?.files?.[0]?.file?.url || "",
    brandId: properties["Brand"]?.relation?.[0]?.id || "",
    categoryId: properties["Category"]?.relation?.[0]?.id || "",
    createdAt: properties["Created At"]?.date?.start || "",
  };
}

function transformNotionBrand(page: NotionPage): Brand {
  const { properties } = page;

  return {
    id: page.id,
    name: extractTextFromTitle(
      properties["Brand Name"]?.title || properties["Name"]?.title
    ),
  };
}

function groupProductsByBrand(products: Product[]): Record<string, Product[]> {
  const grouped: Record<string, Product[]> = {};

  for (const product of products) {
    if (!grouped[product.brandId]) {
      grouped[product.brandId] = [];
    }

    if (grouped[product.brandId].length < MAX_PRODUCTS_PER_BRAND) {
      grouped[product.brandId].push(product);
    }
  }

  return grouped;
}

// Main Export
export async function fetchProductsData(): Promise<ProductsData> {
  const notion = getNotionClient();

  try {
    // Fetch brands
    const brandsResponse = await notion.request({
      method: "post",
      path: `data_sources/${DATA_SOURCES.BRANDS}/query`,
      body: { page_size: QUERY_PAGE_SIZE },
    });

    const brands =
      (brandsResponse as any).results?.map(transformNotionBrand) || [];

    // Fetch products
    const productsResponse = await notion.request({
      method: "post",
      path: `data_sources/${DATA_SOURCES.PRODUCTS}/query`,
      body: { page_size: QUERY_PAGE_SIZE },
    });

    const products =
      (productsResponse as any).results?.map(transformNotionProduct) || [];
    const productsByBrand = groupProductsByBrand(products);

    return {
      products,
      brands,
      productsByBrand,
    };
  } catch (error) {
    console.error("Error fetching products data:", error);

    return {
      products: [],
      brands: [],
      productsByBrand: {},
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}
