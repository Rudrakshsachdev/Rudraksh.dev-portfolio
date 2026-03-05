import { useEffect, useRef, useState } from "react";
import GridLines from "../GridLines/GridLines";
import ResearchDetailModal from "./ResearchDetailModal";
import styles from "./Research.module.css";

/* ═══════════════════════════════════════════════════════
   RESEARCH DATA — extended with detail fields
   ═══════════════════════════════════════════════════════ */

const RESEARCH = [
    {
        icon: "🧠",
        category: "Computer Vision & Public Safety AI",
        title:
            "AI-Powered Facial Recognition System for Identifying Missing Children in Crowded Public Spaces",
        abstract:
            "Proposed a facial recognition–based identification framework designed to assist in locating missing children in crowded public environments such as railway stations and large public events. The research outlines an AI-driven surveillance architecture that processes live CCTV feeds, extracts facial features using deep learning models, and matches them against national missing-children databases to generate alerts for authorities. The framework focuses on improving response time, identification accuracy, and building a scalable AI-powered public safety system.",
        problemStatement:
            "Every year, thousands of children go missing in crowded public spaces like railway stations, airports, and large events. Traditional manual search methods are slow, error-prone, and often fail to identify missing children in real time. There is a critical need for an automated, AI-powered identification system that can process live video feeds at scale and provide instant alerts to law enforcement and concerned families.",
        proposedSolution:
            "The proposed system uses a multi-stage AI pipeline: (1) live CCTV feed ingestion and preprocessing, (2) face detection using deep learning models such as MTCNN and RetinaFace, (3) facial feature extraction using FaceNet/ArcFace embeddings, (4) real-time similarity matching against a national missing-children database, and (5) automated alert generation with geolocation tagging for authorities. The architecture is designed to scale across multiple camera feeds with minimal latency.",
        novelty:
            "Unlike traditional surveillance systems that rely on manual monitoring, this framework introduces an end-to-end automated pipeline that combines state-of-the-art facial recognition models with real-time database matching and geospatial alert systems. The research also addresses challenges of scale, lighting variation, and partial occlusion in crowded environments, proposing augmentation techniques and ensemble matching strategies to improve accuracy.",
        conferenceName: null,
        organizationName: null,
        tags: [
            "Computer Vision",
            "Deep Learning",
            "CNN",
            "GeoSpatial",
            "Public Safety AI",
        ],
        links: {
            paper:
                "https://drive.google.com/file/d/1dTO_7IYRrIBIMjjPMt0HgLQz9Za-Avkk/view?usp=sharing",
        },
    },
    {
        icon: "🧬",
        category: "AI in Healthcare / Biomedical Image Analysis",
        title:
            "Deep Learning-Based Biomedical Image Analysis for Lung Cancer Detection",
        abstract:
            "This research explores the application of deep learning techniques for biomedical image analysis, with a specific focus on lung cancer imaging and visualization. The study integrates advanced machine learning models, including Convolutional Neural Networks (CNNs) and Generative Adversarial Networks (GANs), to enhance feature extraction, dataset augmentation, and image interpretation. Lung cancer imaging data sourced from the PLCO cancer screening dataset is analyzed to evaluate the effectiveness of AI-driven approaches in identifying complex patterns within medical images. Additionally, the research leverages the Napari visualization tool to enable interactive exploration and multi-dimensional analysis of biomedical images. Various interpolation techniques are examined to improve the rendering and visualization of lung cancer images, supporting better interpretability of medical imaging data. The findings highlight the potential of combining deep learning, generative modeling, and advanced visualization tools to improve biomedical image analysis and assist researchers and clinicians in developing more effective diagnostic frameworks.",
        problemStatement:
            "Lung cancer remains one of the leading causes of cancer-related deaths globally. Early detection through medical imaging is crucial, but manual interpretation of complex biomedical images is time-intensive, subjective, and often limited by the availability of trained radiologists. There is a growing need for automated, AI-driven analysis tools that can extract meaningful features from lung cancer imaging data, enhance image quality, and support clinicians in diagnostic decision-making.",
        proposedSolution:
            "The research proposes a deep learning framework that combines CNNs for feature extraction and classification with GANs for synthetic data augmentation. The PLCO cancer screening dataset is used for training and evaluation. The Napari visualization tool is integrated for interactive, multi-dimensional exploration of biomedical images. Multiple interpolation techniques are evaluated to improve rendering quality and interpretability of lung cancer images, creating a comprehensive pipeline from raw imaging data to actionable visual insights.",
        novelty:
            "This work uniquely combines deep learning classification (CNN), generative modeling (GAN) for dataset augmentation, and advanced interactive visualization (Napari) into a single integrated framework. The research also evaluates multiple interpolation strategies for biomedical image rendering — an area often overlooked in standard deep learning pipelines — providing practical insights for improving medical image interpretability.",
        conferenceName: null,
        organizationName: null,
        tags: [
            "Deep Learning",
            "CNN",
            "GAN",
            "Computer Vision",
            "Biomedical Image Analysis",
            "Napari Visualization",
            "PLCO Cancer Screening Dataset",
        ],
        links: {
            paper:
                "https://drive.google.com/file/d/1iXoYf21FmXmifkz_kk07bKeq33TsLDow/view?usp=drive_link",
        },
    },
    {
        icon: "📄",
        category:
            "Natural Language Processing (NLP) • AI for Recruitment • Intelligent Automation",
        title:
            "NeuroParse: Intelligent Resume Analysis and Optimization Using NLP and Gemini AI",
        abstract:
            "This research introduces NeuroParse, an AI-powered resume analysis and optimization system designed to improve the efficiency and fairness of modern recruitment processes. The framework leverages Natural Language Processing (NLP) and Google Gemini AI to intelligently parse resumes in multiple formats such as PDF and DOCX, extracting key information including personal details, education, skills, projects, certifications, and professional experience. Unlike traditional keyword-based resume screening tools, NeuroParse focuses on contextual understanding using NLP-based techniques such as tokenization, entity recognition, and rule-based information extraction. The system further incorporates a structured resume scoring algorithm that evaluates candidates across multiple criteria including skill diversity, work experience, project portfolio, and resume completeness. Additionally, an integrated AI chatbot powered by Gemini provides personalized recommendations, resume improvement suggestions, and job-role matching insights. Experimental evaluations demonstrate that the proposed system achieves an overall extraction accuracy of approximately 91.8%, significantly reducing recruiter workload while minimizing bias in candidate evaluation. This research highlights the potential of combining AI-driven automation, intelligent document processing, and conversational AI to create smarter and more efficient recruitment systems.",
        problemStatement:
            "Modern recruitment processes are overwhelmed by the volume of applications. Traditional keyword-matching ATS systems miss context, penalize non-standard formatting, and introduce bias. Manual resume screening is slow and inconsistent. There is a need for intelligent, context-aware resume parsing that goes beyond keywords to truly understand candidate profiles and provide actionable scoring and feedback.",
        proposedSolution:
            "NeuroParse uses a multi-layer approach: (1) document ingestion supporting PDF/DOCX, (2) NLP-based extraction using tokenization, entity recognition, and rule-based patterns via spaCy, (3) a structured scoring algorithm evaluating skill diversity, experience, projects, and completeness, and (4) an AI chatbot powered by Google Gemini for personalized resume improvement suggestions and job-role matching. The system achieves ~91.8% extraction accuracy.",
        novelty:
            "NeuroParse introduces contextual understanding to resume parsing rather than relying on keyword matching. The combination of NLP extraction, structured scoring, and conversational AI feedback in a single platform is novel. The system also addresses recruiter bias by providing objective, algorithm-driven evaluations and transparent scoring breakdowns.",
        conferenceName: null,
        organizationName: null,
        tags: ["NLP", "spaCy", "NER", "Google Gemini", "Django", "Bootstrap"],
        links: {
            paper:
                "https://drive.google.com/file/d/1EFwYdzrS8Y2K9Fbg-kwexIi_YwT8iIyO/view?usp=drive_link",
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
   ResearchCard — clickable to open detail modal
   ═══════════════════════════════════════════════════════ */
function ResearchCard({ data, refCallback, revealDelay, index, onCardClick }) {
    const staggerClass =
        index % 2 === 0 ? styles.staggerUp : styles.staggerDown;

    const handleClick = () => onCardClick(data);
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCardClick(data);
        }
    };

    return (
        <article
            className={`${styles.card} ${staggerClass}`}
            ref={refCallback}
            style={{ transitionDelay: `${revealDelay}ms` }}
            tabIndex={0}
            role="button"
            aria-label={`View details: ${data.title}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
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

                {/* Click hint */}
                <div className={styles.clickHint}>
                    <span className={styles.clickHintText}>Click to view details →</span>
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
    const [selectedResearch, setSelectedResearch] = useState(null);
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
                            onCardClick={setSelectedResearch}
                        />
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedResearch && (
                <ResearchDetailModal
                    data={selectedResearch}
                    onClose={() => setSelectedResearch(null)}
                />
            )}
        </section>
    );
}

export default Research;
