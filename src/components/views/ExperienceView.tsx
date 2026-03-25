"use client";

import { GitCommitHorizontal, Clock, Building2, TerminalSquare } from "lucide-react";
import { useState } from "react";
import profileData from "@/data/profile-data.json";

export default function ExperienceView() {
  const getInitialExperiences = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = profileData as any;
    if (data.experiences && data.experiences.length > 0) {
      const colors = ["text-tui-cyan", "text-tui-magenta", "text-white"];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.experiences.map((exp: any, i: number) => ({
        ...exp,
        color: colors[i % colors.length]
      }));
    }
    return [
      {
        role: "Senior Full Stack Engineer",
        company: "TechNova Solutions",
        date: "2021 - Present",
        desc: "Led the architectural redesign of the core product platform, transitioning from a monolithic Ruby on Rails application to a microservices architecture using Node.js and Next.js.",
        color: "text-tui-cyan"
      },
      {
        role: "Software Engineer II",
        company: "DataSphere Analytics",
        date: "2018 - 2021",
        desc: "Developed high-performance data visualization dashboards using React and D3.js. Improved query performance by 40% through advanced PostgreSQL indexing strategies.",
        color: "text-tui-magenta"
      },
      {
        role: "Backend Developer",
        company: "CloudSync Inc.",
        date: "2015 - 2018",
        desc: "Built scalable RESTful APIs using Ruby on Rails for a document management system serving over 100k daily active users.",
        color: "text-white"
      }
    ];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [experiences] = useState<any[]>(getInitialExperiences());

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-tui-gray pb-6">
          <TerminalSquare size={24} className="text-tui-magenta" />
          <h1 className="text-2xl font-bold font-mono text-white">git log --stat</h1>
          <span className="bg-tui-gray/30 text-tui-dim px-2 py-1 text-xs ml-auto">HEAD -&gt; main</span>
        </div>

        <div className="relative border-l-2 border-tui-gray/30 pl-8 ml-4 md:ml-0 space-y-16 py-4">
          {experiences.map((exp, i) => (
            <div key={i} className="relative group">
              <div className={`absolute -left-[41px] top-1 bg-black p-1 rounded-full border border-tui-gray/50 group-hover:border-white transition-colors`}>
                <GitCommitHorizontal size={18} className={exp.color} />
              </div>

              <div className="font-mono">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h2 className={`text-xl font-bold ${exp.color} group-hover:underline underline-offset-4 decoration-current`}>
                    {exp.role}
                  </h2>
                  <div className="flex items-center gap-2 text-tui-dim text-xs bg-tui-gray/20 px-3 py-1 border border-tui-gray/30 w-fit">
                    <Clock size={12} />
                    {exp.date}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white font-bold mb-6 text-sm">
                  <Building2 size={14} className="text-tui-dim" />
                  @{exp.company}
                </div>

                {(exp.description || exp.desc) && (
                  <p className="text-tui-dim text-sm leading-relaxed max-w-2xl border-l border-tui-gray/30 pl-4 whitespace-pre-wrap font-mono">
                    {String(exp.description || exp.desc)}
                  </p>
                )}

                <div className="mt-4 flex gap-6 text-tui-xs text-tui-gray">
                  <span>1 file changed, {i * 123 + 45} insertions(+)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}