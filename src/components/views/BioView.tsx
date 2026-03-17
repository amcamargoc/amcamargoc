"use client";

import { User, Mail, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import * as simpleIcons from "simple-icons";

// Helper to map GitHub language strings to simple-icons keys
const getIconSvg = (language: string) => {
  const normalized = language.toLowerCase()
    .replace(/\+/g, 'plus')
    .replace('#', 'sharp')
    .replace(/\./g, 'dot')
    .replace(/ /g, '');

  // Custom overrides for GitHub language names that don't match simple-icons directly
  const overrides: Record<string, string> = {
    'jupyternotebook': 'jupyter',
    'shell': 'gnubash',
    'css': 'css3',
    'html': 'html5',
    'vue': 'vuedotjs',
    'scss': 'sass',
  };

  const iconKey = overrides[normalized] || normalized;

  // simple-icons exports are prefixed with 'si' and capitalized, e.g. siJavascript
  const exportName = `si${iconKey.charAt(0).toUpperCase()}${iconKey.slice(1)}`;

  // @ts-expect-error - dynamic lookup on imported library
  const icon = simpleIcons[exportName];

  return icon ? icon.svg : null;
};

import profileData from "@/data/profile-data.json";

export default function BioView() {
  const [data] = useState<any>(profileData);

  const profile = data?.profile;
  const techStack = data?.techStack || ['TypeScript / Node.js', 'React / Next.js', 'Ruby on Rails', 'PostgreSQL / Redis'];
  const metadata = data?.metadata || {};

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar flex flex-col justify-center min-h-full">
      <div className="max-w-3xl mx-auto font-sans leading-relaxed tracking-wide space-y-8 bg-black/50 border border-tui-gray p-8 rounded-md shadow-2xl relative">


        <div className="flex flex-col items-center text-center gap-8">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-2 border-tui-magenta shadow-[0_0_15px_rgba(255,0,255,0.3)]"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-2 border-tui-magenta shadow-[0_0_15px_rgba(255,0,255,0.3)] flex items-center justify-center bg-black">
              <User className="text-tui-magenta" size={48} />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-white flex items-center justify-center gap-4 mb-4 font-mono tracking-tighter uppercase">
              {profile?.name || "ALBERTO CAMARGO"}
            </h1>
            <p className="text-tui-dim font-mono text-sm leading-relaxed whitespace-pre-wrap max-w-xl mx-auto">
              {profile?.bio || "A passionate software engineer building digital experiences."}
            </p>
          </div>
        </div>

        <div className={`pt-6 border-t border-tui-gray grid gap-12 ${metadata.layout === 'full' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-lg mx-auto'}`}>
          {metadata.layout === 'full' && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-white mb-6 font-mono uppercase tracking-widest text-tui-dim">Core Languages</h2>
              <div className="flex flex-wrap justify-center gap-3 font-mono text-sm">
                {techStack.map((tech: string, idx: number) => {
                  const iconColor = idx % 2 === 0 ? "#FF00FF" : "#00FFFF";
                  const iconSvg = getIconSvg(tech);

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-black/40 border border-tui-gray/50 px-3 py-1.5 rounded-sm hover:border-white transition-colors group"
                    >
                      {iconSvg ? (
                        <div
                          className="w-4 h-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
                          dangerouslySetInnerHTML={{ __html: iconSvg.replace('<svg ', `<svg fill="${iconColor}" `) }}
                        />
                      ) : (
                        <span className={idx % 2 === 0 ? "text-tui-magenta" : "text-tui-cyan"}>▸</span>
                      )}
                      <span className="text-white group-hover:text-tui-cyan transition-colors">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="text-center">
            <h2 className="text-lg font-bold text-white mb-6 font-mono uppercase tracking-widest text-tui-dim">Connect</h2>
            <ul className="space-y-4 font-mono text-sm flex flex-col items-center">
              <li>
                <a href={metadata.email ? `mailto:${metadata.email}` : "#"} className="flex items-center gap-3 hover:text-tui-cyan transition-colors group">
                  <Mail size={16} className="text-tui-dim group-hover:text-tui-cyan" />
                  {metadata.email || "hello@example.com"}
                </a>
              </li>
              <li>
                <a href={`https://github.com/${profile?.login || "amcamargoc"}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Github size={16} className="text-tui-dim group-hover:text-white" />
                  github.com/{profile?.login || "amcamargoc"}
                </a>
              </li>
              <li>
                <a href={metadata.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                  <Linkedin size={16} className="text-tui-dim group-hover:text-blue-400" />
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}