import { useState, useEffect } from "react";
import { motion } from "motion/react";
import profileImg from "../imports/profile_anime.png";
import cooking1 from "../imports/snap-hotpot.png";
import cooking2 from "../imports/snap-glazing.png";
import newsletterTrickOrTreating from "../imports/newsletter-trick-or-treating.png";
import substackImprovisedWriting from "../imports/substack-improvised-writing.jpeg";
import fictaFirstStory from "../imports/ficta-first-story.png";
import myGarden from "../imports/my-garden.svg";
import myGardenDemo from "../imports/my-garden-demo.mp4";
import mapOfVerbs from "../imports/map-of-verbs.png";
import snap3 from "../imports/snap-3.png";
import snap4 from "../imports/snap-4.png";
import snap5 from "../imports/snap-5.png";
import { User, FolderOpen, PenLine, Images, Twitter, Linkedin, ArrowUpRight, Menu, X, ArrowLeft } from "lucide-react";

const GALLERY_PHOTOS = [
  {
    url: snap3,
    caption: "2026",
    description: "A lone tree in the mist.",
  },
  {
    url: snap5,
    caption: "2026",
    description: "On the road across open grassland.",
  },
  {
    url: snap4,
    caption: "2026",
    description: "Camp beneath a field of stars.",
  },
  {
    url: cooking1,
    caption: "2026",
    description: "Hotpot in the garden. Wild-Foraged Mushrooms in Chicken Broth.",
  },
  {
    url: cooking2,
    caption: "2026",
    description: "Glazing buns on an outdoor griddle.",
  },
];

const NAV_LINKS = [
  { label: "About", icon: User, id: "about" },
  { label: "Create", icon: FolderOpen, id: "things-i-create" },
  { label: "Write", icon: PenLine, id: "write" },
  { label: "Snap", icon: Images, id: "gallery" },
];

const TAG_COLORS: Record<string, { bg: string; fg: string }> = {
  Prototype: { bg: "#e3eee3", fg: "#2f5a3a" },
  iOS: { bg: "#e2eaf5", fg: "#2c4a75" },
  Substack: { bg: "#f7e6dc", fg: "#8a4320" },
  Newsletter: { bg: "#ece4f3", fg: "#5a3a7a" },
};

function ProjectTag({ label }: { label: string }) {
  const colors = TAG_COLORS[label] ?? { bg: "#e6e6ea", fg: "#3a3a3a" };
  return (
    <div style={{ marginTop: "auto", paddingTop: "10px" }}>
      <span
        style={{
          display: "inline-block",
          padding: "3px 9px",
          borderRadius: "999px",
          backgroundColor: colors.bg,
          color: colors.fg,
          fontSize: "10.5px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.5,
        }}
      >
        {label}
      </span>
    </div>
  );
}

const PROJECT_SECTIONS: { id: string; heading: string; subheading: string; items: any[] }[] = [
  {
    id: "things-i-create",
    heading: "Create",
    subheading: "Prototypes and apps.",
    items: [
      { image: mapOfVerbs, title: "Map of Verbs", description: "3,400+ verbs mapped by meaning — pick a plain verb and find the stronger, quieter, sillier options around it", date: "Nov. 19, 2026", type: "Prototype", url: "https://mapofverb.ficta.ai/", largeThumbnail: true },
      { image: myGarden, video: myGardenDemo, title: "My Garden in 3D", description: "An interactive prototype for mapping plants, light, and change across a garden bed", date: "Nov. 18, 2026", type: "Prototype", url: "https://mygarden.ficta.ai/", largeThumbnail: true },
      { image: fictaFirstStory, title: "Ficta", description: "2.6.0 for iOS — children co-create stories with AI through playful word games", date: "Oct. 9, 2026", type: "iOS", url: "https://ficta.ai", largeThumbnail: true },
    ],
  },
  {
    id: "write",
    heading: "Write",
    subheading: "Essays and newsletters.",
    items: [
      { image: newsletterTrickOrTreating, title: "Trick-or-Treating.", description: "A newsletter for new families in Cambridge", date: "Oct. 26, 2026", type: "Newsletter", url: "https://notes-from-five-friends.beehiiv.com/p/trick-or-treating", largeThumbnail: true },
      { image: substackImprovisedWriting, title: "What makes short improvised writing good?", description: "Writing on parenting, technology, and building things that matter", date: "Oct. 20, 2026", type: "Substack", url: "https://yingd.substack.com/p/what-makes-short-improvised-writing?r=viy", largeThumbnail: true },
    ],
  },
  {
    id: "things-i-eat",
    heading: "Snap",
    subheading: "Photos from the places I've landed.",
    items: [],
  },
];

