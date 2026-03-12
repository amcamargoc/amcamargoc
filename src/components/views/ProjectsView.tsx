import { Briefcase, Code, Database, Globe } from "lucide-react";
import { Tab } from "@/store/useAppStore";

export default function ProjectsView({ activeTab }: { activeTab: Tab }) {
  const projects = [
    {
      name: "muikao.md",
      desc: "Digital Asset Ecosystem with Real-Time Analytics.",
      stack: ["React", "Node", "AWS"],
      icon: <Globe size={18} className="text-tui-cyan" />,
      color: "border-tui-cyan",
    },
    {
      name: "the_cosmic_games.md",
      desc: "High-performance physics engine for web applications.",
      stack: ["TypeScript", "WebGL", "WASM"],
      icon: <Code size={18} className="text-tui-magenta" />,
      color: "border-tui-magenta",
    },
    {
      name: "führerschein_fragen.md",
      desc: "Interactive learning platform for driving licenses.",
      stack: ["Next.js", "Tailwind", "Supabase"],
      icon: <Briefcase size={18} className="text-white" />,
      color: "border-tui-gray hover:border-white",
    },
    {
      name: "portfolio_v2.md",
      desc: "Neovim TUI inspired developer portfolio.",
      stack: ["Next.js", "Tailwind", "Zustand"],
      icon: <Terminal size={18} className="text-white" />,
      color: "border-tui-gray hover:border-white",
    },
  ];

  const displayedProjects = activeTab.path.endsWith("projects/index.md")
    ? projects
    : projects.filter(p => activeTab.path.endsWith(p.name));

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((p, i) => (
            <div
              key={i}
              className={`border ${p.color} bg-black p-5 rounded-sm transition-all duration-300 hover:bg-white/5 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {p.icon}
                  <h3 className="font-bold text-white group-hover:underline decoration-tui-cyan underline-offset-4">{p.name}</h3>
                </div>
                <span className="text-[10px] text-tui-dim">rwxr-xr-x</span>
              </div>
              <p className="text-sm text-tui-dim mb-6 lowercase">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map(s => (
                  <span key={s} className="text-[10px] bg-tui-gray/40 px-2 py-1 text-white border border-tui-gray">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Terminal } from "lucide-react";