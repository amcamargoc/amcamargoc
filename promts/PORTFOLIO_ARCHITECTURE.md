# Portfolio Architecture Plan

This document outlines the architectural plan for building the online
portfolio. It adopts a minimal, futuristic, dark-mode developer aesthetic
inspired by a Neovim TUI interface, incorporating the user's preferences for
purple (magenta) and cyan accents, smooth animations, and combined
typography (Inter + JetBrains Mono).

## Tech Stack

- **Framework:** Next.js (React) with TypeScript
- **Styling:** Tailwind CSS (for layout, utility classes, and custom TUI colors)
- **Animation:** Framer Motion (for smooth transitions and rounded card hover
  effects)
- **State Management:** Zustand (for managing open "buffers"/tabs and active
  views)
- **Deployment:** Vercel

---

## Phase 1: Project Setup & Initialization

*Goal: Bootstrap the project and configure the foundation.*

- **Task 1.1:** Initialize the Next.js application with TypeScript and
  Tailwind CSS.
- **Task 1.2:** Configure custom fonts. Load `Inter` for general UI text and
  `JetBrains Mono` for terminal/code-like elements.
- **Task 1.3:** Extend `tailwind.config.ts` with the custom color palette:
  - `tui-bg`: `#000000`
  - `tui-cyan`: `#00ffff`
  - `tui-magenta`: `#ff00ff`
  - `tui-gray`: `#333333`
  - `tui-dim`: `#666666`
- **Task 1.4:** Define global CSS. Add styles for custom narrow scrollbars,
  blinking cursor keyframes, and base styling (`bg-tui-bg`, `text-white`,
  `h-screen`, `overflow-hidden`).

## Phase 2: Core Layout Shell (The "TUI" Structure)

*Goal: Build the static shell surrounding the main content.*

- **Task 2.1: Header Component.** Build the top status bar displaying the mode
  ("NORMAL"), simulated file path (`~/alberto_camargo/init.lua`), encoding,
  and line coordinates.
- **Task 2.2: Sidebar (Explorer) Component.** Create a collapsible left sidebar
  showing a pseudo-directory tree (e.g., `/root`, `bio.md`, `projects/`,
  `experience.log`).
- **Task 2.3: Footer Component.** Build the bottom command line interface.
  Include git branch status, error/warning indicators, and a simulated command
  prompt (e.g., `:Telescope find_files`) with a blinking cursor block.
- **Task 2.4: Main Layout Shell.** Combine the Header, Sidebar, Footer, and a
  flexible central `<main>` container into a 100vh flexbox grid.

## Phase 3: Routing & State Management

*Goal: Manage the active "files" the user is viewing.*

- **Task 3.1: Global State.** Implement a lightweight Zustand store to track
  open tabs (buffers), the currently active tab, and sidebar visibility.
- **Task 3.2: Tab Bar Component.** Build the horizontal tab bar located at the
  top of the main view (e.g., `[1] dashboard`, `[2] mokoa.tsx`), allowing
  users to click and switch views.

## Phase 4: Main Content Area & Dashboard

*Goal: Implement the default landing view.*

- **Task 4.1: ASCII Art Logo.** Create a responsive component to render the
  "ALBERTO" ASCII text in `tui-magenta`.
- **Task 4.2: Interactive Menu List.** Build the menu items (Find Projects, Edit
  Bio, Recent Files, Quit) using bordered list items that apply cyan/magenta
  borders and text on hover.
- **Task 4.3: Active Preview Card.** Build a "Preview" card component with
  rounded corners, a subtle border, and smooth hover state. Include a grayscale
  image thumbnail that transitions to full color on hover.

## Phase 5: Content Views

*Goal: Build the detailed views for specific sections.*

- **Task 5.1: Projects View (`projects/`).** Create a grid of project cards
  featuring the minimal, futuristic styling (Vercel/Linear-esque but adapted
  to the TUI palette).
- **Task 5.2: Bio View (`bio.md`).** Create a component that renders the user's
  background and skills, mimicking a markdown file reading experience.
- **Task 5.3: Experience View (`experience.log`).** Build a chronological
  timeline or log format displaying past roles.

## Phase 6: Polish & Interactivity

*Goal: Bring the app to life with animations and final details.*

- **Task 6.1: LSP Notification Toast.** Create a floating absolute-positioned
  notification box (e.g., "COSMIC_ENGINE LOADED") that enters with a Framer
  Motion slide-in animation.
- **Task 6.2: Smooth Transitions.** Add Framer Motion `AnimatePresence` to
  fade/slide between tab content smoothly.
- **Task 6.3: Keyboard Shortcuts (Optional).** Implement global event listeners
  to allow basic keyboard navigation (e.g., pressing `[e]` to open bio, `[f]`
  to open projects).
- **Task 6.4: Responsive Design.** Ensure the TUI adapts to mobile devices by
  making the sidebar a slide-out drawer or hiding it, and scaling down ASCII
  art/font sizes.

## Phase 7: Deployment

*Goal: Ship the portfolio.*

- **Task 7.1:** Run accessibility and performance audits.
- **Task 7.2:** Deploy the application to Vercel, ensuring environment
  variables and build settings are correctly configured.
