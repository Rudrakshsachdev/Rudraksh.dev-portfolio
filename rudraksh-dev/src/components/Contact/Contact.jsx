import { useEffect, useRef, useState } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Contact.module.css";

/* ═══════════════════════════════════════════════════════
   ICONS (SVG)
   ═══════════════════════════════════════════════════════ */
const GithubIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const LinkedinIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const MailIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const PinIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const WhatsappIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
    </svg>
);

/* ═══════════════════════════════════════════════════════
   CONTACT DATA
   ═══════════════════════════════════════════════════════ */
const CONTACT_INFO = [
    {
        icon: <MailIcon />,
        label: "Email",
        value: "rudrakshsachdeva.dev@gmail.com",
        link: "mailto:rudrakshsachdeva.dev@gmail.com",
    },
    {
        icon: <PinIcon />,
        label: "Location",
        value: "New Delhi, India",
        link: null,
    },
    {
        icon: <LinkedinIcon />,
        label: "LinkedIn",
        value: "linkedin.com/in/rudraksh-sachdeva-a35179326/",
        link: "https://www.linkedin.com/in/rudraksh-sachdeva-a35179326/",
    },
    {
        icon: <GithubIcon />,
        label: "GitHub",
        value: "github.com/Rudrakshsachdev",
        link: "https://github.com/Rudrakshsachdev",
    },
];

const WHATSAPP_NUMBER = "919354712773"; // Update with actual number
const PREFILL_MESSAGE = "Hi Rudraksh, I came across your portfolio and would like to connect.";

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
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
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
   Contact Section
   ═══════════════════════════════════════════════════════ */
function Contact() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Submit via WhatsApp
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        // Format the message for WhatsApp
        const text = `Hi Rudraksh, my name is ${name} (${email}).\n\n${message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

        window.open(whatsappUrl, "_blank");
    };

    return (
        <section
            className={styles.contact}
            id="contact"
            aria-labelledby="contact-heading"
        >
            {/* Background */}
            <div className={styles.gridBg}>
                <GridLines size={40} opacity={0.12} thickness={1} maskType="radial" />
            </div>
            <div className={styles.ambientGlow} aria-hidden="true" />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        LET'S CONNECT
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="contact-heading">
                        Get In Touch
                    </h2>
                    <p className={styles.sectionSub}>
                        Have an idea, collaboration, or opportunity in mind? Feel free to reach out.
                    </p>
                </div>

                {/* 2-Column Layout */}
                <div className={styles.contentGrid}>

                    {/* Left: Info & Buttons */}
                    <div className={styles.leftCol} ref={setRef(refIndex++)}>

                        <div className={styles.infoCards}>
                            {CONTACT_INFO.map((info) => (
                                <div key={info.label} className={styles.infoCard}>
                                    <div className={styles.iconWrap}>
                                        <span className={styles.iconSVG}>{info.icon}</span>
                                    </div>
                                    <div className={styles.infoText}>
                                        <span className={styles.infoLabel}>{info.label}</span>
                                        {info.link ? (
                                            <a href={info.link} target="_blank" rel="noopener noreferrer" className={styles.infoValueLink}>
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className={styles.infoValue}>{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL_MESSAGE)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappBtn}
                        >
                            <span className={styles.btnIcon}><WhatsappIcon /></span>
                            Message me on WhatsApp
                        </a>

                    </div>

                    {/* Right: Contact Form */}
                    <div className={styles.rightCol} ref={setRef(refIndex++)}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.formLabel}>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className={styles.input}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    placeholder="How can we collaborate?"
                                    className={styles.textarea}
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Send Message <span className={styles.btnIconRight}>↗</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom CTA Text */}
                <div className={styles.bottomCta} ref={setRef(refIndex++)}>
                    <p>
                        Open to collaborations, research opportunities, and innovative projects.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Contact;
