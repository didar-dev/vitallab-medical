import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import type { Category } from "~/lib/categories";

export function Navbar({ categories }: { categories: Category[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Products",
      path: "/products",
      isDropdown: true,
    },
    {
      name: "News & Events",
      path: "/news",
    },
    {
      name: "Knowledge & Education",
      path: "/knowledge",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`bg-white transition-shadow duration-300 ${
          isScrolled ? "border-b border-gray-200 shadow-md" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto w-[95%] lg:w-full">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                aria-label="Home page"
              >
                <img
                  src="/logo.webp"
                  alt="VitalLab Medical"
                  className="h-16 lg:h-16 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul
              className="hidden md:flex space-x-2 lg:space-x-4 items-center"
              role="list"
            >
              {navigationItems.map((item) => (
                <li key={item.path}>
                  {item.isDropdown ? (
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <button className="nav-link text-gray-700 hover:text-gray-900 px-2 text-sm font-medium transition-colors focus:outline-none cursor-pointer flex items-center gap-1">
                          {item.name}
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-[800px] p-6" align="start">
                        <div className="grid grid-cols-3 gap-6">
                          {categories?.length > 0 &&
                            categories.map((category) => (
                              <div key={category.id} className="space-y-2">
                                <h3 className="font-semibold text-sm text-gray-900 mb-2">
                                  {category.name}
                                </h3>
                                <ul className="space-y-1">
                                  {category.subCategories.map((subCategory) => (
                                    <li key={subCategory.id}>
                                      <Link
                                        to={`/products?category=${subCategory.id}`}
                                        className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors block py-1"
                                      >
                                        {subCategory.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <Link
                      to={item.path}
                      className="nav-link text-gray-700 hover:text-gray-900 px-2 text-sm font-medium transition-colors focus:outline-none"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                  aria-label="Toggle navigation menu"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[280px] sm:w-[350px] overflow-y-auto"
              >
                <nav className="flex flex-col gap-2 mt-6 pb-6">
                  {navigationItems.map((item) => (
                    <div key={item.path}>
                      {item.isDropdown ? (
                        <div>
                          <button
                            onClick={() => setProductsOpen(!productsOpen)}
                            className="w-full text-left text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors focus:outline-none flex items-center justify-between"
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                productsOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {productsOpen && (
                            <div className="mt-2 ml-4 space-y-4">
                              {categories?.length > 0 &&
                                categories.map((category) => (
                                  <div key={category.id} className="space-y-2">
                                    <h3 className="font-semibold text-sm text-gray-900 px-4">
                                      {category.name}
                                    </h3>
                                    <ul className="space-y-1">
                                      {category.subCategories.map(
                                        (subCategory) => (
                                          <li key={subCategory.id}>
                                            <Link
                                              to={`/products?category=${subCategory.id}`}
                                              className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-4 py-1.5 rounded-md transition-colors"
                                              onClick={() => setIsOpen(false)}
                                            >
                                              {subCategory.name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className="text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors focus:outline-none block"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
