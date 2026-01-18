const SKELETON_BRAND_COUNT = 5;
const SKELETON_PRODUCT_COUNT = 8;

export default function ProductsSkeleton() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Our Products
          </h2>
          <p className="text-gray-600">Explore our collection by brand</p>
        </div>

        {/* Brand Buttons Skeleton */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {Array.from({ length: SKELETON_BRAND_COUNT }).map((_, index) => (
              <div
                key={index}
                className="h-9 w-24 bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        </div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: SKELETON_PRODUCT_COUNT }).map((_, index) => (
            <div key={index} className="bg-white border border-gray-200">
              {/* Image Skeleton */}
              <div className="aspect-square bg-gray-200 animate-pulse" />

              {/* Content Skeleton */}
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
