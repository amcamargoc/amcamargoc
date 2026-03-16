const fs = require('fs');

let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');

content = content.replace(
    'import { GitCommitHorizontal, Clock, Building2, TerminalSquare } from "lucide-react";',
    'import { GitCommitHorizontal, GitCommit, Clock, Building2, TerminalSquare } from "lucide-react";'
);

content = content.replace(
    `    if (data.experienceRaw && data.experienceRaw.length > 0) {
      return [
        {
          role: "PDF Experience Export",
          company: "LinkedIn",
          date: "Latest",
          textRaw: data.experienceRaw.map((e: any) => e.text).join('\\n'),
          color: "text-tui-cyan"
        }
      ];
    }`,
    `    if (data.experiences && data.experiences.length > 0) {
      const colors = ["text-tui-cyan", "text-tui-magenta", "text-white"];
      return data.experiences.map((exp: any, i: number) => ({
        ...exp,
        color: colors[i % colors.length]
      }));
    }`
);

content = content.replace(
    'border border-tui-gray group-hover:border-white transition-colors',
    'border border-tui-gray/50 group-hover:border-white transition-colors'
);

content = content.replace(
    `<p className="text-tui-dim text-sm leading-relaxed max-w-2xl border-l border-tui-gray/30 pl-4 whitespace-pre-wrap font-mono">
                  {exp.textRaw ? exp.textRaw : exp.desc}
                </p>`,
    `{(exp.description || exp.desc) && (
                  <p className="text-tui-dim text-sm leading-relaxed max-w-2xl border-l border-tui-gray/30 pl-4 whitespace-pre-wrap font-mono">
                    {exp.description || exp.desc}
                  </p>
                )}`
);

fs.writeFileSync('src/components/views/ExperienceView.tsx', content);
