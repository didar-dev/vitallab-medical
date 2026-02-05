import type { Route } from "./+types/product";
import { useLoaderData, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { fetchProductsData } from "~/lib/products";
import {
  transformCategoriesFromApi,
  type CategoriesApiResponse,
} from "~/lib/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [productsData, categoriesRes] = await Promise.all([
    fetchProductsData(),
    fetch(`${apiUrl}/items/Categories`).then(async (r) => {
      if (!r.ok) throw new Error("Failed to fetch categories");
      return r.json() as Promise<CategoriesApiResponse>;
    }),
  ]);
  const categories = transformCategoriesFromApi(categoriesRes);
  const product = productsData.products.find((p) => p.id === params.productId);
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  const brand = productsData.brands.find((b) => b.id === product.brandId);
  const brandName = brand?.name ?? "";
  let categoryName = "";
  for (const cat of categories) {
    if (cat.id === product.categoryId) {
      categoryName = cat.name;
      break;
    }
    const sub = cat.subCategories.find((s) => s.id === product.categoryId);
    if (sub) {
      categoryName = sub.name;
      break;
    }
  }
  return { product, brandName, categoryName };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Product - VitalLab Medical" }];
  return [
    { title: `${data.product.name} - VitalLab Medical` },
    {
      name: "description",
      content: `Product: ${data.product.name}${data.brandName ? ` by ${data.brandName}` : ""}.`,
    },
  ];
}

export default function ProductPage() {
  const { product, brandName, categoryName } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="aspect-square max-h-[480px] w-full overflow-hidden bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          {brandName && (
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              {brandName}
            </p>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          {categoryName && (
            <p className="text-sm text-gray-600">{categoryName}</p>
          )}
        </div>
      </div>
    </article>
  );
}
