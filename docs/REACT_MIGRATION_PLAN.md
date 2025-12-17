# Plan: Adding React to Jekyll Site & Converting Schedule to Components

## Status: ✅ COMPLETED

**Completion Date:** December 17, 2025

All three phases of the React migration have been successfully completed. The
schedule page now uses React components with full feature parity to the
original vanilla JavaScript implementation.

**Final Bundle:** 196.97 KB (61.94 KB gzipped)
**Components:** 7 React components + custom hook + utilities
**Build Tool:** Vite with production optimizations

## Overview

This plan outlines how to integrate React into the existing Jekyll website and
convert `js/schedule.js` into React components. The approach maintains
Jekyll's static site generation while adding React for interactive features.

## Current State Analysis

**Current Implementation:**
- Jekyll static site generator
- Vanilla JavaScript with jQuery for DOM manipulation
- `js/schedule.js` fetches JSON from BandHelper API
- Renders schedule directly as HTML strings
- No existing npm/build tooling

**Key Files:**
- `js/schedule.js` - 129 lines of vanilla JS rendering logic
- `js/utils.js` - Utility functions (JSON fetching, HTML unescaping)
- `schedule.md` - Markdown page with `<div id="schedule-list"></div>`
- `_includes/head.html` - Script includes

## Implementation Strategy

### Approach: Hybrid Jekyll + React

We'll use a **hybrid approach** where:
1. Jekyll continues to generate the static HTML structure
2. React hydrates specific DOM elements for interactive features
3. Build tools (Webpack/Vite) bundle React components
4. Jekyll includes the bundled React output

**Why this approach:**
- Minimal disruption to existing Jekyll workflow
- Progressive enhancement - React only where needed
- Maintains static site benefits (SEO, performance)
- Can gradually convert other features to React

## Detailed Implementation Plan

### Phase 1: Setup Build Environment

**1.1 Initialize npm project**
```bash
npm init -y
```

**1.2 Install React dependencies**
```bash
npm install react react-dom
npm install --save-dev @babel/core @babel/preset-react \
  @babel/preset-env webpack webpack-cli babel-loader \
  css-loader style-loader
```

**1.3 Alternative: Use Vite (recommended for simpler setup)**
```bash
npm install --save-dev vite @vitejs/plugin-react
```

**1.4 Create build configuration**
- For Webpack: `webpack.config.js`
- For Vite: `vite.config.js`
- Configure to output to `js/dist/` or similar
- Entry point: `src/schedule/index.jsx`

**1.5 Update .gitignore**
```
node_modules/
js/dist/
```

**1.6 Add npm scripts to package.json**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "watch": "vite build --watch"
  }
}
```

### Phase 2: Create React Component Structure

**2.1 Component Architecture**

Proposed component hierarchy:
```
ScheduleApp (main container)
├── ScheduleList (list container)
│   └── ScheduleItem (individual gig)
│       ├── ScheduleDate (month/day display)
│       ├── ScheduleInfo (venue, address)
│       ├── ScheduleText (name, description)
│       └── PosterImage (optional poster)
```

**2.2 File Structure**
```
src/
  schedule/
    index.jsx                 # Entry point, renders ScheduleApp
    components/
      ScheduleApp.jsx          # Main container, data fetching
      ScheduleList.jsx         # List wrapper
      ScheduleItem.jsx         # Individual gig item
      ScheduleDate.jsx         # Date display component
      ScheduleInfo.jsx         # Venue/address info
      ScheduleText.jsx         # Name/description
      PosterImage.jsx          # Poster image with modal
    hooks/
      useScheduleData.js       # Custom hook for data fetching
    utils/
      scheduleHelpers.js       # Pure functions from schedule.js
      constants.js             # MONTHS, categories, etc.
    styles/
      schedule.css             # Component-specific styles
