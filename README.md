# Ellis Island Band Website

This repo contains the source code for https://ellisilandrock.com. It's
built with [Jekyll](https://jekyllrb.com/).

## Building and publishing the site

    make publish

Once you have Jekyll installed locally, running `make publish` will build
the site from the Markdown files and publish it to the web site. You'll also
need `ssh` access to the server it's hosted on. See the Makefile for the
server name and the directory it is served from.

## Developing Locally

    make server

runs Jekyll locally. You can see it at
[http://localhost:4000/](http://localhost:4000/).

## Notes

The schedule and song list are obtained via JSON feeds from our
[BandHelper](https://www.bandhelper.com/) account and built in Javascript.
The feed URL is https://www.bandhelper.com/feed/calendar/64519?range=9

When developing locally, the individual Javascript files are loaded in each
pages' header. Just before the site is pushed up to the server, all of the
local Javascript files are concatenated into one and the HTML file's headers
are modified to reference that one instead of the individual JS files.

We also own the domain `ellisislandband.net`, thus the name of this repo.

Original images are often reduced from their original slizes to a max height
of 800 to save bandwidth.
