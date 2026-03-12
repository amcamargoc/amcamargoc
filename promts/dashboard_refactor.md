INPUT:
@[/promto]use the following links as inspiration to refactor only the entry page, color changes are not yet required. only how the information is being showed https://ubunlog.com/wp-content/uploads/2018/05/about-neovim.png.webp or https://github.com/mhinz/vim-startify/blob/master/images/startify-menu.png do not use big images or big ascii art

OUTPUT:
# Dashboard UI Refactor: Neovim & Startify Aesthetic

Refactor the entry page (`DashboardView.tsx`) and its child components to match the minimalist, text-centric design of the Neovim `:about` page and the `vim-startify` plugin.

## 1. Minimalist Header
- **Reduce ASCII Size**: Replace the current large ASCII logo with a minimalist 1-2 line version or a sleek text-based identifier.
- **Metadata Integration**: Integrate version info, system stats, or "developer details" in a compact Neovim-style block.

## 2. Information Layout (Startify Style)
- **Vertical Grouping**: Organize the menu into distinct sections like `[ Bookmarks ]`, `[ Recent ]`, and `[ Commands ]`.
- **Indexed Lists**: Each navigation item should be a single line prefixed with a bracketed key or index (e.g., `[b] Bio`, `[p] Projects`).
- **Remove Box Layout**: Eliminate heavy borders, large padding, and grid-based boxes. The information should flow vertically with plenty of whitespace.

## 3. Interaction & Visuals
- **Text-Only Design**: Focus on typography and character-based markers rather than images or graphical UI elements.
- **Subtle Hovers**: Use subtle text color changes or minimalist markers to indicate selection/hover, keeping the "terminal" vibe.

## 4. Technical Scope
- Update `DashboardView.tsx`, `AsciiLogo.tsx`, and `InteractiveMenu.tsx`.
- Ensure all navigation triggers (`openTab`) remain functional within the new layout.

---
### Prompt Quality Opinion
The prompt is excellent in its use of visual references (`Neovim`, `Startify`) which immediately communicate a specific aesthetic ("TUI Modernist"). The negative constraints ("no big images", "no big ascii art") are clear and helpful for narrowing down the design space. One minor improvement could be explicitly mentioning which files constitute the "entry page" to save the LLM time on discovery.
