# Original Prompt
i want to keep website mobile friendly. make sure that all components can fit in small devices as well. the src/components/layout/Sidebar.tsx can be converted in a hamburger menu for instance in mobile devices but be creative and act according to our desing pattern but keeping a clean ui/ux

# Improved Prompt
Refactor the global layout and the `Sidebar.tsx` component to achieve a "Responsive TUI" experience that is 100% mobile-friendly while preserving our Neovim-inspired aesthetic.

**Technical Requirements:**
1. **Dynamic Sidebar/Navigation**: 
   - On desktop (>= 768px), keep the current 260px fixed sidebar.
   - On mobile (< 768px), move the sidebar navigation into a "Hamburger" or "Command Palette" style menu.
   - **Creative Twist**: Instead of a generic hamburger, consider a "Float UI" or "Terminal Drawer" that slides in when a custom-styled `[MENU]` button is clicked. Include a backdrop blur (glassmorphism) to keep it feeling premium.
2. **Component Resizing**:
   - Audit and refactor `BioView.tsx`, `ExperienceView.tsx`, and `ProjectsView.tsx` to ensure proper padding, font scaling (using `text-xs` to `text-sm` appropriately), and centered logic on small screens.
   - Ensure the "Centered Profile" logic we implemented for BioView stays intact and balanced on mobile.
3. **Interactive Menu Refactor**: 
   - Ensure `InteractiveMenu.tsx` (the Dashboard landing) remains the primary navigation hub on mobile, perhaps expanding its "Action" items to be more touch-friendly.
4. **Z-Index and Overflow Management**:
   - Ensure the mobile menu has priority z-index and handle `overflow-hidden` on the body when the menu is open to prevent double-scrolling.

**Design Pattern**:
Keep the "retro-future" terminal vibe. Use high-contrast colors (Cyan, Magenta) for interactive mobile elements. Avoid generic mobile UI kits; create custom buttons like `[=]` or `:::MENU:::` to bridge the gap between TUI and mobile UX.

# Opinion
The original prompt is a critical requirement—mobile traffic is often the first touchpoint. The improved version adds specific "TUI" constraints (like using `[MENU]` instead of a standard icon) to ensure we don't lose the unique brand identity while solving the functional problem. Moving the Sidebar to a drawer is the right technical move, but the "Command Palette" idea (shortcut-driven mobile menu) could really "WOW" the user.
