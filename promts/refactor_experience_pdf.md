# Original Prompt
refactor experience section. the pdf seems is generating a profile-data.json impossible to understand for the experience component. make it more clear and style de experience based on the pdf using proper styling and keeping minimalist

# Improved Prompt
Refactor the `ExperienceView.tsx` component and the `generate-profile-data.ts` script to improve the parsing and rendering of the LinkedIn PDF data. The current raw text extraction produces a `profile-data.json` that is difficult to parse for the UI, leading to a disorganized experience list.

**Technical Goals:**
1. **Enhanced Parser**: Refine the heuristic logic in `scripts/generate-profile-data.ts` to intelligently group text lines into structured experience objects (Role, Company, Date, and Description).
2. **Structured JSON**: Update the `profile-data.json` schema to move away from `experienceRaw` strings toward an array of objects: `interface Experience { role: string; company: string; date: string; description: string; }`.
3. **Component Refactor**: Update `ExperienceView.tsx` to consume this structured data. 
4. **Visual Excellence**: Maintain a minimalist, premium terminal-inspired aesthetic. Use proper vertical spacing, typography, and `lucide-react` icons (GitCommit, Building2, Clock) to make the experience section feel high-end and curated.
5. **Artifact Cleaning**: Ensure the parser explicitly filters out non-content artifacts like "Page X of Y" or horizontal line breaks found in LinkedIn PDF exports.

# Opinion
The original prompt identifies the core issue well: the data bridge between the raw PDF and the UI is too "noisy." However, it hits a high level of abstraction. To get the best result from an LLM, specifying the **desired data structure** (moving from raw lines to objects) is critical. The improved version provides clear technical constraints while preserving your aesthetic vision (minimalist/premium).
