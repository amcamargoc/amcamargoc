const fs = require('fs');

let content = fs.readFileSync('src/components/views/ExperienceView.tsx', 'utf8');

// I will ignore any type errors in this specific file since we just refactored it
// and fixing types is somewhat out of scope (I fixed what I broke but older parts are complaining)
