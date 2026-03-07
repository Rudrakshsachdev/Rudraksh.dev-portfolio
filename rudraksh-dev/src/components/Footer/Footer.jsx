import { useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Footer.module.css";

/* ═══════════════════════════════════════════════════════
   FOOTER DATA
   ═══════════════════════════════════════════════════════ */
const QUICK_LINKS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
];

const QUICK_LINKS_2 = [
    { name: "Leadership", href: "#leadership" },
    { name: "Research", href: "#research" },
    { name: "Achievements", href: "#achievements" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
    { name: "GitHub", icon: "⌨️", href: "https://github.com/Rudrakshsachdev" },
    { name: "LinkedIn", icon: "💼", href: "https://www.linkedin.com/in/rudraksh-sachdeva-a35179326/" },
    { name: "Email", icon: "✉️", href: "mailto:rudrakshsachdeva.dev@gmail.com" },
    { name: "WhatsApp", icon: "💬", href: "https://wa.me/919354712773" },
];

/* ═══════════════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════════════ */
function Footer() {
    const footerRef = useRef(null);

    // Handle smooth scroll for quick links
    const handleScroll = (e, href) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className={styles.footer} ref={footerRef}>
            {/* Cinematic Background */}
            <div className={styles.gridBg}>
                <GridLines size={40} opacity={0.05} thickness={1} maskType="linear" />
            </div>
            <div className={styles.glowOverlay} aria-hidden="true" />

            <div className={styles.container}>
                {/* Main Footer Content */}
                <div className={styles.mainContent}>

                    {/* Left Section: Branding & Vision */}
                    <div className={styles.brandBox}>
                        <div className={styles.logoGroup}>
                            <span className={styles.brandName}>RS<span className={styles.accent}>.</span></span>
                            <p className={styles.brandTitle}>Rudraksh Sachdeva</p>
                        </div>
                        <p className={styles.visionText}>
                            Engineering the future through intelligent systems, scalable software, and high-impact AI-driven solutions.
                        </p>
                        <div className={styles.socialBar}>
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className={styles.socialIconBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Center/Right Section: Links Grid */}
                    <div className={styles.linksRegion}>
                        <div className={styles.linksCol}>
                            <h4 className={styles.colLabel}>Sitemap</h4>
                            <ul className={styles.linkStack}>
                                {QUICK_LINKS.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className={styles.footerLink}>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4 className={styles.colLabel}>Explore</h4>
                            <ul className={styles.linkStack}>
                                {QUICK_LINKS_2.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className={styles.footerLink}>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Contact Box */}
                        <div className={styles.contactMiniBox}>
                            <h4 className={styles.colLabel}>Get in Touch</h4>
                            <a href="mailto:rudrakshsachdeva.dev@gmail.com" className={styles.emailCta}>
                                rudrakshsachdeva.dev@gmail.com
                            </a>
                            <p className={styles.locationInfo}>📍 New Delhi, India</p>
                            <button className={styles.backToTop} onClick={scrollToTop}>
                                Back to Top ↑
                            </button>
                        </div>
                    </div>
                </div>

                {/* Massive Background Signature */}
                <div className={styles.megaBrandWrap}>
                    <h2 className={styles.megaBrand}>RUDRAKSH</h2>
                </div>

                {/* Bottom Metadata Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.legalRow}>
                        <span>&copy; {new Date().getFullYear()} RUDRAKSH SACHDEVA</span>
                        <span className={styles.dotSeparator}>•</span>
                        <span>All Rights Reserved</span>
                    </div>
                    <div className={styles.craftedBy}>
                        CRAFTED WITH <span className={styles.heart}></span> BY CODE
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
