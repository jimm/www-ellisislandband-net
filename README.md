# Ellis Island Band Website

This repo contains the source code for https://ellisilandrock.com. It's
built with [Jekyll](https://jekyllrb.com/).

## Building and publishing the site

### Prerequisites

You'll need:
- Ruby and the `bundle` gem
- Node.js and npm
- SSH access to the server (for publishing)

### Setup

1. Install Ruby dependencies:
   ```bash
   bundle install
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

### Building

Running `make publish` will:
1. Build the React components (`npm run build`)
2. Concatenate legacy JavaScript files into `all.js`
3. Build the Jekyll site
4. Publish to the web server

When published, a script timestamps the `all.js` file name and updates the
HTML files to reference the timestamped version

## Developing Locally

Start the Jekyll development server:

```bash
make server
```

The site will be available at [http://localhost:4000/](http://localhost:4000/).

### React Development

The schedule page uses React components. When developing React features, run
the build in watch mode in a separate terminal:

```bash
npm run watch
```

This rebuilds the React bundle automatically when you modify files in
`src/schedule/`.

### How It Works

When developing locally, individual JavaScript files are loaded in each page's
header. The React bundle is loaded from `js/dist/schedule.bundle.iife.js`.
Before publishing, all legacy JavaScript files are concatenated into `all.js`
and the HTML headers are modified to reference the concatenated version.

## Documentation

The `docs/` directory contains planning and architecture documents for the
project, including:
- `REACT_MIGRATION_PLAN.md` - Detailed plan for migrating JavaScript to React

## Notes

### Schedule System

The schedule page is built with React components (in `src/schedule/`). The
schedule data is obtained via JSON feeds from our
[BandHelper](https://www.bandhelper.com/) account. The data is fetched by a
cron job that runs every hour at 15 past the hour. It runs
`scripts/fetch-ellisislandrock-json.sh`, which is uploaded to the `$HOME/bin`
directory on the server. Here's the crontab entry:

    15 * * * * $HOME/bin/fetch-ellisislandrock-json.sh

The React components use the marked.js library to parse Markdown in the gig
description field. BandHelper wasn't designed to handle HTML in custom fields
according to the author.

### Song List

The song list page uses vanilla JavaScript and also fetches data from
BandHelper via the same cron job.

Images have often been reduced manually from their original sizes to a max
height of 800 to save bandwidth.

### Embedding Videos

For Youtube videos:

    {% include yt_vid.html id="Uf8QA3BE5fU" %}

You can also optionally specify width and height.

For other videos:

    {% include video_tag.html src="images/porchfest_2024_bruce.mp4" %}

You can also optionally specify width, height, and poster (the image used
before the video is played).

We used to have the domain `ellisislandband.net`, thus the name of this
repo.
