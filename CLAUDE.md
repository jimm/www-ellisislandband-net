# Ellis Island Band Website

Jekyll site for https://ellisislandrock.com. Generated HTML is in `_site` (ignore it).

## Site Structure

- `_config.yml` - Jekyll config, kramdown processor, jekyll-sitemap plugin
- `_layouts/` - default.html (with image modal), page.html, post.html
- `_includes/` - head.html, header.html, footer.html, social links, content helpers
- Root `.md` files - Pages (index, about, schedule, song-list, gallery, etc.)

## React Architecture

### Structure (src/)
- `schedule/` - Schedule page components (ScheduleApp → ScheduleList → ScheduleItem → Date/Info/Text/PosterImage)
- `song-list/` - Song list components (SongListApp → SongTable → SongRow)
- `gallery/` - Gallery components (ParkCityGallery, RandomIndexImage)
- `shared/` - Common utilities and components
  - `components/ImageModal.jsx` - Full-screen image modal (replaces js/image_modal.js)
  - `hooks/useDataFetcher.js` - Generic fetch hook (local file → API fallback)
  - `utils/dataFetcher.js` - fetchFromSource function
  - `utils/htmlHelpers.js` - HTML entity unescaping (with optional newline conversion)
  - `index.jsx` - Entry point for shared components (mounts ImageModal)

### Key Details

**BandHelper Integration:**
- Schedule: Fetches calendar feed, filters by category (Full Band/Acoustic/Private Event)
- Song list: Fetches smart list, filters out "Learning" songs, sortable columns
- Both fall back to local JSON files (updated hourly by cron)
- Custom fields: `custom_cC99h9` (description), `custom_CCMx5n` (poster URL), `custom_Kz3bz0` (poster alt), `custom_7CpO7C` (private flag)

**Integration with Legacy Code:**
- Uses `window.marked.parseInline()` for Markdown in descriptions
- Exposes `window.modal_image()` and `window.openImageModal()` from ImageModal component
- Uses existing CSS classes (no React-specific styles)

**Build (Vite):**
- Output: `schedule.bundle.js` (3.93 KB), `song-list.bundle.js` (2.78 KB), `image-modal.bundle.js` (0.95 KB), `park-city-gallery.bundle.js` (0.79 KB), `random-index-image.bundle.js` (0.62 KB), `assets/client-*.js` (~192 KB)
- Format: ES modules (type="module")

## Development Workflow

**Critical: BandHelper uses snake_case** (`date_display`, `date_start`). Never convert to camelCase.

**Setup:**
1. `make server` (Jekyll on localhost:4000)
2. `npm run watch` (auto-rebuild React on file changes)
3. Edit `src/schedule/`, `src/song-list/`, `src/gallery/`, or `src/shared/`

**Adding Features:**
- New component → `src/{schedule|song-list}/components/`
- App-specific utility → `utils/[name]Helpers.js`
- Shared utility → `src/shared/utils/` or `src/shared/hooks/`
- Check shared utilities before creating duplicates

**Vite Config:**
- Entries: `src/schedule/index.jsx`, `src/song-list/index.jsx`, `src/shared/index.jsx`, `src/gallery/park-city-index.jsx`, `src/gallery/random-index.jsx`
- Output: ES modules to `js/dist/`
- `process.env.NODE_ENV` defined as 'production'

**Common Issues:**
- "React is not defined" → Ensure Vite bundles React (not external), rebuild
- "process is not defined" → Check Vite `define` config, rebuild
- Changes not showing → Verify `npm run watch` running, hard refresh browser
- Data not loading → Check Network tab, verify JSON file or API accessible

**Deployment:** `make publish` runs `npm run build` + Jekyll build + rsync to server

## Legacy JavaScript (js/)

- `utils.js` - html_unescape(), get_json_data() (minimal usage)
- `all.js` - Concatenated production build
- External: jQuery 3.6.4, marked.min.js

Note: `schedule.js`, `song_list.js`, `image_modal.js`, and `park_city_gallery.js` replaced by React.

## Build & Dependencies

**Makefile:**
- `make server` - Jekyll dev server
- `make build` - npm build + concatenate legacy JS + Jekyll build
- `make publish` - Build + rsync to server

**Dependencies:**
- Ruby/bundler (Jekyll + plugins)
- Node.js/npm (React, ReactDOM, Vite)

**Documentation:** `docs/` contains planning documents. See `REACT_MIGRATION_PLAN.md`.
