import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
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
            <ul className="hidden md:flex space-x-4 lg:space-x-8" role="list">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="nav-link text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors focus:outline-none"
                  >
                    {page.name}
                  </Link>
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
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col gap-2 mt-6">
                  {pages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors focus:outline-none"
                      onClick={() => setIsOpen(false)}
                    >
                      {page.name}
                    </Link>
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
