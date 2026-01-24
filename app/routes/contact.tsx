import type { Route } from "./+types/contact";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Contact Us - VitalLab Medical" },
    {
      name: "description",
      content:
        "Get in touch with VitalLab Medical. Email and address for inquiries.",
    },
  ];
}

export default function Contact() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For inquiries, please reach us at:
            </p>
          </header>

          <article className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Email
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <a
                  href="mailto:sales@vitallab-medical.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  sales@vitallab-medical.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Address
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                KAMP HOUSE 124 MIDDLETON ROAD<br />
                MORDEN<br />
                SURREY<br />
                ENGLAND SM4 6RW<br />
              </p>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
}
