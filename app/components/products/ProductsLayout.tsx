import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export interface ProductsLayoutProps {
  /** Rendered in left sidebar on web; inside Sheet on mobile. */
  filters: React.ReactNode;
  filtersOpen: boolean;
  onFiltersOpenChange: (open: boolean) => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  title: string;
  children: React.ReactNode;
}

/**
 * Layout: web = filters in left sidebar (div); mobile = Filters button opens Sheet with filters.
 */
export function ProductsLayout({
  filters,
  filtersOpen,
  onFiltersOpenChange,
  hasActiveFilters,
  activeFiltersCount,
  title,
  children,
}: ProductsLayoutProps) {
  return (
    <section className="py-8 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Web: left sidebar — filters as div, never in sheet */}
          <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 pr-6">
            {filters}
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {title}
              </h1>
              {/* Mobile only: Filters button opens Sheet */}
              <Sheet open={filtersOpen} onOpenChange={onFiltersOpenChange}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "lg:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-md",
                      "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    )}
                  >
                    <SlidersHorizontal className="size-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="bg-blue-600 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[280px] sm:w-[320px] flex flex-col"
                >
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto -mx-2 px-2">
                    {filters}
                  </div>
                  <SheetFooter>
                    <button
                      type="button"
                      onClick={() => onFiltersOpenChange(false)}
                      className="w-full py-2.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Done
                    </button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
