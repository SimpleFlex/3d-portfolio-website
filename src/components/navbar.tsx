import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

type NavbarProps = {
  hide: boolean;
};

// Navbar
export const Navbar = ({ hide }: NavbarProps) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          setIsScrolled(scrollPos > 10);

          if (scrollPos < 100) {
            setActive("");
          } else {
            const offset = scrollPos + 200;
            for (const link of NAV_LINKS) {
              const section = document.getElementById(link.id);
              if (section) {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                if (offset >= top && offset < bottom) {
                  setActive(link.title);
                  break;
                }
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = useCallback(() => {
    setActive("");
    setToggle(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleMobileMenuToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setToggle((prev) => !prev);
  }, []);

  const handleMobileLinkClick = useCallback(
    (linkTitle: string, hasLink: boolean) => {
      if (!hasLink) {
        setActive(linkTitle);
      }
      setToggle(false);
    },
    []
  );

  // Close menu when clicking outside
  useEffect(() => {
    if (!toggle) return;

    const handleClickOutside = () => {
      setToggle(false);
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggle]);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300",
        isScrolled || hide
          ? "mt-0 bg-primary/95 backdrop-blur-sm shadow-lg"
          : "mt-0 sm:mt-20 bg-primary"
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group z-50"
          onClick={handleLogoClick}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-9 h-9 object-contain transition-transform group-hover:scale-110"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Primo.&nbsp;<span className="sm:block hidden">Eth</span>
          </p>
        </Link>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {NAV_LINKS.map((link) => (
            <li
              key={link.id}
              className="relative cursor-pointer text-[18px] font-medium transition-all"
              onClick={() => !link.link && setActive(link.title)}
            >
              {link.link ? (
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    active === link.title ? "text-white" : "text-secondary",
                    "hover:text-white transition-colors duration-200"
                  )}
                >
                  {link.title}
                </a>
              ) : (
                <a
                  href={`#${link.id}`}
                  className={cn(
                    active === link.title ? "text-white" : "text-secondary",
                    "hover:text-white transition-colors duration-200"
                  )}
                >
                  {link.title}
                </a>
              )}
              {/* Active indicator line */}
              {active === link.title && (
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#915eff] to-[#7a4aff] rounded-full"></span>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={handleMobileMenuToggle}
            className="w-[28px] h-[28px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <img
              src={toggle ? close : menu}
              alt="Menu"
              className="w-full h-full object-contain"
            />
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            className={cn(
              "absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl transition-all duration-300",
              toggle
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            <div className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16162a] backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl">
              <ul className="list-none flex justify-end items-start flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.id}
                    className="relative font-poppins font-medium text-[16px] cursor-pointer"
                    onClick={() =>
                      handleMobileLinkClick(link.title, !!link.link)
                    }
                  >
                    {link.link ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cn(
                          active === link.title
                            ? "text-white"
                            : "text-secondary",
                          "hover:text-white transition-colors duration-200"
                        )}
                      >
                        {link.title}
                      </a>
                    ) : (
                      <a
                        href={`#${link.id}`}
                        className={cn(
                          active === link.title
                            ? "text-white"
                            : "text-secondary",
                          "hover:text-white transition-colors duration-200"
                        )}
                      >
                        {link.title}
                      </a>
                    )}
                    {/* Active indicator line */}
                    {active === link.title && (
                      <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#915eff] to-[#7a4aff] rounded-full"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
