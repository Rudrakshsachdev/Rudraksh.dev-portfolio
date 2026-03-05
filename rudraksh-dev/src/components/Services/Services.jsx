import { useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Services.module.css";

/* ═══════════════════════════════════════════════════════
   SERVICE DATA — all content kept at module level
   ═══════════════════════════════════════════════════════ */

const SERVICES = [
    {
        icon: "🤖",
        title: "AI & ML Engineering",
        tagline: "Intelligent systems, production-ready",
        description:
            "Design and deploy end-to-end AI systems including recommendation engines, LLM-powered assistants, fine-tuned models, and ML inference pipelines optimised for latency and scale.",
        deliverables: [
            "Custom ML model training & fine-tuning",
            "LLM integration & prompt engineering",
            "Model serving APIs (REST / gRPC)",
            "ML pipeline orchestration",
        ],
    },
    {
        icon: "🌐",
        title: "Full-Stack Web Development",
        tagline: "From pixel to database",
        description:
            "Build modern, high-performance web applications with responsive React frontends, robust Node.js or Django backends, and cloud-ready infrastructure — fully tested and CI/CD-equipped.",
        deliverables: [
            "React / Next.js SPAs & SSR apps",
            "REST & GraphQL API design",
            "PostgreSQL / Supabase data layer",
            "Deployment on AWS, Vercel, or Render",
        ],
    },
    {
        icon: "⚡",
        title: "AI Automation & Intelligent Tools",
        tagline: "Automate the repetitive, amplify the creative",
        description:
            "Design intelligent automation pipelines using AI agents, LLMs, and scripted workflows that eliminate manual overhead and let your team focus on high-value work.",
        deliverables: [
            "AI agent workflows (LangChain, CrewAI)",
            "Browser & API automation scripts",
            "Custom GPT / assistant integrations",
            "Scheduled pipeline orchestration",
        ],
    },
    {
        icon: "📊",
        title: "Data Engineering & Analytics",
        tagline: "Raw data → actionable insight",
        description:
            "End-to-end data engineering — from ingestion and transformation to interactive dashboards. Unify siloed sources and surface insights that drive informed decisions.",
        deliverables: [
            "ETL / ELT pipeline development",
            "Data warehousing & schema design",
            "Analytics dashboards (Plotly, Streamlit)",
            "Automated reporting & alerting",
        ],
    },
    {
        icon: "👁️",
        title: "Computer Vision Systems",
        tagline: "Machines that see and understand",
        description:
            "Develop real-time computer vision solutions for object detection, image classification, OCR, and video analytics — deployable on edge devices or cloud infrastructure.",
        deliverables: [
            "Object detection & segmentation models",
            "OCR & document digitisation",
            "Real-time video analysis pipelines",
            "Edge deployment (ONNX, TensorRT)",
        ],
    },
    {
        icon: "🔌",
        title: "AI API Integrations",
        tagline: "Connect AI to where it matters",
        description:
            "Seamlessly integrate third-party AI APIs — OpenAI, Anthropic, Hugging Face, Replicate, and more — into existing product stacks, with error handling, rate-limiting, and cost controls.",
        deliverables: [
            "OpenAI / Anthropic API integration",
            "Hugging Face & Replicate model calls",
            "Streaming response handling",
            "Usage monitoring & cost dashboards",
        ],
    },
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
                        observer.unobserve(entry.target); /* animate once */
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
   ServiceCard — reusable card component
   ═══════════════════════════════════════════════════════ */
function ServiceCard({ service, refCallback, revealDelay }) {
    return (
        <article
            className={styles.card}
            ref={refCallback}
            style={{ transitionDelay: `${revealDelay}ms` }}
            tabIndex={0}
            aria-label={`Service: ${service.title}`}
        >
            {/* Icon container */}
            <div className={styles.iconWrap} aria-hidden="true">
                <span className={styles.iconEmoji}>{service.icon}</span>
            </div>

            {/* Title */}
            <h3 className={styles.cardTitle}>{service.title}</h3>

            {/* Tagline */}
            <span className={styles.tagline}>{service.tagline}</span>

            {/* Description */}
            <p className={styles.cardDesc}>{service.description}</p>

            {/* Deliverables */}
            <div className={styles.deliverables}>
                <span className={styles.deliverablesLabel}>DELIVERABLES</span>
                <ul className={styles.deliverablesList} role="list">
                    {service.deliverables.map((item) => (
                        <li key={item} className={styles.deliverableItem}>
                            <span className={styles.bullet} aria-hidden="true">▸</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/* ═══════════════════════════════════════════════════════
   Services — main section component
   ═══════════════════════════════════════════════════════ */
function Services() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section className={styles.services} id="services" aria-labelledby="services-heading">
            {/* ── GridLines Background ── */}
            <div className={styles.gridBg}>
                <GridLines size={40} opacity={0.12} maskType="radial" />
            </div>

            <div className={styles.container}>

                {/* ── Section Header ── */}
                <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        SERVICES
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="services-heading">
                        What I Build For You
                    </h2>
                    <p className={styles.sectionSub}>
                        I design and build intelligent systems that combine AI, scalable
                        backend architectures, and high-performance frontend experiences.
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className={styles.grid}>
                    {SERVICES.map((service, i) => (
                        <ServiceCard
                            key={service.title}
                            service={service}
                            refCallback={setRef(refIndex++)}
                            revealDelay={i * 80}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Services;