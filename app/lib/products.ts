/** Raw product from Directus GET /items/Products */
export interface ProductItemRaw {
  id: number;
  date_created: string | null;
  date_updated: string | null;
  Name: string;
  Details: string | null;
  Brand: number | null;
  Image: string | null;
  Category: number | null;
}

/** Raw brand from Directus GET /items/Brands */
export interface BrandItemRaw {
  id: number;
  date_created: string | null;
  date_updated: string | null;
  Name: string;
}

export interface ProductsApiResponse {
  data: ProductItemRaw[];
}

export interface BrandsApiResponse {
  data: BrandItemRaw[];
}

/** Normalized product */
export interface Product {
  id: string;
  name: string;
  details: string | null;
  image: string | null;
  brandId: string;
  categoryId: string;
}

/** Normalized brand */
export interface Brand {
  id: string;
  name: string;
}

function buildImageUrl(imageId: string | null): string | null {
  if (!imageId) return null;
  return `${import.meta.env.VITE_API_URL}/assets/${imageId}`;
}

function transformProducts(raw: ProductItemRaw[]): Product[] {
  return raw.map((item) => ({
    id: String(item.id),
    name: item.Name,
    details: item.Details,
    image: buildImageUrl(item.Image),
    brandId: String(item.Brand ?? ""),
    categoryId: String(item.Category ?? ""),
  }));
}

function transformBrands(raw: BrandItemRaw[]): Brand[] {
  return raw.map((item) => ({
    id: String(item.id),
    name: item.Name,
  }));
}

/** Fetch all products and brands from the Directus API. */
export async function fetchProductsData(): Promise<{
  products: Product[];
  brands: Brand[];
}> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [productsRes, brandsRes] = await Promise.all([
    fetch(`${apiUrl}/items/Products`),
    fetch(`${apiUrl}/items/Brands`),
  ]);

  if (!productsRes.ok) throw new Error("Failed to fetch products");
  if (!brandsRes.ok) throw new Error("Failed to fetch brands");

  const productsJson: ProductsApiResponse = await productsRes.json();
  const brandsJson: BrandsApiResponse = await brandsRes.json();

  return {
    products: transformProducts(productsJson.data ?? []),
    brands: transformBrands(brandsJson.data ?? []),
  };
}
