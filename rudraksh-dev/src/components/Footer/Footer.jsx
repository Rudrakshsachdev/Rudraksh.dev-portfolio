import { useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Footer.module.css";

/* ═══════════════════════════════════════════════════════
   FOOTER DATA
   ═══════════════════════════════════════════════════════ */
const QUICK_LINKS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Leadership", href: "#leadership" },
    { name: "Research", href: "#research" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
    { name: "GitHub", icon: "⌨️", href: "https://github.com/Rudrakshsachdev" },
    { name: "LinkedIn", icon: "💼", href: "https://www.linkedin.com/in/rudraksh-sachdeva-a35179326/" },
    { name: "Email", icon: "✉️", href: "mailto:rudrakshsachdeva.dev@gmail.com" },
    { name: "WhatsApp", icon: "💬", href: "https://wa.me/919354712773" },
];

const CONTACT_INFO = [
    { label: "Email", value: "rudrakshsachdeva.dev@gmail.com", icon: "✉️" },
    { label: "Location", value: "New Delhi, India", icon: "📍" },
    { label: "Phone", value: "+91 93547 12773", icon: "📞" },
];

/* ═══════════════════════════════════════════════════════
   useScrollReveal
   ═══════════════════════════════════════════════════════ */
function useScrollReveal() {
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
        );

        refs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const setRef = (index) => (el) => {
        refs.current[index] = el;
    };

    return setRef;
}

/* ═══════════════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════════════ */
function Footer() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    // Handle smooth scroll for quick links
    const handleScroll = (e, href) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className={styles.footer}>
            {/* Background layer */}
            <div className={styles.gridBg}>
                <GridLines size={32} opacity={0.08} thickness={1} maskType="linear" />
            </div>

            <div className={styles.container}>
                {/* TOP: 4 Columns */}
                <div className={styles.topSection}>

                    {/* Col 1: Branding */}
                    <div className={styles.col} ref={setRef(refIndex++)}>
                        <div className={styles.brand}>
                            <span className={styles.brandName}>Rudraksh Sachdeva</span>
                            <div className={styles.brandDivider} aria-hidden="true" />
                        </div>
                        <p className={styles.tagline}>
                            Building intelligent systems, scalable software, and AI-driven solutions.
                        </p>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className={styles.col} ref={setRef(refIndex++)}>
                        <h4 className={styles.colTitle}>Quick Links</h4>
                        <ul className={styles.linkList}>
                            {QUICK_LINKS.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={styles.navLink}
                                        onClick={(e) => handleScroll(e, link.href)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Social/Connect */}
                    <div className={styles.col} ref={setRef(refIndex++)}>
                        <h4 className={styles.colTitle}>Connect</h4>
                        <div className={styles.socialGrid}>
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className={styles.socialLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                >
                                    <span className={styles.socialIcon} aria-hidden="true">{social.icon}</span>
                                    <span className={styles.socialName}>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 4: Contact Info */}
                    <div className={styles.col} ref={setRef(refIndex++)}>
                        <h4 className={styles.colTitle}>Contact Info</h4>
                        <ul className={styles.infoList}>
                            {CONTACT_INFO.map((info) => (
                                <li key={info.label} className={styles.infoItem}>
                                    <span className={styles.infoIcon}>{info.icon}</span>
                                    <span className={styles.infoValue}>{info.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* BOTTOM: Bar */}
                <div className={styles.bottomBar} ref={setRef(refIndex++)}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Rudraksh Sachdeva
                    </div>
                    <div className={styles.builtWith}>
                        Built with passion, code, and curiosity.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
