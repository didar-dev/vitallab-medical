import type { Route } from "./+types/product";
import { useLoaderData, Link } from "react-router";
import { useRef, useEffect } from "react";
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

function ShadowContent({ html }: { html: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Attach shadow root only once
    let shadow = host.shadowRoot;
    if (!shadow) {
      shadow = host.attachShadow({ mode: "open" });
    }

    shadow.innerHTML = html;
  }, [html]);

  return <div ref={hostRef} />;
}

export default function ProductPage() {
  const { product, brandName, categoryName } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-0 py-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Link>
      </nav>

      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left — Product image */}
        <figure className="lg:col-span-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}
          </div>
        </figure>

        {/* Center — Product details */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <header>
            {brandName && (
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                {brandName}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            {categoryName && (
              <p className="mt-2 text-sm text-gray-500">
                Category: <span className="text-gray-700">{categoryName}</span>
              </p>
            )}
          </header>

          {product.details && (
            <section aria-label="Product description" className="mt-4">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                Description
              </h2>
              <ShadowContent html={product.details} />
            </section>
          )}
        </section>

        {/* Right — Reserved for future (pricing, actions, etc.) */}
        <aside className="lg:col-span-3 hidden lg:block" />
      </article>
    </main>
  );
}
