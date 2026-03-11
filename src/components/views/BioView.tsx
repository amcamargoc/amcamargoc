import { User, Mail, Github, Linkedin, Terminal } from "lucide-react";

export default function BioView() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
      <div className="max-w-3xl mx-auto font-sans leading-relaxed tracking-wide space-y-8 bg-black/50 border border-tui-gray p-8 rounded-md shadow-2xl relative">
        <div className="absolute top-0 right-0 p-2 bg-tui-cyan text-black text-[10px] font-mono font-bold flex items-center gap-1">
          <Terminal size={10} />
          READONLY
        </div>

        <h1 className="text-4xl font-extrabold text-white flex items-center gap-4 mb-8 font-mono tracking-tighter">
          <User className="text-tui-magenta" size={32} />
          ALBERTO CAMARGO
        </h1>

        <div className="text-tui-dim font-mono text-sm border-l-4 border-tui-cyan pl-4 italic mb-10 bg-tui-cyan/5 py-2">
          &quot;Software engineer since 2015, driven by the belief that code can transform our world for the better.&quot;
        </div>

        <div className="space-y-6 text-[15px] md:text-base text-gray-300">
          <p>
            I thrive on taking ideas from concept to reality, making solutions accessible to everyone. Passionate about exploring new technologies and solving complex challenges through collaboration.
          </p>
          <p>
            While fluent in <span className="text-tui-magenta font-mono font-bold">Ruby</span> and <span className="text-tui-cyan font-mono font-bold">JavaScript</span>, I’m always eager to expand my knowledge, experiment with new languages, and embrace different programming paradigms.
          </p>
        </div>

        <div className="pt-8 border-t border-tui-gray grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 font-mono uppercase tracking-widest text-tui-dim">Core Stack</h2>
            <ul className="space-y-2 font-mono text-sm">
              <li className="flex items-center gap-2"><span className="text-tui-magenta">▸</span> TypeScript / Node.js</li>
              <li className="flex items-center gap-2"><span className="text-tui-cyan">▸</span> React / Next.js</li>
              <li className="flex items-center gap-2"><span className="text-tui-magenta">▸</span> Ruby on Rails</li>
              <li className="flex items-center gap-2"><span className="text-tui-cyan">▸</span> PostgreSQL / Redis</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-4 font-mono uppercase tracking-widest text-tui-dim">Connect</h2>
            <ul className="space-y-3 font-mono text-sm">
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-tui-cyan transition-colors group">
                  <Mail size={16} className="text-tui-dim group-hover:text-tui-cyan" />
                  hello@example.com
                </a>
              </li>
              <li>
                <a href="https://github.com/amcamargoc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Github size={16} className="text-tui-dim group-hover:text-white" />
                  github.com/amcamargoc
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
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