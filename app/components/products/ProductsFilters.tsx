import type { Category } from "~/lib/categories";
import type { Brand } from "~/lib/products";
import { useEffect, useState } from "react";

export interface ProductsFiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategoryIds: string[];
  selectedBrandIds: string[];
  searchValue: string;
  onCategoryToggle: (id: string) => void;
  onCategoryParentToggle: (category: Category) => void;
  onBrandToggle: (id: string) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function ProductsFilters({
  categories,
  brands,
  selectedCategoryIds,
  selectedBrandIds,
  searchValue,
  onCategoryToggle,
  onCategoryParentToggle,
  onBrandToggle,
  onSearchChange,
  onClear,
  hasActiveFilters,
}: ProductsFiltersProps) {
  const [draftSearchValue, setDraftSearchValue] = useState(searchValue);

  useEffect(() => {
    setDraftSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (draftSearchValue !== searchValue) {
        onSearchChange(draftSearchValue);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [draftSearchValue, onSearchChange, searchValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Filters</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Search products
        </label>
        <input
          type="search"
          value={draftSearchValue}
          onChange={(e) => setDraftSearchValue(e.currentTarget.value)}
          placeholder="Search by name, details, or brand"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => {
            const subIds = cat.subCategories.map((s) => s.id);
            const parentChecked =
              subIds.length > 0
                ? subIds.every((id) => selectedCategoryIds.includes(id))
                : selectedCategoryIds.includes(cat.id);
            const parentIndeterminate =
              subIds.length > 0 &&
              subIds.some((id) => selectedCategoryIds.includes(id)) &&
              !parentChecked;
            return (
              <div key={cat.id} className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    ref={(el) => {
                      if (el) el.indeterminate = parentIndeterminate;
                    }}
                    checked={parentChecked}
                    onChange={() => onCategoryParentToggle(cat)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </label>
                {cat.subCategories.map((sub) => (
                  <label
                    key={sub.id}
                    className="flex items-center gap-2 cursor-pointer pl-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.includes(sub.id)}
                      onChange={() => onCategoryToggle(sub.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{sub.name}</span>
                  </label>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((b) => (
            <label
              key={b.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrandIds.includes(b.id)}
                onChange={() => onBrandToggle(b.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{b.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
