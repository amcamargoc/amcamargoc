import { Briefcase, Code, Globe, Terminal, ExternalLink } from "lucide-react";
import { Tab } from "@/store/useAppStore";
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
  const projects: Project[] = profileData.metadata.projects || [];

  const getIconAndColor = (index: number) => {
    const styles = [
      { icon: <Globe size={18} className="text-tui-cyan" />, color: "border-tui-cyan" },
      { icon: <Code size={18} className="text-tui-magenta" />, color: "border-tui-magenta" },
      { icon: <Briefcase size={18} className="text-white" />, color: "border-tui-gray hover:border-white" },
      { icon: <Terminal size={18} className="text-white" />, color: "border-tui-gray hover:border-white" },
    ];
    return styles[index % styles.length];
  };

  const displayedProjects = activeTab.path.endsWith("projects/index.md")
    ? projects
    : projects.filter((p: Project) => activeTab.path.endsWith(p.slug));

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
          {displayedProjects.map((p: Project, i: number) => {
            const { icon, color } = getIconAndColor(i);
            return (
              <div
                key={i}
                className={`border ${color} bg-black rounded-sm transition-all duration-300 hover:bg-white/5 group flex flex-col overflow-hidden`}
              >
                {/* Visual File Card - High Impact Screenshot */}
                <div className="relative w-full h-48 overflow-hidden bg-tui-gray/20">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10 duration-500"></div>
                  {/* Using next/image with fallback */}
                  <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={p.screenshot}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {icon}
                      <h3 className="font-bold text-white group-hover:underline decoration-tui-cyan underline-offset-4">{p.slug}</h3>
                    </div>
                    <span className="text-[10px] text-tui-dim">rwxr-xr-x</span>
                  </div>

                  <p className="text-sm text-tui-dim mb-4 lowercase flex-1">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map((s: string) => (
                      <span key={s} className="text-[10px] bg-tui-gray/40 px-2 py-1 text-white border border-tui-gray">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Executable Path */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto flex items-center gap-2 text-xs text-tui-cyan hover:text-white transition-colors border border-transparent hover:border-tui-cyan/50 p-2 -ml-2 rounded w-fit group/btn"
                  >
                    <span className="text-tui-magenta">./</span>
                    execute
                    <ExternalLink size={12} className="opacity-50 group-hover/btn:opacity-100" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
