import { useOutletContext } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "~/lib/products";
import type { ProductsOutletContext } from "./layout";
import { cn } from "~/lib/utils";

export default function ProductsIndex() {
  const {
    paginated,
    totalPages,
    page,
    setPage,
    total,
    brandMap,
    hasProducts,
    pageSize,
  } = useOutletContext<ProductsOutletContext>();

  return (
    <>
      <ProductsGrid
        products={paginated}
        brandMap={brandMap}
        hasProducts={hasProducts}
      />

      {hasProducts && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}

      {!hasProducts && (
        <p className="text-gray-600 text-center py-12">
          No products match your filters. Try adjusting or clearing filters.
        </p>
      )}
    </>
  );
}

interface ProductsGridProps {
  products: Product[];
  brandMap: Record<string, string>;
  hasProducts: boolean;
}

function ProductsGrid({
  products,
  brandMap,
  hasProducts,
}: ProductsGridProps) {
  if (!hasProducts) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          brandName={brandMap[product.brandId] || ""}
          animationDelay={i * 50}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  brandName,
  animationDelay,
}: {
  product: Product;
  brandName: string;
  animationDelay: number;
}) {
  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div
      className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        {brandName && (
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
            {brandName}
          </p>
        )}
        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (p: number) => void;
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
      <p className="text-sm text-gray-600">
        Showing {start}–{end} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            "p-2 rounded-md border transition-colors",
            page <= 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            "p-2 rounded-md border transition-colors",
            page >= totalPages
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
