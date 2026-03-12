INPUT:
@[/promto] focus on sidebar refactoring and do the follow changes:
- side bar close but we are not able to opent it again. remove the option of making sidebar closable
- refactor and migrate the navagation files views to the following structure
/humans/character/beto/ (main folder, un-closable)
/humans/character/beto/index.md
/humans/character/beto/projects/index.md
/humans/character/beto/projects/muikao.md
/humans/character/beto/projects/führerschein_fragen.md
/humans/character/beto/projects/the_cosmic_games.md
/humans/character/beto/bio.md
/humans/character/beto/experience.md
- improve parent folder and content using vertical line to make indentation more obvious

OUTPUT:
# Sidebar & Navigation Refactoring Task

Refactor the application's sidebar and navigation structure to improve stability and visual hierarchy.

## 1. Sidebar Functional Changes
- **Disable Closability**: Remove the functionality that allows the sidebar to be collapsed. The sidebar should remain permanently visible on the page.
- **Fix "Open" Bug**: Address the current issue where the sidebar cannot be reopened once closed by removing the toggle mechanism entirely.

## 2. Navigation Structure Migration
Reorganize the navigation menu and migrate its content to the following nested hierarchy. Ensure the root folder remains un-closable:
- `/humans/character/beto/` (Un-closable Root)
  - `index.md` (Overview)
  - `projects/`
    - `index.md`
    - `muikao.md`
    - `führerschein_fragen.md`
    - `the_cosmic_games.md`
  - `bio.md`
  - `experience.md`

## 3. Visual Interface Enhancements
- **Indentation Guide**: Implement vertical lines for nested navigation items to clearly indicate parent-child relationships and improve scannability.
- **Styling**: Ensure the vertical guide is subtle and integrates well with the existing theme.

## 4. Technical Implementation
- Update `Sidebar.tsx` and any related navigation data structures to reflect these changes.
- Ensure all links and route mappings are updated to match the new file structure.
