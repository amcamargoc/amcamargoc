const fs = require('fs');
let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');

content = content.replace(
    'if (data.experiences && data.experiences.length > 0) {',
    'if (data.experiences && (data.experiences as Array<Record<string, unknown>>).length > 0) {'
);

fs.writeFileSync('src/components/views/ExperienceView.tsx', content);
