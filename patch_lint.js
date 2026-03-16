const fs = require('fs');
let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');

content = content.replace(
    'import { GitCommitHorizontal, GitCommit, Clock, Building2, TerminalSquare } from "lucide-react";',
    'import { GitCommitHorizontal, Clock, Building2, TerminalSquare } from "lucide-react";'
);
content = content.replace('const data = profileData as any;', 'const data = profileData as Record<string, unknown>;');
content = content.replace('return data.experiences.map((exp: any, i: number) => ({', 'return (data.experiences as Array<Record<string, unknown>>).map((exp, i) => ({');
content = content.replace('const [experiences] = useState<any[]>(getInitialExperiences());', 'const [experiences] = useState<Array<Record<string, unknown>>>(getInitialExperiences());');
content = content.replace('{exp.description || exp.desc}', '{String(exp.description || exp.desc)}');

fs.writeFileSync('src/components/views/ExperienceView.tsx', content);
