# Ellis Island Band Website

This repo contains the source code for https://ellisilandrock.com. It's
built with [Jekyll](https://jekyllrb.com/).

## Building and publishing the site

    make publish
$
Once you have Jekyll installed locally, running `make publish` will build
the site from the Markdown files and publish it to the web site. You'll also
need `ssh` access to the server it's hosted on. See the Makefile for the
server name and the directory it is served from.

## Developing Locally

    make server

runs Jekyll locally. You can see it at
[http://localhost:4000/](http://localhost:4000/).

When developing locally, the individual Javascript files are loaded in each
pages' header. Just before the site is pushed up to the server, all of the
local Javascript files are concatenated into one and the HTML file's headers
are modified to reference that one instead of the individual JS files.

## Notes

The schedule and song list are obtained via JSON feeds from our
[BandHelper](https://www.bandhelper.com/) account and built in Javascript.
The data is fetched by a cron job that is currently run every hour at 15
past the hour. It runs `scripts/fetch-ellisislandrock-json.sh`, which is
uploaded to the `$HOME/bin` directory on the server. Here's the crontab
entry:

    15 * * * * $HOME/bin/fetch-ellisislandrock-json.sh

We used to the domain `ellisislandband.net`, thus the name of this repo.

Original images are often reduced from their original sizes to a max height
of 800 to save bandwidth.
