import { useEffect, useRef, useState } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Contact.module.css";

/* ═══════════════════════════════════════════════════════
   CONTACT DATA
   ═══════════════════════════════════════════════════════ */
const CONTACT_INFO = [
    {
        icon: "✉️",
        label: "Email",
        value: "rudrakshsachdeva.dev@gmail.com",
        link: "mailto:rudrakshsachdeva.dev@gmail.com",
    },
    {
        icon: "📍",
        label: "Location",
        value: "New Delhi, India",
        link: null,
    },
    {
        icon: "💼",
        label: "LinkedIn",
        value: "linkedin.com/in/rudraksh-sachdeva-a35179326/",
        link: "https://www.linkedin.com/in/rudraksh-sachdeva-a35179326/",
    },
    {
        icon: "⌨️",
        label: "GitHub",
        value: "github.com/Rudrakshsachdev",
        link: "https://github.com/Rudrakshsachdev",
    },
];

const WHATSAPP_NUMBER = "919354712773"; // Replace with actual number
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
                                        <span className={styles.iconEmoji}>{info.icon}</span>
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
                            <span className={styles.btnIcon}>💬</span>
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
