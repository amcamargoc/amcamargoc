const fs = require('fs');

let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');
content = content.replace(
    'import { GitCommitHorizontal, GitCommit, Clock, Building2, TerminalSquare } from "lucide-react";',
    'import { GitCommitHorizontal, Clock, Building2, TerminalSquare } from "lucide-react";'
);
fs.writeFileSync('src/components/views/ExperienceView.tsx', content);

let content2 = fs.readFileSync('src/components/views/BioView.tsx', 'utf8');
content2 = content2.replace(
    'import { Terminal, Github, Linkedin, Mail, Loader2, ArrowRight } from "lucide-react";',
    'import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";'
);
content2 = content2.replace(
    'import { useState, useEffect } from "react";',
    'import { useState } from "react";'
);
fs.writeFileSync('src/components/views/BioView.tsx', content2);

let content3 = fs.readFileSync('src/components/views/ProjectsView.tsx', 'utf8');
content3 = content3.replace(
    'import { FolderGit2, Star, GitFork, Circle, ExternalLink, Github, Database } from "lucide-react";',
    'import { FolderGit2, Star, GitFork, Circle, ExternalLink, Github } from "lucide-react";'
);
fs.writeFileSync('src/components/views/ProjectsView.tsx', content3);
