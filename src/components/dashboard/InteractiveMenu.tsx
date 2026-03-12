"use client";

import { useAppStore } from "@/store/useAppStore";

export default function InteractiveMenu() {
  const { openTab } = useAppStore();

  const MenuItem = ({
    index,
    label,
    action
  }: {
    index: string;
    label: string;
    action: () => void
  }) => (
    <div
      onClick={action}
      className="group flex items-center justify-center gap-4 cursor-pointer hover:bg-white/5 px-2 py-1 rounded transition-colors w-full"
    >
      <span className="text-tui-dim font-mono">[{index}]</span>
      <span className="text-white group-hover:text-tui-cyan transition-colors font-mono tracking-tight uppercase">
        {label}
      </span>
    </div>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-1 w-full flex flex-col items-center">
      <div className="text-tui-magenta font-bold font-mono text-xs mb-2">
        [ {title} ]
      </div>
      <div className="space-y-0.5 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      <Section title="NAVIGATION">
        <MenuItem
          index="e"
          label="Bio"
          action={() => openTab({ type: "bio", title: "bio.md", path: "/humans/character/beto/bio.md" })}
        />
        <MenuItem
          index="f"
          label="Projects"
          action={() => openTab({ type: "projects", title: "index.md", path: "/humans/character/beto/projects/index.md" })}
        />
        <MenuItem
          index="r"
          label="Experience"
          action={() => openTab({ type: "experience", title: "experience.md", path: "/humans/character/beto/experience.md" })}
        />
      </Section>
    </div>
  );
}