```

**2.3 Data Flow**
```
1. ScheduleApp mounts to #schedule-list div
2. useScheduleData hook fetches JSON (from file or API)
3. Data filtered and processed
4. ScheduleList receives gigs array as props
5. Maps to ScheduleItem components
6. Each ScheduleItem renders date, info, text, poster
```

### Phase 3: Component Implementation Details

**3.1 Constants Module** (`src/schedule/utils/constants.js`)
- Extract MONTHS array
- Extract category constants
- Extract URL configurations
- Keep all magic strings in one place

**3.2 Helper Functions** (`src/schedule/utils/scheduleHelpers.js`)
- Port pure functions from schedule.js:
  - Date formatting logic
  - Address link generation
  - Poster URL extraction
  - Display logic (is_private_event, is_acoustic)
- Make these pure, testable functions

**3.3 Custom Hook** (`src/schedule/hooks/useScheduleData.js`)
```jsx
// Handles data fetching logic
// Returns: { gigs, loading, error }
// Implements fallback from file to API
```

**3.4 ScheduleApp Component**
- Uses useScheduleData hook
- Handles loading/error states
- Passes processed data to ScheduleList
- Manages any global state

**3.5 ScheduleItem Component**
- Receives gig object as prop
- Determines layout (with/without poster)
- Composes child components
- Handles responsive layout

**3.6 PosterImage Component**
- Image display with onclick handler
- Integrate with existing modal (modal_image function)
- Or create React-based modal

### Phase 4: Integration with Jekyll

**4.1 Build React bundle**
```bash
npm run build
```
- Output: `js/dist/schedule.bundle.js`

**4.2 Update _includes/head.html**
```html
<!-- React Scripts -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Schedule React Component -->
<script type="text/javascript" src="js/dist/schedule.bundle.js"></script>
```

**4.3 Update schedule.md**
```markdown
---
layout: default
title: Schedule
---

# Schedule

## Upcoming

<div id="schedule-list"></div>
<!-- React component will mount here automatically -->
```

**4.4 Remove old schedule.js reference**
- Remove from _includes/head.html development section
- Keep as reference during migration

### Phase 5: Styling Considerations

**5.1 CSS Strategy Options**

**Option A: Keep existing CSS**
- React components use existing class names
- Minimal CSS changes
- Simplest migration path

**Option B: CSS Modules**
- Scoped component styles
- Prevents style conflicts
- Requires build configuration

**Option C: Styled Components**
- CSS-in-JS approach
- Component-scoped styles
- Adds dependency

**Recommendation:** Start with Option A (existing CSS), migrate to CSS
Modules if style conflicts arise.

**5.2 Maintain existing CSS classes**
- `.schedule` (table class)
- `.schedule-date`, `.schedule-info`, `.schedule-text`
- `.schedule-name`, `.schedule-description`
- `.row`, `.column`, `.left`, `.middle`, `.right`
- `.acoustic`, `.band`

### Phase 6: Data Fetching Approach

**6.1 Current Approach Analysis**
- Uses jQuery $.ajax
- Tries local file first, then API
- Callback-based

**6.2 React Approach Options**

**Option A: Fetch API with React hooks**
```jsx
useEffect(() => {
  fetch('schedule.json')
    .then(res => res.json())
    .then(setGigs)
    .catch(() => fetch(API_URL)...)
}, [])
```

**Option B: Keep utils.js, call from React**
- Wrap get_json_data in Promise
- Use in useEffect
- Maintains compatibility

**Option C: Use data fetching library**
- React Query, SWR, etc.
- Adds caching, refetch logic
- May be overkill

**Recommendation:** Option B for initial migration (minimal changes),
consider Option A to remove jQuery dependency.

### Phase 7: Modal Integration

**7.1 Current Modal**
- Defined in _layouts/default.html
- vanilla JS onclick handler (modal_image function)
- In js/image_modal.js

**7.2 Integration Options**

**Option A: Keep existing modal**
- PosterImage calls existing modal_image function
- No changes to modal code
- Works but not "React-like"

**Option B: Create React modal component**
- Full React modal system
- Better state management
- More refactoring required

**Recommendation:** Option A initially, Option B in future phase.

### Phase 8: Dependencies Management

**8.1 Current External Dependencies**
- jQuery 3.6.4
- marked.js (Markdown parser)

**8.2 React-Compatible Alternatives**

For Markdown parsing:
- `react-markdown` package
- Or keep marked.js, call in component

**8.3 Strategy**
- Phase 1: Keep jQuery and marked.js (minimize risk)
- Phase 2: Replace marked with react-markdown
- Phase 3: Remove jQuery once all features converted

### Phase 9: Testing Strategy

**9.1 Manual Testing Checklist**
- [ ] Schedule data loads from JSON file
- [ ] Schedule data loads from API (when file unavailable)
- [ ] Full band gigs display correctly
- [ ] Acoustic gigs display with "(Acoustic)" note
- [ ] Private events display correctly
- [ ] Dates format correctly (month, day name, day number)
- [ ] Venue names and addresses display
- [ ] Google Maps links work
- [ ] Posters display when available
- [ ] Poster layout (3-column) renders correctly
- [ ] Non-poster layout (2-column) renders correctly
- [ ] Markdown in descriptions renders
- [ ] Modal opens on poster click
- [ ] Responsive layout works

**9.2 Automated Testing (future)**
- Jest for unit tests
- React Testing Library for component tests
- Test pure functions in scheduleHelpers.js

### Phase 10: Build & Deployment Integration

**10.1 Development Workflow**

Terminal 1 - Jekyll:
```bash
bundle exec jekyll serve --livereload
```

Terminal 2 - React build:
```bash
npm run watch
```

**10.2 Production Build**
```bash
npm run build           # Build React bundle
bundle exec jekyll build # Build Jekyll site
```

**10.3 Update Makefile (if exists)**
```makefile
build:
    npm run build
    bundle exec jekyll build

