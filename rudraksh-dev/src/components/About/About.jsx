import { useEffect, useRef } from "react";
import styles from "./About.module.css";
import ElectricSpotlightCard from "./ElectricSpotlightCard";
import ShaderAnimation from "./ShaderAnimation";
import { GridScan } from "./GridScan";

/* ═══════════════════════════════════════════════════════
   DATA — cards & timeline kept at module level
   for clean separation from rendering logic
   ═══════════════════════════════════════════════════════ */

const SKILLS = [
  {
    icon: "⚙️",
    title: "AI / ML Engineering",
    pills: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Prompt Engineering"],
  },
  {
    icon: "🖥️",
    title: "Frontend Systems",
    pills: ["React", "Three.js", "Framer Motion", "CSS", "Tailwind CSS", "TypeScript",],
  },
  {
    icon: "🛠️",
    title: "Backend & Infra",
    pills: ["Node.js", "Express", "PostgreSQL", "Django", "Flask", "Supabase"],
  },
  {
    icon: "📐",
    title: "System Design",
    pills: ["Microservices", "REST", "GraphQL", "CI/CD", "AWS", "Azure"],
  },
];

const TIMELINE = [
  {
    year: "2024-2028",
    icon: "🎓",
    role: "Computer Science Undergrad",
    subtitle: "IILM University, Gurugram",
    description:
      "Pursuing Computer Science with a strong focus on AI systems, scalable architectures, and practical software engineering.",
  },
  {
    year: "2025",
    icon: "💡",
    role: "Contributor – GirlScript Summer of Code (GSSoC)",
    subtitle: "Contributor – GirlScript Summer of Code (GSSoC)",
    description:
      "Contributed to open-source projects as part of GirlScript Summer of Code (GSSoC) 2025."
  },
  {
    year: "2025 - PRESENT",
    icon: "🤖",
    role: "Freelance Developer",
    subtitle: "Freelance",
    description:
      "Building custom software solutions for clients, including web applications, automation scripts, and AI-powered tools."
  },
  {
    year: "2025 - PRESENT",
    icon: "🏛️",
    role: "PRESIDENT - AIGNITE CLUB",
    subtitle: "IILM University, Gurugram",
    description:
      "Leading the AI and Machine Learning club at IILM University, organizing events, workshops, and hackathons to promote AI education and innovation."
  },
  {
    year: "2025",
    icon: "🚀",
    role: "Python Developer Intern",
    subtitle: "Internship – ELEVATE LABS",
    description:
      "Worked on backend automation tasks using Python, building efficient scripts, integrating APIs, and optimizing workflows through effective use of data structures and algorithms. Collaborated with developers to maintain code quality, follow best engineering practices, and manage repositories using Git-based version control.",
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Returns a ref callback for indexed elements */
  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  return setRef;
}

/* ═══════════════════════════════════════════════════════
   About — main component
   ═══════════════════════════════════════════════════════ */
function About() {
  const setRef = useScrollReveal();
  let refIndex = 0;

  return (
    <section className={styles.aboutSection} id="about">
      {/* ── GridScan Background ── */}
      <div className={styles.gridScanBg}>
        <GridScan
          enableWebcam={false}
          showPreview={false}
          scanOnClick
          lineThickness={1}
          linesColor="#392e4e"
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          gridScale={0.1}
          lineStyle="solid"
          lineJitter={0.1}
          scanDirection="pingpong"
          scanGlow={0.5}
          scanSoftness={2}
          scanPhaseTaper={0.9}
          scanDuration={2.0}
          scanDelay={2.0}
          noiseIntensity={0.01}
          enablePost={false}
          bloomIntensity={0}
          chromaticAberration={0.002}
        />
      </div>

      <div className={styles.about}>
        {/* ── 1. Section Header ── */}
        <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
          <span className={styles.label}>
            <span className={styles.dot} />
            ABOUT
            <span className={styles.dot} />
          </span>
          <h2 className={styles.sectionHeading}>The Short Version</h2>
        </div>

        {/* ── 2. Description Block ── */}
        <div className={styles.descriptionBlock} ref={setRef(refIndex++)}>
          <p className={styles.descParagraph}>
            I’m Rudraksh, a 2nd-year B.Tech Computer Science and Engineering student focused on{" "}
            <span className={styles.highlight}>Machine Learning</span>,{" "}
            <span className={styles.highlight}>Artificial Intelligence</span>, and{" "}
            <span className={styles.highlight}>Full-Stack Development</span>. I specialize in building{" "}
            <span className={styles.highlight}>production-grade AI systems</span>{" "}
            and scalable full-stack architectures, with a strong emphasis on performance, maintainability, and clean engineering practices.
          </p>

          <p className={styles.descParagraph}>
            My work revolves around system-level thinking—from designing{" "}
            <span className={styles.highlight}>machine learning pipelines</span>{" "}
            and integrating intelligent models to developing responsive, high-performance frontend systems backed by scalable backend infrastructure.
          </p>

          <p className={styles.descParagraph}>
            I have participated in 7+ national-level hackathons, consistently reaching the final rounds, and I’m also a{" "}
            <span className={styles.highlight}>national-level hackathon winner</span>, where my team developed a high-impact technical solution evaluated among top teams across the country. These experiences strengthened my ability to analyze complex problem statements, architect scalable solutions, and deliver production-ready prototypes under tight timelines.
          </p>

          <p className={styles.descParagraph}>
            Alongside hackathons, I have gained practical experience through industry internships and open-source contributions, working on end-to-end application development, model integration, and real-world software engineering practices.
          </p>

          <p className={styles.descParagraph}>
            I continuously strive to deepen my expertise in AI-driven systems, backend architecture, and modern web technologies, and I’m passionate about solving challenging engineering problems while building technology that creates real-world impact.
          </p>

          <p className={styles.descStatement}>
            I don't just write code — I design systems.
          </p>
        </div>

        {/* ── 3. CTA Links ── */}
        <div className={styles.ctaLinks} ref={setRef(refIndex++)}>
          <a href="#work" className={styles.ctaLink}>
            View my work
            <span className={styles.arrow}>→</span>
          </a>
          <a href="#contact" className={styles.ctaLink}>
            Get in touch
            <span className={styles.arrow}>→</span>
          </a>
        </div>

        {/* ── Soft divider ── */}
        <div className={styles.divider} />

        {/* ── Shader Animation Showcase ── */}
        <div className="shaderShowcase" ref={setRef(refIndex++)}>
          <ShaderAnimation />
          <div className="shaderOverlay">
            <span className="shaderOverlayText">Building the Future</span>
          </div>
        </div>

        {/* ── Soft divider ── */}
        <div className={styles.divider} />

        {/* ── 4. What I Work With — Cards Grid ── */}
        <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
          <span className={styles.label}>
            <span className={styles.dot} />
            EXPERTISE
            <span className={styles.dot} />
          </span>
          <h3 className={styles.sectionSubheading}>What I Work With</h3>
        </div>

        <div className={styles.cardsGrid}>
          {SKILLS.map((skill, i) => (
            <ElectricSpotlightCard
              key={skill.title}
              color="#7df9ff"
              speed={0.6}
              chaos={0.08}
              borderRadius={16}
            >
              <div className={styles.card} ref={setRef(refIndex++)}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>{skill.icon}</span>
                  <h4 className={styles.cardTitle}>{skill.title}</h4>
                </div>
                <div className={styles.pillsWrap}>
                  {skill.pills.map((pill) => (
                    <span key={pill} className={styles.pill}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </ElectricSpotlightCard>
          ))}
        </div>

        {/* ── Soft divider ── */}
        <div className={styles.divider} />

        {/* ── 5. My Journey Timeline ── */}
        <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
          <span className={styles.label}>
            <span className={styles.dot} />
            JOURNEY
            <span className={styles.dot} />
          </span>
          <h3 className={styles.sectionSubheading}>My Journey</h3>
        </div>

        <div className={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <ElectricSpotlightCard
              key={item.year}
              color="#7df9ff"
              speed={0.6}
              chaos={0.08}
              borderRadius={16}
            >
              <div className={styles.timelineCard} ref={setRef(refIndex++)}>
                <div className={styles.timelineBadge}>
                  <span className={styles.timelineIcon}>{item.icon}</span>
                  <span className={styles.timelineYear}>{item.year}</span>
                </div>
                <h4 className={styles.timelineRole}>{item.role}</h4>
                <p className={styles.timelineSubtitle}>{item.subtitle}</p>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            </ElectricSpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
