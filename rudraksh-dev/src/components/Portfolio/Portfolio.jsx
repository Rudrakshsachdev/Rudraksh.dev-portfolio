import { useEffect, useRef } from "react";
import styles from "./Portfolio.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import ElectricSpotlightCard from "../About/ElectricSpotlightCard";

/* ═══════════════════════════════════════════════════════
   PROJECTS DATA
   ═══════════════════════════════════════════════════════ */

const PROJECTS = [
    {
        icon: "🚗",
        category: "Web Application",
        title: "Travel Professor – Smart Travel Planning Platform",
        description:
            "Travel Professor is a full-stack travel agency platform built with React and Django (Django REST Framework). The application allows users to explore curated travel packages, submit enquiries, book trips, and share reviews, while an integrated admin dashboard enables seamless management of trips, bookings, users, and platform data.",
        duration: "2 months",
        problem:
            "Planning and booking trips often requires users to navigate multiple platforms for discovering destinations, managing bookings, reading reviews, and contacting travel agencies. This fragmented experience makes trip planning inefficient and difficult to manage in a single place.",
        role: "Developed the product end-to-end as a freelance developer, including system architecture implementation, AI chatbot integration, and payment workflow development.",
        impact:
            "Successfully launched the platform, enabling users to plan and book trips seamlessly through a unified interface. The admin dashboard streamlined travel agency operations, improving efficiency and customer experience.",
        tech: ["React", "Django", "REST Framework", "PostgreSQL", "OpenAI API", "Razorpay", "JWT", "Cloudinary", "Vercel", "Render", "Resend", "Stripe", "Tailwind CSS", "Framer Motion", "EmailGrid API"],
        liveUrl: "https://travelprofessor.vercel.app/",
        githubUrl: "https://github.com/Rudrakshsachdev/TravelSource",
        featured: true,
        gradient:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    },
    {
        icon: "🤖",
        category: "AI / ML",
        title: "NeuroParse – AI-Powered Resume Analysis and Optimization Platform",
        description:
            "An AI-powered Django application that parses PDF/DOCX resumes using NLP and regex techniques, extracts candidate information, evaluates profiles through a structured scoring algorithm, and provides AI-driven resume optimization, job matching, and intelligent feedback.",
        duration: "3 months",
        problem:
            "Resume parsing is a time-consuming and error-prone process that requires manual extraction of information from resumes. This can lead to delays in the hiring process and may result in missed opportunities for both candidates and employers.",
        role: "Developed an AI-powered resume analysis platform during my first year as part of my first internship project submission, implementing NLP-based resume parsing, candidate scoring algorithms, and AI-driven feedback for resume optimization and job matching.",
        impact:
            "Successfully launched the platform, enabling users to plan and book trips seamlessly through a unified interface. The admin dashboard streamlined travel agency operations, improving efficiency and customer experience.",
        tech: ["Python", "Django", "NLP", "spaCy","Google Gemini", "Named Entity Recognition(NER)", "Bootstrap", "EmailGrid API"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        gradient:
            "linear-gradient(135deg, #0d1117 0%, #161b22 40%, #1f2937 100%)",
    },
    {
        icon: "🌐",
        category: "AI / ML",
        title: "TriNetra AI – Intelligent AI-Powered Safety & Violence Detection System",
        description:
            "An AI-powered surveillance platform that analyzes live CCTV footage using deep learning models to detect violent behavior in real time. The system integrates computer vision, geolocation tracking, automated emergency alerts, and dynamic safe-route recommendations to create a proactive safety ecosystem designed to enhance women’s safety and public security.",
        duration: "September 2025 – Present",
        problem:
            "Violence against women and children remains a persistent global challenge, with limited real-time intervention capabilities. Traditional security measures often rely on reactive responses rather than proactive prevention, leaving vulnerable populations at risk.",
        role: "Leading the core development of the TriNetra AI safety platform, including system architecture design, AI-based violence detection models, and backend infrastructure. Responsible for developing the computer vision pipeline, integrating geolocation and emergency response workflows, and presenting the project at national-level hackathons where the team secured 2nd place in the “AI/ML for Public Good” category.",
        impact:
            "Secured 2nd place in the “AI/ML for Public Good” category at the SUSTAINATHON 2025, one of India's largest hackathons. The platform was recognized for its innovative approach to public safety and potential impact on women’s security. The project was also selected for presentation at the State-Level Hackathon 2025, further validating its technical merit and societal relevance.",
        tech: ["Computer Vision", "Deep Learning", "AI Survelliance System", "Violence Detection", "Geolocation Tracking", "Risk Scoring System", "Emergency Response System", "Safe Route Recommendations", "CNN/LSTM", "GeoSpatial Analytics", "Django"],
        githubUrl: "#",
        featured: true,
        gradient:
            "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #1e1145 100%)",
    },
    {
        icon: "🛡️",
        category: "AI / ML / IOT",
        title: "AI & IoT-Based Emergency Response System",
        description:
            "An intelligent transportation safety system that uses AI, IoT sensors, and computer vision to predict potential road accidents before they occur. The platform monitors road conditions, traffic patterns, driver behavior, and environmental factors in real time to generate early warnings and prevent accidents. It also enables smart traffic signal control to create green corridors for ambulances and automatically alerts authorities during emergencies. The project was developed and presented by Team Path Predictors at the national-level Hack-Tech Hackathon hosted by Thapar Institute of Engineering and Technology, where we secured 1st place.",
        duration: "Feb 2025 – Present",
        problem: "Road accidents are a major cause of injuries and fatalities due to factors like poor road conditions, reckless driving, traffic congestion, and delayed emergency response. Existing traffic systems mainly provide real-time updates but do not predict or prevent accidents. There is a need for an intelligent system that can analyze real-time data to predict accident risks, provide early warnings, and prioritize emergency vehicles such as ambulances to improve road safety and response time.",
        role: "Led the project development and handled core system architecture, AI/IoT integration, and implementation of major features. Coordinated the team, managed technical decisions, and ensured the successful presentation of the project at the Hack-Tech national-level hackathon.",
        impact: "Secured 1st place in the national-level Hack-Tech hackathon, showcasing the project's innovative approach to road safety and emergency response. The platform was recognized for its potential impact on road safety and emergency response, and was selected for presentation at the State-Level Hackathon 2025, further validating its technical merit and societal relevance.",
        tech: ["Python", "Django", "AI / ML", "IOT", "Computer Vision", "Deep Learning", "Smart Traffic Signal Control", "Ambulance Priority System", "Emergency Response System", "Risk Scoring System", "GeoSpatial Analytics", "Cloud Integration", "GPS Integration", "CNN", "Smart Traffic System"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        gradient:
            "linear-gradient(135deg, #0a192f 0%, #112240 40%, #1d3557 100%)",
    },
    {
        icon: "🎓",
        category: "BACKEND",
        title: "IILM FacultyConnect – Academic Profile & Research Management Portal",
        description:
            "IILM FacultyConnect is a web-based faculty management platform developed using Django that enables faculty members to manage academic profiles and submit research outputs such as journals, books, patents, and projects through structured digital forms. The system includes a role-based review workflow where submissions are evaluated by cluster heads and approved by the dean, ensuring organized and transparent academic record management. Built with Django, Bootstrap, and Cloudinary, the platform supports secure authentication, file storage, and scalable deployment for modern university administration.",
        duration: "3 months",
        problem: "Universities often rely on manual or scattered systems to manage faculty profiles and research submissions, making it difficult to track publications, projects, and academic records efficiently. This leads to delays in review processes and lack of a centralized platform for structured academic data management.",
        role: "Developed the IILM FacultyConnect portal from scratch as a full-stack developer for an institutional project assigned by Dr. Anurag Jain. Designed and implemented the Django-based system, including faculty profile management, research submission modules, and role-based workflows for faculty, cluster heads, and deans.",
        impact: "Provides a centralized digital platform for managing faculty profiles and research submissions, improving transparency, streamlining the review process, and reducing manual administrative work within the university.",
        tech: ["Python", "Django", "Bootstrap", "Cloudinary", "PostgreSQL", "EmailGrid API", "Docker", "JWT", "OAuth2", "Rate Limiting", "Role Based Access Control", "File Storage", "Scalable Deployment", "Modern University Administration", "Secure Authentication", "Modern University Administration"],
        githubUrl: "#",
        featured: true,
        gradient:
            "linear-gradient(135deg, #1b1b2f 0%, #1a1a3e 40%, #252550 100%)",
    },
];

/* ═══════════════════════════════════════════════════════
   useScrollReveal — lightweight intersection observer
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
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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
   Portfolio — main component
   ═══════════════════════════════════════════════════════ */
function Portfolio() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section className={styles.portfolio} id="work">
            {/* ── Section Header ── */}
            <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                <span className={styles.label}>
                    <span className={styles.dot} />
                    PROJECTS
                    <span className={styles.dot} />
                </span>
                <h2 className={styles.sectionHeading}>Selected Work & Experiments</h2>
                <p className={styles.sectionSub}>
                    A collection of projects focused on AI systems, scalable backend
                    architecture, and modern web applications.
                </p>
            </div>

            {/* ── Projects Grid ── */}
            <div className={styles.grid}>
                {PROJECTS.map((project, i) => (
                    <div
                        key={project.title}
                        className={`${styles.gridItem} ${project.featured ? styles.gridItemFeatured : ""}`}
                        ref={setRef(refIndex++)}
                        style={{ transitionDelay: `${i * 0.08}s` }}
                    >
                        <ElectricSpotlightCard
                            color="#7df9ff"
                            speed={0.6}
                            chaos={0.08}
                            borderRadius={24}
                        >
                            <ProjectCard {...project} />
                        </ElectricSpotlightCard>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Portfolio;