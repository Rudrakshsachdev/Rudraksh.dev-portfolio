import { useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Research.module.css";

/* ═══════════════════════════════════════════════════════
   RESEARCH DATA
   ═══════════════════════════════════════════════════════ */

const RESEARCH = [
    {
        icon: "🧠",
        category: "Computer Vision & Public Safety AI",
        title: "AI-Powered Facial Recognition System for Identifying Missing Children in Crowded Public Spaces",
        abstract:
            "Proposed a facial recognition–based identification framework designed to assist in locating missing children in crowded public environments such as railway stations and large public events. The research outlines an AI-driven surveillance architecture that processes live CCTV feeds, extracts facial features using deep learning models, and matches them against national missing-children databases to generate alerts for authorities. The framework focuses on improving response time, identification accuracy, and building a scalable AI-powered public safety system.",
        tags: ["Computer Vision", "Deep Learning", "CNN", "GeoSpatial", "Public Safety AI"],
        links: {
            paper: "https://drive.google.com/file/d/1dTO_7IYRrIBIMjjPMt0HgLQz9Za-Avkk/view?usp=sharing",
        },
    },
    {
        icon: "🧬",
        category: "AI in Healthcare / Biomedical Image Analysis",
        title: "Deep Learning-Based Biomedical Image Analysis for Lung Cancer Detection",
        abstract:
            "This research explores the application of deep learning techniques for biomedical image analysis, with a specific focus on lung cancer imaging and visualization. The study integrates advanced machine learning models, including Convolutional Neural Networks (CNNs) and Generative Adversarial Networks (GANs), to enhance feature extraction, dataset augmentation, and image interpretation. Lung cancer imaging data sourced from the PLCO cancer screening dataset is analyzed to evaluate the effectiveness of AI-driven approaches in identifying complex patterns within medical images. Additionally, the research leverages the Napari visualization tool to enable interactive exploration and multi-dimensional analysis of biomedical images. Various interpolation techniques are examined to improve the rendering and visualization of lung cancer images, supporting better interpretability of medical imaging data. The findings highlight the potential of combining deep learning, generative modeling, and advanced visualization tools to improve biomedical image analysis and assist researchers and clinicians in developing more effective diagnostic frameworks.",
        tags: ["Deep Learning", "CNN", "GAN", "Computer Vision", "Biomedical Image Analysis", "Napari Visualization", "PLCO Cancer Screening Dataset"],
        links: {
            paper: "https://drive.google.com/file/d/1iXoYf21FmXmifkz_kk07bKeq33TsLDow/view?usp=drive_link",
        },
    },
    {
        icon: "📄",
        category: "Natural Language Processing (NLP) • AI for Recruitment • Intelligent Automation",
        title: "NeuroParse: Intelligent Resume Analysis and Optimization Using NLP and Gemini AI",
        abstract:
            "This research introduces NeuroParse, an AI-powered resume analysis and optimization system designed to improve the efficiency and fairness of modern recruitment processes. The framework leverages Natural Language Processing (NLP) and Google Gemini AI to intelligently parse resumes in multiple formats such as PDF and DOCX, extracting key information including personal details, education, skills, projects, certifications, and professional experience. Unlike traditional keyword-based resume screening tools, NeuroParse focuses on contextual understanding using NLP-based techniques such as tokenization, entity recognition, and rule-based information extraction. The system further incorporates a structured resume scoring algorithm that evaluates candidates across multiple criteria including skill diversity, work experience, project portfolio, and resume completeness. Additionally, an integrated AI chatbot powered by Gemini provides personalized recommendations, resume improvement suggestions, and job-role matching insights. Experimental evaluations demonstrate that the proposed system achieves an overall extraction accuracy of approximately 91.8%, significantly reducing recruiter workload while minimizing bias in candidate evaluation. This research highlights the potential of combining AI-driven automation, intelligent document processing, and conversational AI to create smarter and more efficient recruitment systems.",
        tags: ["NLP", "spaCy", "NER", "Google Gemini", "Django", "Bootstrap"],
        links: {
            paper: "https://drive.google.com/file/d/1EFwYdzrS8Y2K9Fbg-kwexIi_YwT8iIyO/view?usp=drive_link",
        },
    },
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
            { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
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
   ResearchCard
   ═══════════════════════════════════════════════════════ */
function ResearchCard({ data, refCallback, revealDelay, index }) {
    /* Stagger offset: even cards shift up, odd shift down */
    const staggerClass = index % 2 === 0 ? styles.staggerUp : styles.staggerDown;

    return (
        <article
            className={`${styles.card} ${staggerClass}`}
            ref={refCallback}
            style={{ transitionDelay: `${revealDelay}ms` }}
            tabIndex={0}
            aria-label={`Research: ${data.title}`}
        >
            {/* Left accent bar */}
            <div className={styles.accentBar} aria-hidden="true" />

            {/* Card inner content */}
            <div className={styles.cardInner}>
                {/* Top — icon + category */}
                <div className={styles.cardTop}>
                    <div className={styles.iconWrap} aria-hidden="true">
                        <span className={styles.iconEmoji}>{data.icon}</span>
                    </div>
                    <span className={styles.categoryBadge}>{data.category}</span>
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{data.title}</h3>

                {/* Abstract */}
                <p className={styles.abstract}>{data.abstract}</p>

                {/* Tags */}
                <div className={styles.tagsWrap}>
                    {data.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className={styles.linksRow}>
                    {data.links.paper && (
                        <a
                            href={data.links.paper}
                            className={styles.linkBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.linkIcon}>📑</span> View Paper
                        </a>
                    )}
                    {data.links.project && (
                        <a
                            href={data.links.project}
                            className={styles.linkBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.linkIcon}>🔗</span> View Project
                        </a>
                    )}
                    {data.links.github && (
                        <a
                            href={data.links.github}
                            className={styles.linkBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.linkIcon}>⌨️</span> GitHub
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

/* ═══════════════════════════════════════════════════════
   Research — main section
   ═══════════════════════════════════════════════════════ */
function Research() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section
            className={styles.research}
            id="research"
            aria-labelledby="research-heading"
        >
            {/* Grid Background */}
            <div className={styles.gridBg}>
                <GridLines size={44} opacity={0.08} thickness={1} maskType="radial" />
            </div>

            {/* Ambient diagonal streak */}
            <div className={styles.streak} aria-hidden="true" />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        RESEARCH
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="research-heading">
                        Research &amp; Publications
                    </h2>
                    <p className={styles.sectionSub}>
                        Exploring intelligent systems, AI-driven solutions, and impactful
                        innovations through research and experimentation.
                    </p>
                </div>

                {/* Staggered Grid */}
                <div className={styles.grid}>
                    {RESEARCH.map((item, i) => (
                        <ResearchCard
                            key={item.title}
                            data={item}
                            index={i}
                            refCallback={setRef(refIndex++)}
                            revealDelay={i * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Research;
