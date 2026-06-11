import { useState, useEffect } from "react";
import { motion } from "motion/react";
import profileImg from "../imports/profile_anime.png";
import { User, FolderOpen, Twitter, Linkedin, ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", icon: User, id: "about" },
  { label: "Projects", icon: FolderOpen, id: "projects" },
];

const PROJECT_SECTIONS = [
  {
    heading: "Builder",
    subheading: "Things I make.",
    items: [
      { image: "https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?w=120&h=120&fit=crop&auto=format", title: "Ficta", description: "iOS/Android app where children co-create stories with AI through playful word games.", url: "#" },
      { image: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=120&h=120&fit=crop&auto=format", title: "Substack", description: "Writing on parenting, technology, and building things that matter.", url: "#" },
    ],
  },
  {
    heading: "Immigrant",
    subheading: "Helping people land softly.",
    items: [
      { image: "https://images.unsplash.com/photo-1627927518258-b67557570840?w=120&h=120&fit=crop&auto=format", title: "Cambridge New Families Newsletter", description: "A local newsletter for families who just moved — resources, events, and the kind of tips only a neighbor would know.", url: "#" },
    ],
  },
  {
    heading: "Host",
    subheading: "Getting people around a table (or onto the street).",
    items: [
      { image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=120&h=120&fit=crop&auto=format", title: "Annual Block Party", description: "Organizing our neighborhood's yearly block party. Logistics, food, and convincing people to come outside.", url: "#" },
      { image: "https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?w=120&h=120&fit=crop&auto=format", title: "Meal Trains for Neighbors", description: "Coordinating meals for neighbors going through big life moments — new babies, illness, loss.", url: "#" },
      { image: "https://images.unsplash.com/photo-1659690402718-ea07d943fd42?w=120&h=120&fit=crop&auto=format", title: "Hosting Gatherings", description: "Regular dinners at home. The table is usually too small and always full.", url: "#" },
    ],
  },
  {
    heading: "Eater",
    subheading: "Food is my religion.",
    items: [
      { image: "https://images.unsplash.com/photo-1752652013282-c62b75bbcbdc?w=120&h=120&fit=crop&auto=format", title: "Photographs of People Cooking", description: "An ongoing project documenting the quiet intimacy of people in their kitchens.", url: "#" },
    ],
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (label: string, id: string) => {
    setActiveSection(label);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = [
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
    ];
    const observers = sections.map(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(label); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}
    >
      {/* ── Mobile Top Bar ── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: "var(--background)", borderBottom: "1px solid var(--border)" }}
      >
        <button onClick={() => scrollToSection("About", "about")} className="flex items-center gap-3">
          <img src={profileImg} alt="Ying Dong" style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover" }} />
          <span style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}>Ying Dong</span>
        </button>
        <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
        </button>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-[61px] left-0 right-0 z-40 px-6 py-4 flex flex-col gap-2"
          style={{ backgroundColor: "var(--background)", borderBottom: "1px solid var(--border)" }}
        >
          {NAV_LINKS.map(({ label, icon: Icon, id }) => (
            <button
              key={label}
              onClick={() => scrollToSection(label, id)}
              className="flex items-center gap-3 py-2"
              style={{ opacity: activeSection === label ? 1 : 0.4 }}
            >
              <Icon size={15} strokeWidth={1.6} />
              <span style={{ fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: activeSection === label ? 500 : 400 }}>
                {label}
              </span>
            </button>
          ))}
          <div className="flex gap-4 pt-2">
            <a href="#" style={{ opacity: 0.4 }} aria-label="Twitter"><Twitter size={16} strokeWidth={1.6} /></a>
            <a href="#" style={{ opacity: 0.4 }} aria-label="LinkedIn"><Linkedin size={16} strokeWidth={1.6} /></a>
          </div>
        </div>
      )}

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex" style={{ minHeight: "100vh" }}>

        {/* Sidebar */}
        <aside
          className="flex flex-col flex-shrink-0"
          style={{ width: "300px", position: "sticky", top: 0, height: "100vh" }}
        >
          <button
            onClick={() => scrollToSection("About", "about")}
            className="block overflow-hidden w-full"
            style={{ aspectRatio: "1/1", padding: "32px" }}
          >
            <img src={profileImg} alt="Ying Dong" className="w-full h-full object-cover" style={{ borderRadius: "4px" }} />
          </button>

          <nav className="flex flex-col gap-1 px-6">
            {NAV_LINKS.map(({ label, icon: Icon, id }) => (
              <button
                key={label}
                onClick={() => scrollToSection(label, id)}
                className="flex items-center gap-3 text-left transition-opacity duration-150 py-2 px-2 rounded"
                style={{ opacity: activeSection === label ? 1 : 0.35 }}
              >
                <Icon size={15} strokeWidth={1.6} />
                <span style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: activeSection === label ? 500 : 400 }}>
                  {label}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex gap-4 px-8 pb-8 mt-auto">
            <a href="#" className="hover:opacity-60 transition-opacity" style={{ opacity: 0.35 }} aria-label="Twitter">
              <Twitter size={16} strokeWidth={1.6} />
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity" style={{ opacity: 0.35 }} aria-label="LinkedIn">
              <Linkedin size={16} strokeWidth={1.6} />
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <section id="about" className="py-20 px-12 min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ maxWidth: "560px" }}>
                <p className="mb-5" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
                  Builder. Immigrant. Host. Eater.
                </p>
                <h1 className="mb-6" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "#3a3a3a" }}>
                  Hi, I'm Ying Dong.
                  <br /><br />
                  I'm building Ficta, an iOS/Android app where children co-create stories with AI through playful word games. Before this, I led product at Superpedestrian and TripAdvisor, and spent 5+ years as a data scientist at Twitter.
                  <br /><br />
                  I'm drawn to products at the intersection of human interaction and AI — especially how we evaluate whether AI is actually helpful for the people using it. Ficta is built with Figma Make and Claude Code, which has completely changed how fast I can go from idea to working product.
                </h1>
                <p style={{ fontSize: "0.875rem", opacity: 0.55, lineHeight: 1.8 }}>
                  Reach out at{" "}
                  <a href="mailto:hello@yingdong.com" style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    hello@yingdong.com
                  </a>
                </p>
              </div>
            </motion.div>
          </section>

          <section id="projects" className="py-20 px-12 min-h-screen" style={{ borderTop: "1px solid var(--border)" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {PROJECT_SECTIONS.map(({ heading, subheading, items }) => (
                <div key={heading} className="mb-14">
                  <p className="mb-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
                    {heading}
                  </p>
                  <p className="mb-5" style={{ fontSize: "13px", opacity: 0.4, lineHeight: 1.6 }}>
                    {subheading}
                  </p>
                  <div className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
                    {items.map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        <a
                          href={project.url}
                          className="group flex items-start justify-between gap-6 py-5"
                          style={{ textDecoration: "none", color: "inherit", display: "flex" }}
                        >
                          <div className="flex items-start gap-4 min-w-0">
                            <div
                              className="flex-shrink-0 overflow-hidden"
                              style={{ width: "72px", height: "72px", borderRadius: "4px", backgroundColor: "var(--muted)" }}
                            >
                              <img src={project.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p
                                className="group-hover:opacity-60 transition-opacity"
                                style={{ fontSize: "15px", fontWeight: 500, lineHeight: 1.4, marginBottom: "4px" }}
                              >
                                {project.title}
                              </p>
                              <p style={{ fontSize: "13px", opacity: 0.45, lineHeight: 1.55 }}>
                                {project.description}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight size={15} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>

      {/* ── Mobile content ── */}
      <div className="md:hidden" style={{ paddingTop: "61px" }}>
        <section id="about-mobile" className="px-6 py-12 min-h-screen">
          <div>
            <p className="mb-5" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
              Builder. Immigrant. Host. Eater.
            </p>
            <h1 className="mb-6" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "#3a3a3a" }}>
              Hi, I'm Ying Dong.
              <br /><br />
              I'm building Ficta, an iOS/Android app where children co-create stories with AI through playful word games. Before this, I led product at Superpedestrian and TripAdvisor, and spent 5+ years as a data scientist at Twitter.
              <br /><br />
              I'm drawn to products at the intersection of human interaction and AI — especially how we evaluate whether AI is actually helpful for the people using it. Ficta is built with Figma Make and Claude Code, which has completely changed how fast I can go from idea to working product.
            </h1>
            <p style={{ fontSize: "0.875rem", opacity: 0.55, lineHeight: 1.8 }}>
              Reach out at{" "}
              <a href="mailto:hello@yingdong.com" style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
                hello@yingdong.com
              </a>
            </p>
          </div>
        </section>

        <section id="projects-mobile" className="px-6 py-12 min-h-screen" style={{ borderTop: "1px solid var(--border)" }}>
          {PROJECT_SECTIONS.map(({ heading, subheading, items }) => (
            <div key={heading} className="mb-14">
              <p className="mb-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
                {heading}
              </p>
              <p className="mb-5" style={{ fontSize: "13px", opacity: 0.4, lineHeight: 1.6 }}>
                {subheading}
              </p>
              <div className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
                {items.map((project, i) => (
                  <a
                    key={i}
                    href={project.url}
                    className="group flex items-start justify-between gap-4 py-5"
                    style={{ borderBottom: "1px solid var(--border)", textDecoration: "none", color: "inherit", display: "flex" }}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex-shrink-0 overflow-hidden" style={{ width: "60px", height: "60px", borderRadius: "4px", backgroundColor: "var(--muted)" }}>
                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.4, marginBottom: "3px" }}>{project.title}</p>
                        <p style={{ fontSize: "12px", opacity: 0.45, lineHeight: 1.55 }}>{project.description}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
