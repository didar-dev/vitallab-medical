import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                aria-label="Home page"
                onClick={closeMenu}
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

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
                {pages.map((page) => (
                  <Link
                    to={page.path}
                    className="nav-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none"
                    onClick={closeMenu}
                    key={page.path}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
