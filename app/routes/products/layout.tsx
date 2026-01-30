import type { Route } from "./+types/layout";
import {
  useLoaderData,
  useSearchParams,
  useNavigation,
  Outlet,
} from "react-router";
import { useMemo, useState } from "react";
import { fetchProductsData, type Product } from "~/lib/products";
import { fetchCategoriesData } from "~/lib/categories";
import { ProductsLayout } from "~/components/products/ProductsLayout";
import { ProductsFilters } from "~/components/products/ProductsFilters";
import { ProductsContentSkeleton } from "~/components/products/ProductsContentSkeleton";
import { ProductDetailSkeleton } from "~/components/products/ProductDetailSkeleton";

const PAGE_SIZE = 12;

function toParams(updates: {
  category?: string[];
  brand?: string[];
  page?: number;
}): Record<string, string | string[]> {
  const r: Record<string, string | string[]> = {};
  if (updates.category && updates.category.length > 0)
    r.category = updates.category;
  if (updates.brand && updates.brand.length > 0) r.brand = updates.brand;
  if (updates.page != null && updates.page > 1) r.page = String(updates.page);
  return r;
}

function mergeParams(
  prev: URLSearchParams,
  updates: { category?: string[]; brand?: string[]; page?: number },
): Record<string, string | string[]> {
  const category =
    updates.category !== undefined ? updates.category : prev.getAll("category");
  const brand =
    updates.brand !== undefined ? updates.brand : prev.getAll("brand");
  const page =
    updates.page !== undefined
      ? updates.page
      : Math.max(1, parseInt(prev.get("page") || "1", 10) || 1);
  return toParams({ category, brand, page });
}

export interface ProductsOutletContext {
  paginated: Product[];
  totalPages: number;
  page: number;
  setPage: (p: number) => void;
  total: number;
  brandMap: Record<string, string>;
  hasProducts: boolean;
  pageSize: number;
}

export async function loader() {
  const [productsData, categories] = await Promise.all([
    fetchProductsData(),
    fetchCategoriesData(),
  ]);
  return {
    products: productsData.products,
    brands: productsData.brands,
    categories: categories || [],
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products - VitalLab Medical" },
    {
      name: "description",
      content: "Browse our medical products by category and brand.",
    },
  ];
}

export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: {
  currentUrl: URL;
  nextUrl: URL;
  defaultShouldRevalidate: boolean;
}) {
  if (currentUrl.pathname === nextUrl.pathname) return false;
  return defaultShouldRevalidate;
}

export default function ProductsLayoutRoute() {
  const { products, brands, categories } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isLoading = navigation.state === "loading";
  const isNavigatingToProduct =
    navigation.location?.pathname?.match(/^\/products\/[^/]+$/) ?? false;

  const selectedCategoryIds = searchParams.getAll("category");
  const selectedBrandIds = searchParams.getAll("brand");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(p.categoryId);
      const matchBrand =
        selectedBrandIds.length === 0 || selectedBrandIds.includes(p.brandId);
      return matchCat && matchBrand;
    });
  }, [products, selectedCategoryIds, selectedBrandIds]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(
    () =>
      filtered.slice(
        (page - 1) * PAGE_SIZE,
        (page - 1) * PAGE_SIZE + PAGE_SIZE,
      ),
    [filtered, page],
  );

  const toggleCategory = (id: string) => {
    const next = selectedCategoryIds.includes(id)
      ? selectedCategoryIds.filter((x) => x !== id)
      : [...selectedCategoryIds, id];
    setSearchParams((prev) =>
      mergeParams(prev, { category: next, brand: selectedBrandIds, page: 1 }),
    );
  };

  const toggleBrand = (id: string) => {
    const next = selectedBrandIds.includes(id)
      ? selectedBrandIds.filter((x) => x !== id)
      : [...selectedBrandIds, id];
    setSearchParams((prev) =>
      mergeParams(prev, {
        category: selectedCategoryIds,
        brand: next,
        page: 1,
      }),
    );
  };

  const clearFilters = () => {
    setSearchParams((prev) =>
      mergeParams(prev, { category: [], brand: [], page: 1 }),
    );
  };

  const setPage = (p: number) => {
    setSearchParams((prev) => mergeParams(prev, { page: p }));
  };

  const hasActiveFilters =
    selectedCategoryIds.length > 0 || selectedBrandIds.length > 0;
  const brandMap = useMemo(
    () => Object.fromEntries(brands.map((b) => [b.id, b.name])),
    [brands],
  );

  const filters = (
    <ProductsFilters
      categories={categories}
      brands={brands}
      selectedCategoryIds={selectedCategoryIds}
      selectedBrandIds={selectedBrandIds}
      onCategoryToggle={toggleCategory}
      onBrandToggle={toggleBrand}
      onClear={clearFilters}
      hasActiveFilters={hasActiveFilters}
    />
  );

  const content = isLoading ? (
    isNavigatingToProduct ? (
      <ProductDetailSkeleton />
    ) : (
      <ProductsContentSkeleton />
    )
  ) : (
    <Outlet
      context={{
        paginated,
        totalPages,
        page,
        setPage,
        total: filtered.length,
        brandMap,
        hasProducts: filtered.length > 0,
        pageSize: PAGE_SIZE,
      }}
    />
  );

  return (
    <ProductsLayout
      filters={filters}
      filtersOpen={filtersOpen}
      onFiltersOpenChange={setFiltersOpen}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={selectedCategoryIds.length + selectedBrandIds.length}
      title="Products"
    >
      {content}
    </ProductsLayout>
  );
}
