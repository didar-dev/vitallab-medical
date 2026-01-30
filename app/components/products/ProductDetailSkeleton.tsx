export function ProductDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-200">
      <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-6" />
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="aspect-square max-h-[480px] w-full bg-gray-200 animate-pulse" />
        <div className="p-6 sm:p-8 space-y-3">
          <div className="h-3 w-1/5 bg-gray-200 animate-pulse rounded" />
          <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