serve:
    npm run watch & bundle exec jekyll serve
```

## Migration Checklist

### Setup Phase
- [ ] Initialize npm project
- [ ] Install React and build dependencies
- [ ] Configure build tool (Webpack or Vite)
- [ ] Create src/ directory structure
- [ ] Update .gitignore

### Component Development Phase
- [ ] Create constants.js with all constants
- [ ] Create scheduleHelpers.js with pure functions
- [ ] Implement useScheduleData hook
- [ ] Create ScheduleDate component
- [ ] Create ScheduleInfo component
- [ ] Create ScheduleText component
- [ ] Create PosterImage component
- [ ] Create ScheduleItem component
- [ ] Create ScheduleList component
- [ ] Create ScheduleApp container

### Integration Phase
- [ ] Build React bundle
- [ ] Update _includes/head.html with React scripts
- [ ] Update schedule.md (remove old script call)
- [ ] Test locally with Jekyll serve
- [ ] Verify all features work
- [ ] Remove old js/schedule.js reference

### Polish Phase
- [ ] Run through testing checklist
- [ ] Fix any styling issues
- [ ] Optimize bundle size
- [ ] Add error boundaries
- [ ] Document new build process
- [ ] Update README with React setup instructions

## Rollback Plan

If issues arise:
1. Keep old `js/schedule.js` file (don't delete)
2. Revert `_includes/head.html` changes
3. Restore old script tag in schedule.md
4. Site returns to original functionality

## Future Enhancements

Once React is working:
1. Convert other interactive features (song_list.js, gallery) to React
2. Add state management (Context or Redux) if needed
3. Implement React-based modal system
4. Add transitions/animations with Framer Motion
5. Progressive Web App features
6. TypeScript migration
7. Unit and integration tests
8. Performance optimization (code splitting, lazy loading)

## Estimated Scope

**Small Tasks (< 1 hour):**
- Setup npm and install dependencies
- Create constants and helper files
- Individual small components (ScheduleDate, etc.)

**Medium Tasks (1-3 hours):**
- Configure build tool
- Implement useScheduleData hook
- Main ScheduleApp and integration
- Testing and debugging

**Total Estimated Time:** 4-8 hours depending on familiarity with tooling

## Key Decisions Required

Before starting, decide:
1. **Build tool:** Webpack vs Vite (recommend: Vite for simplicity)
2. **Styling:** Existing CSS vs CSS Modules vs Styled Components
   (recommend: existing CSS)
3. **Data fetching:** Keep jQuery or use Fetch API
   (recommend: keep jQuery initially)
4. **Modal:** Keep existing or create React version
   (recommend: keep existing)
5. **Dependencies:** Keep or replace marked.js
   (recommend: keep initially)

## Questions to Consider

1. Should we convert other JS files at the same time?
2. Do we want TypeScript for type safety?
3. Should we set up automated testing from the start?
4. What's the browser support requirement? (affects build config)
5. Will other pages need React components?

## References & Resources

- [Using React with Jekyll](https://forestry.io/blog/using-create-react-app-with-jekyll/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Webpack Documentation](https://webpack.js.org/)
