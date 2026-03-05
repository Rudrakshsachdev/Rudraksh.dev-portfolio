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
        category: "AI System",
        title: "NLP-Based Resume Analysis & AI Optimization Platform",
        abstract:
            "An AI-powered application that parses PDF/DOCX resumes using NLP and regex, extracts candidate information, evaluates profiles through a structured scoring algorithm, and provides AI-driven resume optimisation and job matching.",
        tags: ["NLP", "spaCy", "NER", "Google Gemini", "Django"],
        links: {
            project: "#",
        },
    },
    {
        icon: "🔥",
        category: "AI System",
        title: "AI & IoT-Based Firefighter Rover for Hazardous Environments",
        abstract:
            "An intelligent fire detection and firefighting rover equipped with AI and IoT sensors for real-time flame detection, environmental monitoring, and remote operation in dangerous environments inaccessible to humans.",
        tags: ["Robotics", "IoT", "Embedded Systems", "Sensor Fusion", "AI"],
        links: {
            github: "#",
        },
    },
    {
        icon: "🌐",
        category: "Study",
        title: "Scalable Full-Stack Architectures for AI-Integrated Platforms",
        abstract:
            "A study on designing production-grade full-stack applications that seamlessly integrate AI models, examining patterns for ML model serving, real-time inference APIs, and cloud-native deployment strategies.",
        tags: ["React", "Django", "REST", "PostgreSQL", "Cloud", "ML Serving"],
        links: {
            project: "#",
        },
    },
    {
        icon: "⚡",
        category: "AI System",
        title: "Intelligent Automation Pipelines Using AI Agents & LLMs",
        abstract:
            "Exploring the design of intelligent automation workflows using AI agents, LangChain, and LLM orchestration to eliminate manual overhead in repetitive tasks — from browser automation to scheduled pipeline execution.",
        tags: ["LangChain", "CrewAI", "LLM", "Automation", "Python"],
        links: {
            github: "#",
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
