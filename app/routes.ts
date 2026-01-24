import { route, index, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("products", "routes/products/layout.tsx", [
    index("routes/products/index.tsx"),
  ]),
] satisfies RouteConfig;
