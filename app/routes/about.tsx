import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - VitalLab Medical" },
    {
      name: "description",
      content:
        "Learn about VitalLab Medical and our mission to provide exceptional healthcare services",
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
                About VitalLab Medical
              </h1>
              <p className="text-xl text-gray-600">
                We are a team of experienced healthcare professionals who are
                dedicated to providing exceptional healthcare services that
                prioritize patient well-being and outcomes.
              </p>
            </header>

            <article className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At VitalLab Medical, we are dedicated to providing exceptional
                  healthcare services that prioritize patient well-being and
                  outcomes. Our mission is to deliver accurate, timely, and
                  compassionate medical care through state-of-the-art technology
                  and a team of experienced healthcare professionals.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Our Values
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    <strong>Excellence:</strong> We strive for the highest
                    standards in all our services
                  </li>
                  <li>
                    <strong>Compassion:</strong> Patient care is at the heart of
                    everything we do
                  </li>
                  <li>
                    <strong>Innovation:</strong> We embrace cutting-edge
                    technology to improve healthcare delivery
                  </li>
                  <li>
                    <strong>Integrity:</strong> We maintain the highest ethical
                    standards in all our practices
                  </li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Why Choose Us
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Experienced Team
                    </h3>
                    <p className="text-gray-700">
                      Our healthcare professionals bring years of expertise and
                      dedication to patient care.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Advanced Technology
                    </h3>
                    <p className="text-gray-700">
                      We utilize the latest medical equipment and diagnostic
                      tools for accurate results.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Patient-Centered Care
                    </h3>
                    <p className="text-gray-700">
                      Every patient receives personalized attention and tailored
                      treatment plans.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Convenient Access
                    </h3>
                    <p className="text-gray-700">
                      Easy scheduling and accessible locations to serve our
                      community better.
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
