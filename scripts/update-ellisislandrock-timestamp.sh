#!/bin/bash
#
# usage: update-ellisislandrock-timestamp.sh [site-dir]

output_dir="${1:-$HOME/apps/ellis-island}"

cd "$output_dir"
ts="$(date "+%s")"

# Remember old timestamped links
old_ts_files="$(ls js/all-*.js)"

# Create new timestamped link
cd js
ln -s all.js all-${ts}.js
cd ..

# Replace "all.js" with timestamped name in all HTML files
find . -name '*.html' -print0 \
    | xargs -0 sed -i -E "s#js/all(-[0-9]+)?\\.js#js/all-${ts}.js#"

# Remove all but the most recent three old timestamped links
if [ -n "$old_ts_files" ] ; then
    rm $old_ts_files            # do not quote
fi
