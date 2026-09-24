import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const cvBg = scrolled ? "rgba(122, 171, 122, 0.15)" : "rgba(122, 171, 122, 0.55)";
  const cvColor = scrolled ? "var(--accent-light)" : "#111";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span
            className="font-display text-xl font-bold transition-colors duration-500"
            style={{ color: scrolled ? "var(--text)" : "#111" }}
          >
            cuci
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="font-heading text-sm font-semibold tracking-wide transition-colors duration-500 relative py-1"
                style={{
                  color:
                    active === href.slice(1)
                      ? "var(--accent)"
                      : scrolled
                        ? "rgba(240, 237, 232, 0.85)"
                        : "#111",
                  textShadow: scrolled
                    ? "none"
                    : "0 0 12px rgba(255, 255, 255, 0.7)",
                }}
              >
                {label}
                {active === href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Download CV — always green, solid accent on hover */}
        <a
          href="/VLAD_SOIMU_CV.pdf"
          download
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-accent font-heading text-sm font-semibold rounded-sm backdrop-blur-sm transition-all duration-300 group/cv"
          style={{ backgroundColor: cvBg, color: cvColor }}
          onMouseEnter={(e) => (
            (e.currentTarget.style.backgroundColor = "var(--accent)"),
            (e.currentTarget.style.color = "var(--bg)")
          )}
          onMouseLeave={(e) => (
            (e.currentTarget.style.backgroundColor = cvBg),
            (e.currentTarget.style.color = cvColor)
          )}
        >
          Download CV
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ backgroundColor: scrolled ? "var(--text)" : "#111" }}
          />
          <span
            className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            style={{ backgroundColor: scrolled ? "var(--text)" : "#111" }}
          />
          <span
            className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ backgroundColor: scrolled ? "var(--text)" : "#111" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-bg border-t border-border"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/VLAD_SOIMU_CV.pdf"
                  download
                  className="inline-block px-4 py-2 border border-accent text-accent font-heading text-sm rounded-sm"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
