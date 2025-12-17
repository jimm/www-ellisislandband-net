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

Located in `js/` directory:

### Core Files
- **`schedule.js`** - Fetches schedule data from BandHelper API and renders
  upcoming gigs. Handles full band gigs, acoustic gigs, and private events.
  Displays dates, venue info, addresses (with Google Maps links), and poster
  images. Currently being migrated to React components.

- **`utils.js`** - Shared utilities:
  - `html_unescape()` - Parses HTML entities from JSON data
  - `get_json_data()` - Fetches JSON from local file or remote API with
    fallback logic

- **`image_modal.js`** - Modal functionality for viewing images full-screen

- **`song_list.js`** - Handles song list display functionality

- **`park_city_gallery.js`** - Gallery-specific functionality

- **`all.js`** - Concatenated version of all JS files (for production)

### Schedule System Details

The schedule system (`js/schedule.js`) is the most complex JavaScript:
- Fetches from BandHelper calendar feed (bandhelper.com)
- Falls back to local `schedule.json` file (updated by cron job)
- Filters by category: Full Band Gig, Acoustic Gig, or Private Event
- Renders two layouts:
  - 3-column (date | info | poster) when poster exists
  - 2-column (date | info) when no poster
- Custom fields from BandHelper:
  - `custom_cC99h9` - Gig description (Markdown)
  - `custom_CCMx5n` - Poster image name/URL
  - `custom_Kz3bz0` - Poster alt text
  - `custom_7CpO7C` - Display as private flag
- Uses marked.js to parse Markdown in descriptions
- Integrates with modal system for poster image viewing

### External Dependencies (in head.html)
- jQuery 3.6.4 - Used for AJAX and DOM manipulation
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
Scripts are loaded individually in development mode (see head.html comments).
The site uses a "make publish" command that switches to the concatenated
all.js file for production.

### Branch Strategy
- Main branch: `main`
- Current branch: `react` (for React migration work)