function SnapPreview({ onShowMore }: { onShowMore: () => void }) {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {GALLERY_PHOTOS.slice(0, 5).map((photo) => (
          <button
            key={photo.url}
            onClick={onShowMore}
            className="group overflow-hidden flex-shrink-0 w-[240px] max-w-full h-[160px] md:w-[288px] md:h-[192px]"
            style={{ borderRadius: "4px", backgroundColor: "var(--muted)" }}
            aria-label={`Open Snap gallery: ${photo.description}`}
          >
            <img
              src={photo.url}
              alt={photo.description}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>
      <button
        onClick={onShowMore}
        className="group flex items-center gap-2 mt-5 hover:opacity-60 transition-opacity"
        style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}
      >
        Show more
        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"main" | "gallery">("main");

  const scrollToSection = (label: string, id: string) => {
    setActiveSection(label);
    setMenuOpen(false);
    if (id === "gallery") {
      setView("gallery");
      return;
    }
    setView("main");
    setTimeout(() => {
      const targetId = window.matchMedia("(max-width: 767px)").matches ? `${id}-mobile` : id;
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    const sections = NAV_LINKS
      .filter(({ id }) => id !== "gallery")
      .flatMap(({ id, label }) => [
        { id, label },
        { id: `${id}-mobile`, label },
      ]);
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
            <a href="https://x.com/yingatcambridge" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.4 }} aria-label="Twitter"><Twitter size={16} strokeWidth={1.6} /></a>
            <a href="https://www.linkedin.com/in/dongying/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.4 }} aria-label="LinkedIn"><Linkedin size={16} strokeWidth={1.6} /></a>
          </div>
        </div>
      )}

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex" style={{ minHeight: "100vh" }}>

        {/* Sidebar */}
        <aside
          className="flex flex-col flex-shrink-0"
          style={{ width: "300px", position: "sticky", top: 0, height: "100vh", paddingTop: "48px" }}
        >
          <button
            onClick={() => scrollToSection("About", "about")}
            className="block overflow-hidden w-full"
            style={{ padding: "0 48px 32px", flexShrink: 0 }}
          >
            <img src={profileImg} alt="Ying Dong" className="w-full object-cover" style={{ borderRadius: "6px", display: "block" }} />
          </button>

          <nav className="flex flex-col gap-1" style={{ paddingLeft: "48px" }}>
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

          <div className="flex gap-4 mt-auto" style={{ paddingLeft: "48px", paddingBottom: "48px" }}>
            <a href="https://x.com/yingatcambridge" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" style={{ opacity: 0.35 }} aria-label="Twitter">
              <Twitter size={16} strokeWidth={1.6} />
            </a>
            <a href="https://www.linkedin.com/in/dongying/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" style={{ opacity: 0.35 }} aria-label="LinkedIn">
              <Linkedin size={16} strokeWidth={1.6} />
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <section id="about" style={{ padding: "80px 56px 0", display: "flex", alignItems: "flex-start" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%" }}
            >
              <div style={{ maxWidth: "680px" }}>
                <h1 className="mb-6" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "#3a3a3a" }}>
                  Hi, I'm Ying Dong.
                  <br /><br />
                  Building things is fun. It’s the process of figuring things out. I start with a question, look for an answer, put a few things together, change what doesn’t work, and come back tomorrow to make it a little better. After a thousand attempts, one day it’s something I can publish online.
                  <br /><br />
                  Right now I’m building 3D models with MapAnything. I’m also exploring which words and sentence structures make writing fun for kids in Ficta.
                  <br /><br />
                  Writing well is hard, and as a non-native speaker, I’m slow at it. But the desire to tell stories always wins. I recently launched a newsletter for families new to the city.
                  <br /><br />
                  Previously, I was a PM at Superpedestrian and TripAdvisor, and a data scientist at Twitter.
                </h1>
                <p style={{ fontSize: "0.875rem", opacity: 0.55, lineHeight: 1.8 }}>
                  Reach out at{" "}
                  <a href="mailto:yingburkedong@gmail.com" style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    yingburkedong@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>
          </section>

          <section id="projects" style={{ padding: "72px 56px 80px" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {PROJECT_SECTIONS.map(({ id, heading, subheading, items }, sectionIndex) => (
                <div
                  id={id}
                  key={heading}
                  className="mb-14"
                  style={sectionIndex > 0 ? { borderTop: "1px solid var(--border)", paddingTop: "56px" } : undefined}
                >
                  <p className="mb-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
                    {heading}
                  </p>
                  <p className="mb-5" style={{ fontSize: "13px", opacity: 0.4, lineHeight: 1.6 }}>
                    {subheading}
                  </p>
                  {id === "things-i-eat" ? (
                    <SnapPreview onShowMore={() => setView("gallery")} />
                  ) : (
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
                          href={project.url === "gallery" ? undefined : project.url}
                          onClick={project.url === "gallery" ? (e) => { e.preventDefault(); setView("gallery"); } : undefined}
                          className="group flex items-start justify-between gap-6 py-5"
                          style={{ textDecoration: "none", color: "inherit", display: "flex", cursor: "pointer" }}
                        >
                          <div className="flex items-stretch gap-4 min-w-0">
                            <div
                              className="flex-shrink-0 overflow-hidden"
                              style={{
                                width: (id === "things-i-create" || id === "write") ? "288px" : "largeThumbnail" in project ? "144px" : "72px",
                                height: (id === "things-i-create" || id === "write") ? "192px" : "largeThumbnail" in project ? "96px" : "48px",
                                borderRadius: "4px",
                                backgroundColor: "var(--muted)",
                              }}
                            >
                              {"video" in project ? (
                                <video
                                  src={project.video}
                                  poster={project.image}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  aria-label={`${project.title} prototype preview`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img src={project.image} alt="" className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="min-w-0 flex flex-col">
                              <p
                                className="group-hover:opacity-60 transition-opacity"
                                style={{ fontSize: "15px", fontWeight: 500, lineHeight: 1.4, marginBottom: "4px" }}
                              >
                                {project.title}
                              </p>
                              <p style={{ fontSize: "13px", opacity: 0.45, lineHeight: 1.55 }}>
                                {project.description}
                              </p>
                              {"date" in project && (
                                <p style={{ fontSize: "12px", opacity: 0.4, lineHeight: 1.5, marginTop: "5px" }}>
                                  {project.date}
                                </p>
                              )}
                              {"type" in project && <ProjectTag label={project.type} />}
                            </div>
                          </div>
                          <ArrowUpRight size={15} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </a>
                      </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>

      {/* ── Gallery overlay ── */}
      {view === "gallery" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex"
          style={{ position: "fixed", inset: 0, backgroundColor: "var(--background)", zIndex: 100, overflowY: "auto" }}
        >
          {/* Sidebar stays visible */}
          <div className="hidden md:flex" style={{ width: "300px", flexShrink: 0, position: "sticky", top: 0, height: "100vh", flexDirection: "column" }}>
            <button
              onClick={() => scrollToSection("About", "about")}
              className="block overflow-hidden w-full"
              style={{ aspectRatio: "1/1", padding: "32px" }}
            >
              <img src={profileImg} alt="Ying Dong" className="w-full h-full object-cover" style={{ borderRadius: "4px" }} />
            </button>
            <nav className="flex flex-col gap-1 px-6">
              {NAV_LINKS.map(({ label, icon: Icon, id }) => (
                <button key={label} onClick={() => { setView("main"); scrollToSection(label, id); }}
                  className="flex items-center gap-3 text-left py-2 px-2 rounded"
                  style={{ opacity: 0.35 }}
                >
                  <Icon size={15} strokeWidth={1.6} />
                  <span style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
                </button>
              ))}
            </nav>
            <div className="flex gap-4 px-8 pb-8 mt-auto">
              <a href="https://x.com/yingatcambridge" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.35 }} aria-label="Twitter"><Twitter size={16} strokeWidth={1.6} /></a>
              <a href="https://www.linkedin.com/in/dongying/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.35 }} aria-label="LinkedIn"><Linkedin size={16} strokeWidth={1.6} /></a>
            </div>
          </div>

          {/* Gallery content */}
          <div className="flex-1 min-w-0 px-6 py-8 md:px-12 md:py-20">
            <button
              onClick={() => setView("main")}
              className="flex items-center gap-2 mb-12 hover:opacity-60 transition-opacity"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, background: "none", border: "none", cursor: "pointer" }}
            >
              <ArrowLeft size={13} strokeWidth={1.6} /> Back to projects
            </button>

            <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, marginBottom: "6px" }}>
              Snap
            </p>
            <p style={{ fontSize: "14px", opacity: 0.5, lineHeight: 1.6, marginBottom: "56px", maxWidth: "600px" }}>
              Photos from the places I've landed.
            </p>

            {/* Masonry-style grid */}
            <div className="columns-1 md:columns-2" style={{ columnGap: "24px" }}>
              {GALLERY_PHOTOS.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{ breakInside: "avoid", marginBottom: "24px" }}
                >
                  <div style={{ overflow: "hidden", borderRadius: "4px", backgroundColor: "var(--muted)" }}>
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      style={{ width: "100%", display: "block", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ marginTop: "10px", paddingBottom: "4px" }}>
                    <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.35, marginBottom: "4px" }}>
                      {photo.caption}
                    </p>
                    <p style={{ fontSize: "13px", opacity: 0.55, lineHeight: 1.6 }}>
                      {photo.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Mobile content ── */}
      <div className="md:hidden" style={{ paddingTop: "61px" }}>
        <section id="about-mobile" className="px-6 pt-12">
          <div>
            <h1 className="mb-6" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "#3a3a3a" }}>
              Hi, I'm Ying Dong.
              <br /><br />
              Building things is fun. It’s the process of figuring things out. I start with a question, look for an answer, put a few things together, change what doesn’t work, and come back tomorrow to make it a little better. After a thousand attempts, one day it’s something I can publish online.
              <br /><br />
              Right now I’m building 3D models with MapAnything. I’m also exploring which words and sentence structures make writing fun for kids in Ficta.
              <br /><br />
              Writing well is hard, and as a non-native speaker, I’m slow at it. But the desire to tell stories always wins. I recently launched a newsletter for families new to the city.
              <br /><br />
              Previously, I was a PM at Superpedestrian and TripAdvisor, and a data scientist at Twitter.
            </h1>
            <p style={{ fontSize: "0.875rem", opacity: 0.55, lineHeight: 1.8 }}>
              Reach out at{" "}
              <a href="mailto:yingburkedong@gmail.com" style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
                yingburkedong@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section id="projects-mobile" className="px-6 pt-14 pb-12">
          {PROJECT_SECTIONS.map(({ id, heading, subheading, items }, sectionIndex) => (
            <div
              id={`${id}-mobile`}
              key={heading}
              className="mb-14"
              style={{ scrollMarginTop: "61px", ...(sectionIndex > 0 ? { borderTop: "1px solid var(--border)", paddingTop: "48px" } : {}) }}
            >
              <p className="mb-0.5" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
                {heading}
              </p>
              <p className="mb-5" style={{ fontSize: "13px", opacity: 0.4, lineHeight: 1.6 }}>
                {subheading}
              </p>
              {id === "things-i-eat" ? (
                <SnapPreview onShowMore={() => setView("gallery")} />
              ) : (
                <div className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
                  {items.map((project, i) => (
                  <a
                    key={i}
                    href={project.url === "gallery" ? undefined : project.url}
                    onClick={project.url === "gallery" ? (e) => { e.preventDefault(); setView("gallery"); } : undefined}
                    className="group flex items-start justify-between gap-4 py-5"
                    style={{ borderBottom: "1px solid var(--border)", textDecoration: "none", color: "inherit", display: "flex" }}
                  >
                    <div className={`flex items-stretch gap-3 min-w-0 ${(id === "things-i-create" || id === "write") ? "flex-col" : ""}`}>
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{
                          width: (id === "things-i-create" || id === "write") ? "min(240px, 100%)" : "largeThumbnail" in project ? "120px" : "60px",
                          height: (id === "things-i-create" || id === "write") ? "160px" : "largeThumbnail" in project ? "80px" : "40px",
                          borderRadius: "4px",
                          backgroundColor: "var(--muted)",
                        }}
                      >
                        {"video" in project ? (
                          <video
                            src={project.video}
                            poster={project.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label={`${project.title} prototype preview`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img src={project.image} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <p style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.4, marginBottom: "3px" }}>{project.title}</p>
                        <p style={{ fontSize: "12px", opacity: 0.45, lineHeight: 1.55 }}>{project.description}</p>
                        {"date" in project && (
                          <p style={{ fontSize: "11px", opacity: 0.4, lineHeight: 1.5, marginTop: "4px" }}>
                            {project.date}
                          </p>
                        )}
                        {"type" in project && <ProjectTag label={project.type} />}
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity" />
                  </a>
                  ))}
                </div>
              )}
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
