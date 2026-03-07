import { useState, useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Certifications.module.css";

/* ═══════════════════════════════════════════════════════
   MOCK CERTIFICATION DATA (Replace with real data)
   ═══════════════════════════════════════════════════════ */
const CERTIFICATIONS = [
    {
        id: "cert-aws",
        title: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        year: "2024",
        logo: "☁️", // Replace with actual logo URL or SVG later
        image: "https://placehold.co/600x400/121216/7df9ff?text=AWS+Certificate",
        description: "Validates technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
        credentialId: "AWS-123456",
        link: "#"
    },
    {
        id: "cert-ml",
        title: "Machine Learning Specialization",
        organization: "DeepLearning.AI / Stanford",
        year: "2023",
        logo: "🧠",
        image: "https://placehold.co/600x400/121216/7df9ff?text=ML+Certificate",
        description: "Comprehensive study of foundational machine learning algorithms, deep learning, and best practices in building AI models.",
        credentialId: "DL-789012",
        link: "#"
    },
    {
        id: "cert-meta",
        title: "Meta Front-End Developer",
        organization: "Meta",
        year: "2023",
        logo: "🌐",
        image: "https://placehold.co/600x400/121216/7df9ff?text=Meta+Certificate",
        description: "Professional certification covering advanced React, UI/UX principles, and robust front-end architecture.",
        credentialId: "META-345678",
        link: "#"
    },
    {
        id: "cert-google",
        title: "Google Cloud Data Engineer",
        organization: "Google Cloud",
        year: "2024",
        logo: "📈",
        image: "https://placehold.co/600x400/121216/7df9ff?text=GCP+Certificate",
        description: "Expertise in designing, building, and operationalizing data processing systems and machine learning models on GCP.",
        credentialId: "GCP-901234",
        link: "#"
    },
    // Duplicate a few for a smoother marquee effect if the list is short
    {
        id: "cert-docker",
        title: "Docker Certified Associate",
        organization: "Docker",
        year: "2022",
        logo: "🐳",
        image: "https://placehold.co/600x400/121216/7df9ff?text=Docker+Certificate",
        description: "Proficiency in containerization, orchestration, and deploying scalable microservices architectures.",
        credentialId: "DCA-567890",
        link: "#"
    }
];

// Combine arrays to ensure enough content for smooth infinite scrolling
const MARQUEE_ITEMS = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS];

function Certifications() {
    const [selectedCert, setSelectedCert] = useState(null);
    const scrollRef = useRef(null);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeModal();
        };
        if (selectedCert) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [selectedCert]);

    const openModal = (cert, e) => {
        e.preventDefault();
        setSelectedCert(cert);
    };

    const closeModal = () => {
        setSelectedCert(null);
    };

    return (
        <section className={styles.certSection} id="certifications">
            {/* Background elements */}
            <div className={styles.gridBg}>
                <GridLines size={40} opacity={0.15} thickness={1} maskType="linear" />
            </div>
            <div className={styles.ambientGlow} aria-hidden="true" />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.sectionHeader}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        CREDENTIALS
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading}>Certifications</h2>
                    <p className={styles.sectionSub}>
                        Professional certifications and technical credentials that strengthen my expertise in AI, software engineering, and emerging technologies.
                    </p>
                </div>

                {/* Marquee Track */}
                <div className={styles.marqueeWrapper}>
                    {/* Subtle gradient fades on edges */}
                    <div className={`${styles.fade} ${styles.fadeLeft}`}></div>
                    <div className={`${styles.fade} ${styles.fadeRight}`}></div>

                    <div className={styles.marqueeContainer} ref={scrollRef}>
                        <div className={styles.marqueeTrack}>
                            {MARQUEE_ITEMS.map((cert, index) => (
                                <button
                                    key={`${cert.id}-${index}`}
                                    className={styles.certCard}
                                    onClick={(e) => openModal(cert, e)}
                                    aria-label={`View details for ${cert.title}`}
                                >
                                    <div className={styles.cardGlow}></div>
                                    <div className={styles.cardImageWrap}>
                                        <img src={cert.image} alt={cert.title} className={styles.cardImage} loading="lazy" />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardTop}>
                                            <div className={styles.logoWrap}>
                                                <span className={styles.logoIcon}>{cert.logo}</span>
                                            </div>
                                            <span className={styles.certYear}>{cert.year}</span>
                                        </div>
                                        <div className={styles.cardMiddle}>
                                            <h3 className={styles.certTitle}>{cert.title}</h3>
                                            <p className={styles.certOrg}>{cert.organization}</p>
                                        </div>
                                        <div className={styles.cardBottom}>
                                            <span className={styles.viewLink}>View Details <span className={styles.arrow}>↗</span></span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Modal Overlay */}
            {selectedCert && (
                <div className={styles.modalOverlay} onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeModal} aria-label="Close modal">
                            ✕
                        </button>

                        <div className={styles.modalImageWrap}>
                            <img src={selectedCert.image} alt={selectedCert.title} className={styles.modalImage} />
                        </div>

                        <div className={styles.modalHeader}>
                            <div className={styles.modalLogo}>{selectedCert.logo}</div>
                            <div className={styles.modalTitleGroup}>
                                <h3 id="modal-title" className={styles.modalTitle}>{selectedCert.title}</h3>
                                <p className={styles.modalOrg}>{selectedCert.organization}</p>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.metaData}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Date Issued</span>
                                    <span className={styles.metaValue}>{selectedCert.year}</span>
                                </div>
                                {selectedCert.credentialId && (
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Credential ID</span>
                                        <span className={styles.metaValue}>{selectedCert.credentialId}</span>
                                    </div>
                                )}
                            </div>

                            <p className={styles.modalDesc}>{selectedCert.description}</p>
                        </div>

                        <div className={styles.modalFooter}>
                            <a href={selectedCert.link} target="_blank" rel="noopener noreferrer" className={styles.credentialBtn}>
                                Verify Credential <span className={styles.btnIcon}>↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Certifications;
