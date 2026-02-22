# Task: Auto Layout & Responsive Overhaul

## 📋 Objective
Implement a fluid, "auto-layout" system across all devices (mobile, tablet, desktop) to ensure the portfolio looks premium and functions perfectly on any screen size. This involves moving away from hardcoded breakpoints where possible and using modern CSS techniques (Grid auto-fit, Flexbox gap, Fluid typography, and Container Queries).

## 🛠️ Technical Strategy
1.  **Fluid Design Tokens**: Update `index.css` with fluid spacing (`clamp`) and typography variables.
2.  **Responsive Grid System**: Refactor `.grid-2`, `.grid-3`, etc., to use `auto-fit`/`auto-fill` so columns collapse naturally without explicit media queries for every component.
3.  **Auto Layout Utilities**: Create Flexbox-based utility classes that mimic Figma's "Auto Layout" behavior.
4.  **Component Refactoring**:
    -   `Hero.jsx`: Remove restrictive inline styles, improve title scaling.
    -   `Projects.jsx`: Enhance grid to be truly fluid.
    -   `Terminal.jsx`: Ensure it fits comfortably on small mobile screens.
    -   `Navbar.jsx`: Improve mobile menu transitions and spacing.

## 📅 Phases

### Phase 1: Foundation (CSS Tokens)
- [ ] Implement `--spacing-fluid` variables in `index.css`.
- [ ] Add `auto-layout` utility classes (Flex with gap).
- [ ] Update Typography to use `clamp()` for all headers.

### Phase 2: Structural Refactor
- [ ] Update `.container` behavior.
- [ ] Refactor `.grid-2` and `.grid-3` to use `grid-template-columns: repeat(auto-fit, minmax(..., 1fr))`.

### Phase 3: Component Polish
- [ ] **Hero**: Fix overlap issues on small screens.
- [ ] **Projects**: Ensure cards don't get too narrow or too wide.
- [ ] **Terminal**: Scale font and padding for mobile.
- [ ] **About/Services**: Adjust layout flow.

### Phase 4: Verification
- [ ] Run `ux_audit.py`.
- [ ] Verify responsiveness in browser for common device sizes.

## ⚠️ Edge Cases
-   **3D Background**: Performance on mobile (may need to reduce complexity).
-   **Magnetic Elements**: Touch devices don't have hover; ensure they don't break.
-   **Terminal Input**: Soft keyboard overlap on mobile.
