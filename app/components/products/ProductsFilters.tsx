import type { Category } from "~/lib/categories";
import type { Brand } from "~/lib/products";

export interface ProductsFiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategoryIds: string[];
  selectedBrandIds: string[];
  onCategoryToggle: (id: string) => void;
  onBrandToggle: (id: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function ProductsFilters({
  categories,
  brands,
  selectedCategoryIds,
  selectedBrandIds,
  onCategoryToggle,
  onBrandToggle,
  onClear,
  hasActiveFilters,
}: ProductsFiltersProps) {
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
        <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={() => onCategoryToggle(cat.id)}
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
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((b) => (
            <label key={b.id} className="flex items-center gap-2 cursor-pointer">
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
