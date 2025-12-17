# Ellis Island Band Website

This is a Jekyll project that generates the [Ellisi Island
Band](https://ellisislandrock.com/) website. Jekyll generates an HTML site
from Markdown files. The generated HTML is in `_site` so you can ignore
those files.

## Site Structure

### Configuration
- `_config.yml` - Jekyll configuration with site metadata (title, email,
  social media usernames)
- Uses kramdown for Markdown processing
- Plugins: jekyll-sitemap

### Layouts (_layouts/)
- `default.html` - Base layout with modal for image viewing
- `page.html` - Page layout
- `post.html` - Blog post layout

### Includes (_includes/)
- `head.html` - HTML head with meta tags, CSS, and script includes
- `header.html` - Site header/navigation
- `footer.html` - Site footer
- Social media link components (bluesky_link.html, facebook_link.html, etc.)
- Content helpers (pic.html, video_tag.html, yt_vid.html)

### Pages (Markdown files in root)
- `index.md` - Home page
- `about.md` - Band information
- `schedule.md` - Upcoming gigs (uses React/JS to load dynamic content)
- `song-list.md` - Band's song repertoire
- `gallery.md` - Photo gallery
- `stage-plot.md` - Technical stage setup
- `contact.md` - Contact information

## JavaScript Architecture

### React Components (src/schedule/)

The schedule system is implemented as a React application:

**Component Structure:**
- `ScheduleApp.jsx` - Main container with data fetching and state management
- `ScheduleList.jsx` - List wrapper for all gig items
- `ScheduleItem.jsx` - Individual gig display with layout logic
- `ScheduleDate.jsx` - Date display (month/day/day-name)
- `ScheduleInfo.jsx` - Venue and address with Google Maps links
- `ScheduleText.jsx` - Gig name, description, and notes
- `PosterImage.jsx` - Poster display with modal integration

**Utilities:**
- `hooks/useScheduleData.js` - Custom hook for data fetching with fallback
- `utils/constants.js` - All constants (months, categories, field mappings)
- `utils/scheduleHelpers.js` - Pure functions for data processing

**Features:**
- Fetches from BandHelper calendar feed (bandhelper.com)
- Falls back to local `schedule.json` file (updated by cron job)
- Filters by category: Full Band Gig, Acoustic Gig, or Private Event
- Two responsive layouts:
  - 3-column (date | info | poster) when poster exists
  - 2-column (date | info) when no poster
- Custom fields from BandHelper:
  - `custom_cC99h9` - Gig description (Markdown)
  - `custom_CCMx5n` - Poster image name/URL
  - `custom_Kz3bz0` - Poster alt text
  - `custom_7CpO7C` - Display as private flag
- Uses marked.js to parse Markdown in descriptions
- Integrates with existing modal system for poster image viewing
- Loading and error states

**Build:**
- Built with Vite as IIFE bundle
- Output: `js/dist/schedule.bundle.iife.js` (197 KB, 62 KB gzipped)
- React bundled with production optimizations

### React Development Guide

**Important: Field Naming Convention**

BandHelper API returns data in **snake_case** (e.g., `date_display`,
`date_start`, `is_private_event`). Always use snake_case when accessing API
data fields in components and destructuring props. Do NOT convert to
camelCase.

✅ Correct: `const { date_display, date_start } = gig;`
❌ Wrong: `const { dateDisplay, dateStart } = gig;`

**Development Workflow:**

1. Start Jekyll dev server: `make server` (runs on localhost:4000)
2. In separate terminal, start React watch: `npm run watch`
3. Edit files in `src/schedule/`
4. Vite automatically rebuilds bundle
5. Refresh browser to see changes (Jekyll auto-regenerates)

**Adding New Features:**

To add a new feature to the schedule:

1. **New component:** Create in `src/schedule/components/`
2. **New utility:** Add to `src/schedule/utils/scheduleHelpers.js`
3. **New constant:** Add to `src/schedule/utils/constants.js`
4. **Rebuild:** `npm run build` (or use `npm run watch`)

**Modifying Existing Components:**

- Keep components small and focused (single responsibility)
- Extract pure functions to `scheduleHelpers.js`
- Use existing CSS classes (defined in site's main.css)
- Test both 2-column and 3-column layouts if modifying layout logic

**Integration with Legacy Code:**

The React components integrate with existing vanilla JavaScript:

- **Markdown rendering:** Uses `window.marked.parseInline()` from marked.js
  CDN
- **Image modal:** Calls `window.modal_image()` from `js/image_modal.js`
- **CSS classes:** Uses existing schedule CSS classes (no React-specific
  styles)

These global functions must remain available for React components to work.

**Data Flow:**

```
BandHelper API or schedule.json
         ↓
useScheduleData hook (fetches & processes)
         ↓
ScheduleApp (manages state)
         ↓
ScheduleList (maps array)
         ↓
ScheduleItem (layout logic)
         ↓
ScheduleDate, ScheduleInfo, ScheduleText, PosterImage
```

**Build Configuration (vite.config.js):**

- Entry point: `src/schedule/index.jsx`
- Output format: IIFE (Immediately Invoked Function Expression)
- React bundled (not external)
- `process.env.NODE_ENV` defined as 'production'
- Output directory: `js/dist/`

**Common Tasks:**

*Add new gig field display:*
1. Check field name in BandHelper API response (snake_case)
2. Add constant to `constants.js` if needed
3. Add helper function to `scheduleHelpers.js` if processing needed
4. Update appropriate component to display field
5. Rebuild with `npm run build`

*Modify layout logic:*
- Edit `ScheduleItem.jsx` (controls 2-column vs 3-column)
- Uses `hasPoster()` helper to determine layout

*Change data fetching:*
- Edit `hooks/useScheduleData.js`
- Currently tries local file first, then API
- Returns `{ gigs, loading, error }`

*Update styling:*
- Modify existing CSS in site's main.css (not in React components)
- React components use className to reference existing styles

**Testing:**

1. Run Jekyll server: `make server`
2. Visit http://localhost:4000/schedule.html
3. Check browser console for errors
4. Test all gig types: full band, acoustic, private events
5. Test with/without poster images
6. Test loading state (throttle network)
7. Test error state (break API URL in constants.js temporarily)

**Troubleshooting:**

*"React is not defined" error:*
- Check Vite config has React bundled (not external)
- Rebuild with `npm run build`

*"process is not defined" error:*
- Check Vite config has `define: { 'process.env.NODE_ENV': ... }`
- Rebuild with `npm run build`

*Changes not appearing:*
- Ensure `npm run watch` is running OR run `npm run build`
- Hard refresh browser (Cmd+Shift+R / Ctrl+F5)
- Check Jekyll regenerated (look for "Regenerating" in Jekyll output)

*Data not loading:*
- Check browser Network tab for failed requests
- Verify schedule.json exists OR BandHelper API is accessible
- Check console for fetch errors from useScheduleData hook

**Production Deployment:**

The `make publish` command handles everything:
1. Runs `npm run build` (creates optimized React bundle)
2. Builds Jekyll site (copies bundle to `_site/js/dist/`)
3. Uploads `_site/` to server via rsync

The React bundle is automatically included in the Jekyll build output, so no
special deployment steps are needed.

### Legacy JavaScript (js/ directory)

- **`utils.js`** - Shared utilities (still used by other pages):
  - `html_unescape()` - Parses HTML entities from JSON data
  - `get_json_data()` - Fetches JSON from local file or remote API

- **`image_modal.js`** - Modal functionality for viewing images full-screen

- **`song_list.js`** - Handles song list display functionality

- **`park_city_gallery.js`** - Gallery-specific functionality

- **`all.js`** - Concatenated version of all JS files (for production)

### External Dependencies (in head.html)
- jQuery 3.6.4 - Used by legacy scripts
- marked.min.js - Markdown parser for gig descriptions

## Documentation

The `docs/` directory contains planning and architecture documents for this
project. All future planning documents and architectural decision records
should be placed there.

Current documents:
- `docs/REACT_MIGRATION_PLAN.md` - Detailed plan for migrating
  `js/schedule.js` to React components using a hybrid Jekyll + React approach

## Build & Deployment

The Makefile defines various tasks used to build and deploy the site.

### Development Workflow

**Running locally:**
```bash
make server  # Starts Jekyll dev server on localhost:4000
```

For React development, run the React build in watch mode in a separate
terminal:
```bash
npm run watch  # Rebuilds React bundle on file changes
```

### Production Build

The `make build` command:
1. Builds React bundle with Vite (`npm run build`)
2. Concatenates vanilla JS files into `all.js`
3. Builds Jekyll site
4. Cleans up generated files
5. Switches from individual scripts to concatenated versions

### Dependencies

**Ruby/Jekyll:**
- Ruby with bundler
- Jekyll and plugins (see Gemfile)

**Node.js/npm:**
- Node.js (for npm)
- React, ReactDOM
- Vite build tool
- Run `npm install` to install dependencies

