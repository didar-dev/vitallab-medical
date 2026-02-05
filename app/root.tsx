import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import {
  transformCategoriesFromApi,
  type Category,
  type CategoriesApiResponse,
} from "./lib/categories";

import type { Route } from "./+types/root";
import { Navbar } from "./components/Navbar";
import "./app.css";

export async function loader(): Promise<Category[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/items/Categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json: CategoriesApiResponse = await res.json();
  return transformCategoriesFromApi(json);
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Vital Lab" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const categories = useLoaderData<typeof loader>();

  return (
    <>
      <Navbar categories={categories} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer className="container mx-auto border-t py-2 gap-2 border-gray-200 flex flex-col lg:flex-row items-center justify-between">
        <p className="text-gray-900 text-sm">
          © {new Date().getFullYear()} VitalLab Medical. All rights reserved.
        </p>
        {/* <p className="text-sm">
          Developed by{" "}
          <a
            href="https://www.didar.dev"
            className="text-blue-800 hover:text-blue-900 underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Didar.dev
          </a>
        </p> */}
      </footer>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
