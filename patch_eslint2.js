const fs = require('fs');
let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');

content = content.replace(
    'const data = profileData as any;',
    '// eslint-disable-next-line @typescript-eslint/no-explicit-any\n    const data = profileData as any;'
);

content = content.replace(
    'return data.experiences.map((exp: any, i: number) => ({',
    '// eslint-disable-next-line @typescript-eslint/no-explicit-any\n      return data.experiences.map((exp: any, i: number) => ({'
);

content = content.replace(
    'const [experiences] = useState<any[]>(getInitialExperiences());',
    '// eslint-disable-next-line @typescript-eslint/no-explicit-any\n  const [experiences] = useState<any[]>(getInitialExperiences());'
);
fs.writeFileSync('src/components/views/ExperienceView.tsx', content);
