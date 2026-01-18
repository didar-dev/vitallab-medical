import { useState } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  brandId: string;
  categoryId: string;
  createdAt: string;
}

interface Brand {
  id: string;
  name: string;
}

interface ProductsSectionProps {
  brands: Brand[];
  productsByBrand: Record<string, Product[]>;
}

export default function ProductsSection({
  brands,
  productsByBrand,
}: ProductsSectionProps) {
  const [selectedBrandId, setSelectedBrandId] = useState(brands[0]?.id || "");

  const currentProducts = productsByBrand[selectedBrandId] || [];
  const hasBrands = brands.length > 0;
  const hasProducts = currentProducts.length > 0;

  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader />

        {hasBrands && (
          <BrandSelector
            brands={brands}
            selectedBrandId={selectedBrandId}
            onBrandChange={setSelectedBrandId}
          />
        )}

        <ProductsGrid products={currentProducts} hasProducts={hasProducts} />
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Our Products
      </h2>
      <p className="text-gray-600">Explore our collection by brand</p>
    </div>
  );
}

interface BrandSelectorProps {
  brands: Brand[];
  selectedBrandId: string;
  onBrandChange: (brandId: string) => void;
}

function BrandSelector({
  brands,
  selectedBrandId,
  onBrandChange,
}: BrandSelectorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => onBrandChange(brand.id)}
            className={`px-5 py-2 text-sm font-medium border transition-all duration-200 ${
              selectedBrandId === brand.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ProductsGridProps {
  products: Product[];
  hasProducts: boolean;
}

function ProductsGrid({ products, hasProducts }: ProductsGridProps) {
  if (!hasProducts) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No products available for this brand</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          animationDelay={index * 50}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  animationDelay: number;
}

function ProductCard({ product, animationDelay }: ProductCardProps) {
  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div
      className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}
