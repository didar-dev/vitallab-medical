import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - VitalLab Medical" },
    {
      name: "description",
      content:
        "UK-based global Marketing Authorization Holder providing regulatory and market access support for medical devices and laboratory equipment",
    },
  ];
}

export default function About() {
  return (
    <>
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                About Us
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We are a UK-based, global Marketing Authorization Holder (MAH)
                providing regulatory and market access support for medical
                devices, laboratory equipment, medical consumables, and
                laboratory supplies.
              </p>
            </header>

            <article className="prose prose-lg max-w-none">
              <section className="mb-12">
                <p className="text-gray-700 leading-relaxed mb-4">
                  With several years of experience in the medical and laboratory
                  fields, we bring together regulatory expertise, technical
                  knowledge, and practical industry insight. Our team works
                  closely with manufacturers, distributors, and healthcare
                  partners to ensure products are compliant, safe, and ready for
                  international markets.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We manage the full regulatory lifecycle of healthcare
                  products, supporting our partners from initial authorization
                  and market entry through ongoing compliance, post-market
                  surveillance, and regulatory maintenance.
                </p>
              </section>

            </article>
          </div>
        </div>
      </section>
    </>
  );
}
