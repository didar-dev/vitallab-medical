import type { Route } from "./+types/home";
import { Briefcase, Shield, HeadphonesIcon, DollarSign } from "lucide-react";

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

export default function Home() {
  return (
    <>
      <section
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/backgrounds/home-hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className=" text-white py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6">
              Welcome to VitalLab Medical
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100">
              Advanced healthcare solutions for better patient outcomes
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Us?
            </h2>
            <ul className="flex flex-col md:flex-row gap-4">
              {[
                {
                  title: "PROFESSIONAL",
                  description:
                    "Our seasoned healthcare specialists bring decades of combined expertise, delivering tailored medical solutions that address your unique healthcare needs with precision and care.",
                  icon: Briefcase,
                  bgClasses: "from-blue-50 to-blue-100",
                  borderClass: "border-blue-500",
                  iconColor: "text-blue-600",
                  delay: "0s",
                },
                {
                  title: "QUALITY",
                  description:
                    "Rigorous standards and continuous monitoring ensure that each medical service we deliver meets the highest benchmarks of excellence and patient safety protocols.",
                  icon: Shield,
                  bgClasses: "from-green-50 to-green-100",
                  borderClass: "border-green-500",
                  iconColor: "text-green-600",
                  delay: "0.1s",
                },
                {
                  title: "SERVICE",
                  description:
                    "Our dedicated support specialists are available around the clock to assist with inquiries, provide guidance, and ensure your healthcare journey is smooth and worry-free.",
                  icon: HeadphonesIcon,
                  bgClasses: "from-purple-50 to-purple-100",
                  borderClass: "border-purple-500",
                  iconColor: "text-purple-600",
                  delay: "0.2s",
                },
                {
                  title: "PRICE",
                  description:
                    "With state-of-the-art facilities and efficient operations, we offer transparent, competitive pricing without compromising on the quality of medical care you receive.",
                  icon: DollarSign,
                  bgClasses: "from-orange-50 to-orange-100",
                  borderClass: "border-orange-500",
                  iconColor: "text-orange-600",
                  delay: "0.3s",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={index}
                    className={`bg-linear-to-r ${item.bgClasses} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 ${item.borderClass} animate-fade-in`}
                    style={{ animationDelay: item.delay }}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <Icon className={`w-8 h-8 ${item.iconColor}`} />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
