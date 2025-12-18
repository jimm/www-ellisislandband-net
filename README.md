# Ellis Island Band Website

This repo contains the source code for https://ellisilandrock.com. It's
built with [Jekyll](https://jekyllrb.com/).

## Setup & Development

**Prerequisites:** Ruby/bundler, Node.js/npm, SSH (for publishing)

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

Edit files in `src/schedule/`, `src/song-list/`, or `src/shared/`.

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

**Note:** Repo named for former domain `ellisislandband.net`.
