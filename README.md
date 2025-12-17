# Ellis Island Band Website

This repo contains the source code for https://ellisilandrock.com. It's
built with [Jekyll](https://jekyllrb.com/).

## Building and publishing the site

You'll need Ruby and the `bundle` gem. Run `bundle install` once to install
everything you need, including Jekyll. Once you have Jekyll installed
locally, running `make publish` will build the site from the Markdown files
and publish it to the web site. You'll also need `ssh` access to the server
it's hosted on. See the Makefile for the server name and the directory it is
served from.

When the site is built, the separate Javascript files in the `js` directory
are concatenated into one file named `all.js`. When it is published to the
website, a script is run that timestamps the `all.js` file name and updates
the files that include it to use that timestamped version of the file

## Developing Locally

    make server

runs Jekyll locally. You can see it at
[http://localhost:4000/](http://localhost:4000/).

When developing locally, the individual Javascript files are loaded in each
pages' header. Just before the site is pushed up to the server, all of the
local Javascript files are concatenated into one and the HTML file's headers
are modified to reference that one instead of the individual JS files.

## Documentation

The `docs/` directory contains planning and architecture documents for the
project, including:
- `REACT_MIGRATION_PLAN.md` - Detailed plan for migrating JavaScript to React

## Notes

The schedule and song list are obtained via JSON feeds from our
[BandHelper](https://www.bandhelper.com/) account and built in Javascript.
The data is fetched by a cron job that is currently run every hour at 15
past the hour. It runs `scripts/fetch-ellisislandrock-json.sh`, which is
uploaded to the `$HOME/bin` directory on the server. Here's the crontab
entry:

    15 * * * * $HOME/bin/fetch-ellisislandrock-json.sh

The code uses a Markdown library to parse the description field. BandHelper
wasn't designed to handle HTML in custom fields according to the author.

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
