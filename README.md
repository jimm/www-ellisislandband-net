# Ellis Island Band Website

This repo contains the source code for
[https://ellisislandrock.com](https://ellisislandrock.com). It's built with
[Jekyll](https://jekyllrb.com/) and [React](https://react.dev/). The was
repo is named when we had our old domain `ellisislandband.net`.

## What Gets Displayed

### Gigs

Any gig in BandHelper that is in the Ellis Island project and has a category
of either "Full Band Gig" or "Acoustic Gig" will show up on the site's
schedule page. It must also have the options "Include in website widget" and
"Confirmed" checked.

### Songs

Any song in BandHelper that is in the Ellis Island project, is Active, and
does _not_ have either of the "Learning" or "Hide on site" labels will show
up on the site's song list page. The "Acoustic" label determines if it will
be hidden by default and only shown if that page's "Include Acoustic-Only
Songs" checkbox is checked.

## Colors / CSS

Main site color definitions are in [\_sass/\_vars.scss](_sass/_vars.scss).
Header h1, h2, colors are set in [css/main.scss](css/main.scss).

## Setup & Development

See also [CLAUDE.md](CLAUDE.md).

**Prerequisites:** Ruby and `bundler`, Node.js/`npm`, SSH (for publishing)

**Install:**
```bash
bundle install  # Ruby dependencies
npm install     # Node.js dependencies
```

**Development:**
```bash
make server     # Jekyll dev server (localhost:4000)
npm run watch   # Auto-rebuild React (separate terminal)
```

Edit files in `src/schedule/`, `src/song-list/`, `src/gallery/`, or
`src/shared/`.

**Publishing:**
```bash
make publish    # Build React + Jekyll, rsync to server
```

## Documentation

- `docs/` - Planning documents (see `REACT_MIGRATION_PLAN.md`)
- `CLAUDE.md` - React architecture and development guide

## Notes

**Schedule & Song List:**

React apps in `src/schedule/` and `src/song-list/` fetch from
[BandHelper](https://www.bandhelper.com/) with local JSON fallback. Data
refreshed hourly via cron (`15 * * * * $HOME/bin/fetch-ellisislandrock-json.sh`).
Shared utilities in `src/shared/`.

**Images:** Originals have generally been reduced to max height 800px to
save bandwidth.

**Embedding Videos:**

- YouTube: `{% include yt_vid.html id="Uf8QA3BE5fU" %}`
- Other: `{% include video_tag.html src="images/video.mp4" %}`

(Optional: width, height, poster)
