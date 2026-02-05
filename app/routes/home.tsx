import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import { Briefcase, Shield, HeadphonesIcon, DollarSign } from "lucide-react";
import ProductsSection from "../components/home/ProductsSection";
import { fetchProductsData, type Product } from "../lib/products";

export async function loader() {
  const { products, brands } = await fetchProductsData();

  const productsByBrand: Record<string, Product[]> = {};
  for (const product of products) {
    if (!productsByBrand[product.brandId]) {
      productsByBrand[product.brandId] = [];
    }
    productsByBrand[product.brandId].push(product);
  }

  return { brands, productsByBrand };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - VitalLab Medical" },
    {
      name: "description",
      content:
        "Welcome to VitalLab Medical - Your trusted partner in healthcare solutions",
    },
  ];
}

const FEATURES = [
  {
    title: "PROFESSIONAL",
    description:
      "Our seasoned healthcare specialists bring decades of combined expertise, delivering tailored medical solutions that address your unique healthcare needs with precision and care.",
    icon: Briefcase,
    iconColor: "text-blue-600",
    delay: "0s",
  },
  {
    title: "QUALITY",
    description:
      "Rigorous standards and continuous monitoring ensure that each medical service we deliver meets the highest benchmarks of excellence and patient safety protocols.",
    icon: Shield,
    iconColor: "text-green-600",
    delay: "0.1s",
  },
  {
    title: "SERVICE",
    description:
      "Our dedicated support specialists are available around the clock to assist with inquiries, provide guidance, and ensure your healthcare journey is smooth and worry-free.",
    icon: HeadphonesIcon,
    iconColor: "text-purple-600",
    delay: "0.2s",
  },
  {
    title: "PRICE",
    description:
      "With state-of-the-art facilities and efficient operations, we offer transparent, competitive pricing without compromising on the quality of medical care you receive.",
    icon: DollarSign,
    iconColor: "text-orange-600",
    delay: "0.3s",
  },
] as const;

export default function Home() {
  const { brands, productsByBrand } = useLoaderData<typeof loader>();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection brands={brands} productsByBrand={productsByBrand} />
    </>
  );
}

function HeroSection() {
  return (
    <section className="container h-[50vh] w-[95%] lg:w-full mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl mt-5 text-white py-20 relative overflow-hidden">
      <img
        src="/assets/backgrounds/home-hero.webp"
        alt="VitalLab Medical"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container h-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl h-full mx-auto text-center flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6">
            Welcome to VitalLab Medical
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-100">
            Advanced healthcare solutions for better patient outcomes
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-16 bg-white lg:min-h-[50vh] lg:h-[50vh] w-[95%] lg:w-full mx-auto">
      <div className="container h-full mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Choose Us?
        </h2>
        <ul className="flex flex-col md:flex-row gap-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <li
                key={index}
                className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-blue-500 animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
