import { useState, useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Certifications.module.css";
import GoogleCert from "../../assets/Google-certification.png";

/* ═══════════════════════════════════════════════════════
   BRAND SVG ICONS
   ═══════════════════════════════════════════════════════ */
const AwsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.61 10.95c-.38-.28-1.15-.65-2.06-.65-.7 0-1.42.23-1.89.65-.41.36-.67.89-.67 1.54 0 1.25 1.05 1.75 2.5 2.14 1.83.47 2.87 1.23 2.87 2.68 0 .84-.36 1.63-1.04 2.15-.69.53-1.74.83-2.88.83-1.32 0-2.45-.37-2.94-.65l.59-1.6c.47.28 1.41.72 2.45.72.63 0 1.34-.18 1.81-.55.43-.33.68-.83.68-1.41 0-1.12-1.02-1.61-2.45-2.01-1.72-.47-2.91-1.15-2.91-2.76 0-.85.34-1.65.98-2.22.68-.58 1.7-.87 2.82-.87 1.13 0 2.03.3 2.52.56l-.58 1.48zm2.49 9.17v-8.08h2.09l1.83 5.4 1.87-5.4h2.03v8.08h-1.63v-5.65l-1.93 5.37h-.82l-1.87-5.5v5.78h-1.57zm-14.86.03c.51.57 1.3.88 2.22.88 1.4 0 2.37-.8 2.83-1.59l4.58-13.78h-1.85l-.75 2.64h-3.32l-1.02-2.64H2.8l4.08 11.5c-1.35 1.14-3.14 1.52-5.47 1.25l.83 1.74zm5.12-4.04H4.63l1.35-3.51c.32-.87.5-1.43.5-1.43s.19.63.48 1.43l1.4 3.51zm9.95.83c.96-1.56.96-3.8.96-3.8s-.01-5.74-.01-5.74h-1.76v5.86c0 1.28-.15 2.06-1.2 2.06-1.02 0-1.25-.8-1.25-2.09v-5.83h-1.73v6.05c0 1.28.32 2.32.96 2.92.59.56 1.42.84 2.3.84.85 0 1.48-.15 1.73-.27zm-7.68-7.8c0-3.6-1.03-5.59-4.22-5.59-3.26 0-4.32 1.99-4.32 5.59 0 3.65 1.05 5.6 4.3 5.6 3.19 0 4.24-1.95 4.24-5.6zM8.99 22.46c2.81 0 4.69-1.86 4.69-4.8 0-3.36-1.78-4.9-5.11-4.9s-5.17 1.52-5.17 4.9 c0 2.83 2 4.8 5.59 4.8zm9.58 1.5c-4.43 0-8.23-1.67-10.74-4.24l1.31-1.35c2.19 2.28 5.41 3.62 9.07 3.62 3.84 0 7.23-1.5 9.4-3.95l1.35 1.26c-2.41 2.76-6.14 4.66-10.39 4.66z" />
    </svg>
);

const MetaIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.427 15.345c-.328-.567-1.121-1.328-2.612-1.328s-4.26-.062-5.125-1.5c-1.125-1.874 1.155-4.467.575-5.312C14.654 6.305 12.827 6 12 6s-2.654.305-3.265 1.205c-.58.845 1.7 3.438.575 5.312-.865 1.438-3.634 1.5-5.125 1.5S1.901 14.778 1.573 15.345c-.417.72 1.95 5.064 5.289 6.273 1.636.593 3.623-1.577 5.138-1.577s3.502 2.17 5.138 1.577c3.339-1.209 5.706-5.553 5.289-6.273zm-10.427-4.42c1.789 0 3.238 1.45 3.238 3.238 0 1.789-1.45 3.238-3.238 3.238-1.789 0-3.238-1.45-3.238-3.238 0-1.789 1.45-3.238 3.238-3.238z" />
        <path d="M12 10.925a3.238 3.238 0 1 0 0 6.476 3.238 3.238 0 0 0 0-6.476z" />
    </svg>
);

const GoogleCloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.38 10.94h-2.12v-.03h-3.41v.03H12V8.46h6.85c-.93-2.58-3.4-4.52-6.52-4.52-3.8 0-6.88 3.12-6.88 6.96 0 3.84 3.08 6.96 6.88 6.96 2.05 0 3.9-.92 5.15-2.39l1.83 1.85c-1.8 1.83-4.27 2.97-6.98 2.97-5.32 0-9.64-4.36-9.64-9.75S7.01 1.25 12.33 1.25c4.77 0 8.74 3.47 9.53 8.04l.52 1.65z" />
        <path d="M24 16h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z" />
    </svg>
);

const DockerIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.072 10.057c-.118-.046-1.579-.64-3.197-.101-.634-1.266-2.102-1.374-2.102-1.374-.15-.818-1.127-.751-1.127-.751-.83-.027-1.341.691-1.341.691-.12.441-.124.908-.106 1.345-2.002.502-3.149.52-5.748.24-2.548-.275-5.236-1.312-5.236-1.312C2.083 7.854 1.328 6.079 1.328 6.079c-.066.3-.066.6-.008.9 0 0 .194 2.146.726 3.654.545 1.547 1.624 2.871 2.652 4.01a11.166 11.166 0 0 0 6.645 3.428v.006c.465.045.938.077 1.41.077 5.625 0 10.293-4.39 10.493-9.967a.417.417 0 0 0-.11-.274.453.453 0 0 0-.256-.123zM9.516 14.852c-.93 0-1.68-.748-1.68-1.676s.75-1.676 1.68-1.676 1.68.748 1.68 1.676-.75 1.676-1.68 1.676z" />
    </svg>
);

const StanfordIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h8v8" />
        <path d="M14 2L6 10" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="12" height="11" rx="2" />
        <path d="M5 1v3M11 1v3M2 7h12" />
    </svg>
);

const KeyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="5.5" r="3.5" />
        <path d="M8 8l-5 5M5 11l2 2" />
    </svg>
);

/* ═══════════════════════════════════════════════════════
   CERTIFICATION DATA
   ═══════════════════════════════════════════════════════ */
const CERTIFICATIONS = [
    {
        id: "cert-google-gen-ai",
        title: "Google Generative AI",
        organization: "Google Cloud",
        issueDate: "Sep 2024",
        year: "2024",
        logo: <GoogleCloudIcon />,
        color: "#4285F4",
        image: GoogleCert,
        description: "Comprehensive certification in Generative AI technology, covering LLMs, diffusion models, and responsible AI implementation within Google Cloud.",
        credentialId: "G-AID-1024",
        link: "#"
    },
    {
        id: "cert-aws",
        title: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        issueDate: "Jun 2024",
        year: "2024",
        logo: <AwsIcon />,
        color: "#FF9900",
        image: "https://placehold.co/600x400/121216/FF9900?text=AWS+Certificate",
        description: "Validates technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
        credentialId: "AWS-123456",
        link: "#"
    },
    {
        id: "cert-ml",
        title: "Machine Learning Specialization",
        organization: "DeepLearning.AI / Stanford",
        issueDate: "Nov 2023",
        year: "2023",
        logo: <StanfordIcon />,
        color: "#F92672",
        image: "https://placehold.co/600x400/121216/F92672?text=ML+Certificate",
        description: "Comprehensive study of foundational machine learning algorithms, deep learning, and best practices in building AI models.",
        credentialId: "DL-789012",
        link: "#"
    },
    {
        id: "cert-meta",
        title: "Meta Front-End Developer",
        organization: "Meta",
        issueDate: "Aug 2023",
        year: "2023",
        logo: <MetaIcon />,
        color: "#0668E1",
        image: "https://placehold.co/600x400/121216/0668E1?text=Meta+Certificate",
        description: "Professional certification covering advanced React, UI/UX principles, and robust front-end architecture.",
        credentialId: "META-345678",
        link: "#"
    },
    {
        id: "cert-google",
        title: "Google Cloud Data Engineer",
        organization: "Google Cloud",
        issueDate: "Mar 2024",
        year: "2024",
        logo: <GoogleCloudIcon />,
        color: "#4285F4",
        image: "https://placehold.co/600x400/121216/4285F4?text=GCP+Certificate",
        description: "Expertise in designing, building, and operationalizing data processing systems and machine learning models on GCP.",
        credentialId: "GCP-901234",
        link: "#"
    },
    {
        id: "cert-docker",
        title: "Docker Certified Associate",
        organization: "Docker",
        issueDate: "Dec 2022",
        year: "2022",
        logo: <DockerIcon />,
        color: "#2496ED",
        image: "https://placehold.co/600x400/121216/2496ED?text=Docker+Certificate",
        description: "Proficiency in containerization, orchestration, and deploying scalable microservices architectures.",
        credentialId: "DCA-567890",
        link: "#"
    }
];

