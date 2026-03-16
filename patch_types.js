const fs = require('fs');

let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');

content = content.replace(
    'const data = profileData as Record<string, unknown>;',
    'const data = profileData as any;'
);
content = content.replace(
    'if (data.experiences && (data.experiences as Array<Record<string, unknown>>).length > 0) {',
    'if (data.experiences && data.experiences.length > 0) {'
);
content = content.replace(
    'return (data.experiences as Array<Record<string, unknown>>).map((exp, i) => ({',
    'return data.experiences.map((exp: any, i: number) => ({'
);
content = content.replace(
    'const [experiences] = useState<Array<Record<string, unknown>>>(getInitialExperiences());',
    'const [experiences] = useState<any[]>(getInitialExperiences());'
);

fs.writeFileSync('src/components/views/ExperienceView.tsx', content);
