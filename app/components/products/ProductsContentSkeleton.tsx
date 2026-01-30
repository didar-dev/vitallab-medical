const CARD_COUNT = 8;

export function ProductsContentSkeleton() {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded overflow-hidden"
          >
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-1/4 bg-gray-200 animate-pulse rounded" />
              <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
        <div className="flex items-center gap-1">
          <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
}
