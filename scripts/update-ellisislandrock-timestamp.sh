#!/bin/bash
#
# usage: update-ellisislandrock-timestamp.sh [site-dir]

output_dir="${1:-$HOME/apps/ellis-island}"

cd "$output_dir"
ts="$(date "+%s")"
old_ts_files="$(ls js/all-*.js)"
ln -s js/all.js js/all-${ts}.js
find . -name '*.html' -print0 \
    | xargs -0 sed -i -E "s#js/all(-[0-9]+)?\\.js#js/all-${ts}.js#"
if [ -n "$old_ts_files" ] ; then
    rm $old_ts_files            # do not quote
fi