/* ═══════════════════════════════════════════════════════
   useScrollReveal — lightweight intersection observer
   Adds a CSS class when elements scroll into view
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
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
   CertificationCard
   ═══════════════════════════════════════════════════════ */
function CertificationCard({ data, onOpenModal, refCallback, revealDelay }) {
    return (
        <article
            className={styles.card}
            ref={refCallback}
            style={{ transitionDelay: `${revealDelay}ms`, '--brand-color': data.color }}
            tabIndex={0}
            aria-label={`Certification: ${data.title}`}
            onClick={(e) => onOpenModal(data, e)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenModal(data, e); } }}
        >
            {/* ── Top accent glow line ── */}
            <div className={styles.cardAccent} aria-hidden="true" />

            {/* ── Header: icon + org + year ── */}
            <div className={styles.cardHeader}>
                <div className={styles.iconWrap} aria-hidden="true">
                    <span className={styles.iconSvg}>{data.logo}</span>
                </div>
                <div className={styles.headerMeta}>
                    <span className={styles.orgName}>{data.organization}</span>
                    <span className={styles.yearBadge}>{data.year}</span>
                </div>
            </div>

            {/* ── Title ── */}
            <h3 className={styles.cardTitle}>{data.title}</h3>

            {/* ── Description ── */}
            <p className={styles.cardDesc}>{data.description}</p>

            {/* ── Metadata row ── */}
            <div className={styles.metaRow}>
                {data.issueDate && (
                    <div className={styles.metaChip}>
                        <CalendarIcon />
                        <span>{data.issueDate}</span>
                    </div>
                )}
                {data.credentialId && (
                    <div className={styles.metaChip}>
                        <KeyIcon />
                        <span>{data.credentialId}</span>
                    </div>
                )}
            </div>

            {/* ── Footer ── */}
            <div className={styles.cardFooter}>
                <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.verifyLink}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Verify ${data.title} credential`}
                >
                    Verify Credential <ExternalLinkIcon />
                </a>
            </div>
        </article>
    );
}

/* ═══════════════════════════════════════════════════════
   Certifications — main section
   ═══════════════════════════════════════════════════════ */
function Certifications() {
    const [selectedCert, setSelectedCert] = useState(null);
    const setRef = useScrollReveal();
    let refIndex = 0;

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeModal();
        };
        if (selectedCert) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
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
        <section className={styles.certSection} id="certifications" aria-labelledby="cert-heading">
            {/* Background elements */}
            <div className={styles.gridBg}>
                <GridLines size={40} opacity={0.15} thickness={1} maskType="linear" />
            </div>
            <div className={styles.ambientGlow} aria-hidden="true" />

            <div className={styles.container}>
                {/* ── Header ── */}
                <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        CREDENTIALS
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="cert-heading">Certifications</h2>
                    <p className={styles.sectionSub}>
                        Professional certifications and technical credentials that strengthen my expertise in AI, software engineering, and emerging technologies.
                    </p>
                </div>

                {/* ── Grid ── */}
                <div className={styles.grid}>
                    {CERTIFICATIONS.map((cert, i) => (
                        <CertificationCard
                            key={cert.id}
                            data={cert}
                            onOpenModal={openModal}
                            refCallback={setRef(refIndex++)}
                            revealDelay={i * 80}
                        />
                    ))}
                </div>
            </div>

            {/* ═══════════ Detail Modal ═══════════ */}
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
                            <div className={styles.modalLogo} style={{ color: selectedCert.color, borderColor: selectedCert.color }}>{selectedCert.logo}</div>
                            <div className={styles.modalTitleGroup}>
                                <h3 id="modal-title" className={styles.modalTitle}>{selectedCert.title}</h3>
                                <p className={styles.modalOrg} style={{ color: selectedCert.color }}>{selectedCert.organization}</p>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.metaData}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Date Issued</span>
                                    <span className={styles.metaValue}>{selectedCert.issueDate || selectedCert.year}</span>
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
