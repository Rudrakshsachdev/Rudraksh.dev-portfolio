import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import resume from "../../assets/rudraksh.dev.pdf";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    /* ── Fade-in on mount ── */
    useEffect(() => {
        const timer = requestAnimationFrame(() => setLoaded(true));
        return () => cancelAnimationFrame(timer);
    }, []);

    /* ── Scroll-based background change ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Lock body scroll when mobile menu is open ── */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Services", href: "#services" },
        { label: "Leadership", href: "#leadership" },
        { label: "Research", href: "#research" },
        { label: "Achievements", href: "#achievements" },
        { label: "Certifications", href: "#certifications" },
        { label: "Journey", href: "#journey" },
        { label: "Contact", href: "#contact" },
    ];

    const headerClasses = [
        styles.navbar,
        scrolled ? styles.scrolled : "",
        loaded ? styles.loaded : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <header className={headerClasses}>
            <div className={styles.inner}>
                {/* ── Brand ── */}
                <a href="#" className={styles.logo} aria-label="Go to homepage">
                    RS<span className={styles.logoDot}>.</span>
                </a>

                {/* ── Desktop nav links ── */}
                <nav className={styles.desktopNav} aria-label="Primary navigation">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className={styles.navLink}>
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* ── Desktop CTA buttons ── */}
                <div className={styles.cta}>
                    <a href={resume} download="Rudraksh_Sachdeva_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.ctaResume}>
                        Resume
                    </a>
                    {/* <a href="#contact" className={styles.ctaContact}>
                        Get in Touch
                    </a> */}
                </div>

                {/* ── Mobile hamburger ── */}
                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                </button>
            </div>

            {/* ── Mobile overlay ── */}
            <div
                className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
                aria-hidden={!menuOpen}
            >
                <nav className={styles.mobileNav} aria-label="Mobile navigation">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={styles.mobileLink}
                            style={{ transitionDelay: `${0.06 * (i + 1)}s` }}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.mobileCta}>
                    <a href={resume} download="Rudraksh_Sachdeva_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.ctaResume} onClick={closeMenu}>
                        Resume
                    </a>
                    <a href="#contact" className={styles.ctaContact} onClick={closeMenu}>
                        Get in Touch
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Navbar;