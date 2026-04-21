import type { Route } from "./+types/layout";
import {
  useLoaderData,
  useSearchParams,
  useNavigation,
  Outlet,
} from "react-router";
import { useMemo, useState } from "react";
import { fetchProductsData, type Product } from "~/lib/products";
import {
  transformCategoriesFromApi,
  type CategoriesApiResponse,
} from "~/lib/categories";
import { ProductsLayout } from "~/components/products/ProductsLayout";
import { ProductsFilters } from "~/components/products/ProductsFilters";
import { ProductsContentSkeleton } from "~/components/products/ProductsContentSkeleton";
import { ProductDetailSkeleton } from "~/components/products/ProductDetailSkeleton";

const PAGE_SIZE = 12;

function toParams(updates: {
  category?: string[];
  brand?: string[];
  page?: number;
  search?: string;
}): Record<string, string | string[]> {
  const r: Record<string, string | string[]> = {};
  if (updates.category && updates.category.length > 0)
    r.category = updates.category;
  if (updates.brand && updates.brand.length > 0) r.brand = updates.brand;
  if (updates.page != null && updates.page > 1) r.page = String(updates.page);
  if (updates.search && updates.search.trim().length > 0) {
    r.search = updates.search.trim();
  }
  return r;
}

function mergeParams(
  prev: URLSearchParams,
  updates: {
    category?: string[];
    brand?: string[];
    page?: number;
    search?: string;
  },
): Record<string, string | string[]> {
  const category =
    updates.category !== undefined ? updates.category : prev.getAll("category");
  const brand =
    updates.brand !== undefined ? updates.brand : prev.getAll("brand");
  const page =
    updates.page !== undefined
      ? updates.page
      : Math.max(1, parseInt(prev.get("page") || "1", 10) || 1);
  const search =
    updates.search !== undefined ? updates.search : prev.get("search") || "";
  return toParams({ category, brand, page, search });
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
  const apiUrl = import.meta.env.VITE_API_URL;
  const [productsData, categoriesRes] = await Promise.all([
    fetchProductsData(),
    fetch(`${apiUrl}/items/Categories`).then(async (r) => {
      if (!r.ok) throw new Error("Failed to fetch categories");
      return r.json() as Promise<CategoriesApiResponse>;
    }),
  ]);
  const categories = transformCategoriesFromApi(categoriesRes);
  return {
    products: productsData.products,
    brands: productsData.brands,
    categories,
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
  const searchTerm = searchParams.get("search") || "";
  const hasSearch = searchTerm.trim().length > 0;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const brandMap = useMemo(
    () => Object.fromEntries(brands.map((b) => [b.id, b.name])),
    [brands],
  );
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(p.categoryId);
      const matchBrand =
        selectedBrandIds.length === 0 || selectedBrandIds.includes(p.brandId);
      const matchSearch =
        !hasSearch ||
        [p.name, p.details, brandMap[p.brandId]]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch));
      return matchCat && matchBrand && matchSearch;
    });
  }, [
    products,
    selectedCategoryIds,
    selectedBrandIds,
    normalizedSearch,
    brandMap,
  ]);

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

  const toggleCategoryParent = (cat: (typeof categories)[0]) => {
    const subIds = cat.subCategories.map((s) => s.id);
    if (subIds.length === 0) {
      toggleCategory(cat.id);
      return;
    }
    const allSelected = subIds.every((id) => selectedCategoryIds.includes(id));
    const next = allSelected
      ? selectedCategoryIds.filter((x) => !subIds.includes(x))
      : [
          ...selectedCategoryIds,
          ...subIds.filter((id) => !selectedCategoryIds.includes(id)),
        ];
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
    setSearchParams(() => toParams({}));
  };

  const updateSearch = (value: string) => {
    const nextSearch = value.trim();
    setSearchParams((prev) => {
      if (!nextSearch) {
        return mergeParams(prev, { search: "", page: 1 });
      }

      const hasExistingSearch = (prev.get("search") || "").trim().length > 0;
      if (!hasExistingSearch) {
        return toParams({ search: nextSearch, page: 1 });
      }

      return mergeParams(prev, { search: nextSearch, page: 1 });
    });
  };

  const setPage = (p: number) => {
    setSearchParams((prev) => mergeParams(prev, { page: p }));
  };

  const hasActiveFilters =
    selectedCategoryIds.length > 0 || selectedBrandIds.length > 0 || hasSearch;

  const filters = (
    <ProductsFilters
      categories={categories}
      brands={brands}
      selectedCategoryIds={selectedCategoryIds}
      selectedBrandIds={selectedBrandIds}
      onCategoryToggle={toggleCategory}
      onCategoryParentToggle={toggleCategoryParent}
      onBrandToggle={toggleBrand}
      onClear={clearFilters}
      hasActiveFilters={hasActiveFilters}
      searchValue={searchTerm}
      onSearchChange={updateSearch}
    />
  );

  if (isLoading && isNavigatingToProduct) {
    return <ProductDetailSkeleton />;
  }

  const content = isLoading ? (
    <ProductsContentSkeleton />
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
      activeFiltersCount={
        selectedCategoryIds.length +
        selectedBrandIds.length +
        (hasSearch ? 1 : 0)
      }
      title="Products"
    >
      {content}
    </ProductsLayout>
  );
}
