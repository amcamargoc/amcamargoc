import { Briefcase, Code, Globe, Terminal, ExternalLink, Maximize2, X, Smartphone, Monitor } from "lucide-react";
import { Tab } from "@/store/useAppStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import profileData from "@/data/profile-data.json";

interface Project {
  name: string;
  slug: string;
  description: string;
  url: string;
  screenshot: string;
  stack: string[];
}

export default function ProjectsView({ activeTab }: { activeTab: Tab }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects: Project[] = profileData.metadata.projects || [];

  const getIconAndColor = (index: number) => {
    const styles = [
      { icon: <Globe size={18} className="text-tui-cyan" />, color: "border-tui-cyan", lightColor: "text-tui-cyan" },
      { icon: <Code size={18} className="text-tui-magenta" />, color: "border-tui-magenta", lightColor: "text-tui-magenta" },
      { icon: <Briefcase size={18} className="text-white" />, color: "border-tui-gray hover:border-white", lightColor: "text-white" },
      { icon: <Terminal size={18} className="text-white" />, color: "border-tui-gray hover:border-white", lightColor: "text-white" },
    ];
    return styles[index % styles.length];
  };

  const displayedProjects = activeTab.path.endsWith("projects/index.md")
    ? projects
    : projects.filter((p: Project) => activeTab.path.includes(p.slug));

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar relative">
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        <div className="border-b border-tui-gray pb-4">
          <h1 className="text-2xl font-bold text-tui-cyan flex items-center gap-3">
            <span className="text-tui-dim">~/</span>
            projects
            <span className="text-tui-dim">/</span>
            {!activeTab.path.endsWith("index.md") && (
              <span className="text-white">{activeTab.title}</span>
            )}
          </h1>
          <p className="text-tui-dim mt-2 lowercase">ls -la --color=auto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {displayedProjects.map((p: Project, i: number) => {
            const { icon, color } = getIconAndColor(i);
            const desktopSrc = p.screenshot.replace("-hero.png", "-desktop.png");

            return (
              <div
                key={i}
                className={`border ${color} bg-black rounded-sm transition-all duration-300 hover:bg-white/5 group flex flex-col overflow-hidden`}
              >
                {/* Hero Section Preview */}
                <div
                  className="relative w-full h-44 overflow-hidden bg-tui-gray/20 cursor-zoom-in group/hero"
                  onClick={() => setSelectedProject(p)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all z-20 duration-500 flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300" size={32} />
                  </div>

                  <motion.div className="w-full h-full relative z-0">
                    <Image
                      src={p.screenshot}
                      alt={`${p.name} hero focal point`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </motion.div>

                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {icon}
                      <h3 className="font-bold text-white group-hover:underline decoration-tui-cyan underline-offset-4">{p.slug}</h3>
                    </div>
                    <span className="text-[10px] text-tui-dim">rwxr-xr-x</span>
                  </div>

                  <p className="text-xs text-tui-dim mb-4 lowercase flex-1 leading-relaxed line-clamp-2">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map((s: string) => (
                      <span key={s} className="text-[10px] bg-tui-gray/40 px-2 py-1 text-white border border-tui-gray font-mono">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs text-tui-cyan hover:text-white transition-colors border border-transparent hover:border-tui-cyan/50 p-2 -ml-2 rounded w-fit group/btn"
                    >
                      <span className="text-tui-magenta">./</span>
                      execute
                      <ExternalLink size={12} className="opacity-50 group-hover/btn:opacity-100" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-hidden flex flex-col p-4 md:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-tui-gray pb-4 mb-4">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="text-tui-magenta">/</span>
                  {selectedProject.name}
                  <span className="text-tui-dim text-xs font-normal">.inspect()</span>
                </h2>
                <p className="text-xs text-tui-dim font-mono">{selectedProject.url}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content - Scrollable grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Desktop View Column */}
                <div className="lg:col-span-8 space-y-4 order-2 lg:order-1">
                  <div className="flex items-center gap-2 text-xs text-tui-cyan font-mono uppercase tracking-widest mb-2 px-1">
                    <Monitor size={14} /> Desktop Full version
                  </div>
                  <div className="border border-white/5 rounded-sm bg-tui-bg overflow-hidden shadow-2xl">
                    <Image
                      src={selectedProject.screenshot.replace("-hero.png", "-desktop.png")}
                      alt={`${selectedProject.name} desktop full`}
                      width={1280}
                      height={2000}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Mobile View Column */}
                <div className="lg:col-span-4 space-y-4 order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs text-tui-magenta font-mono uppercase tracking-widest mb-2 px-1">
                    <Smartphone size={14} /> Mobile version
                  </div>
                  <div className="flex justify-center lg:justify-start">
                    <div className="relative w-full max-w-[320px] lg:max-w-full bg-black border border-white/10 rounded-[40px] p-3 shadow-2xl overflow-hidden aspect-[375/812]">
                      <div className="w-full h-full rounded-[30px] overflow-hidden relative bg-tui-bg">
                        <Image
                          src={selectedProject.screenshot.replace("-hero.png", "-mobile.png")}
                          alt={`${selectedProject.name} mobile`}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      </div>
                      {/* Simulated Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-20" /> {/* Spacer */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
