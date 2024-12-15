#!/bin/bash
#
# usage: update-ellisislandrock-timestamp.sh [site-dir]

output_dir="${1:-$HOME/apps/ellis-island}"

cd "$output_dir"
ts="$(date "+%s")"

# Remember old timestamped files
old_js_files="$(ls js/all-*.js)"
old_css_files="$(ls css/main-*.css)"

# Create new timestamped links
cd js
ln -s all.js all-${ts}.js
cd ../css
ln -s main.css main-${ts}.css
cd ..

# Replace "all.js" with timestamped name in all HTML files
find . -name '*.html' -print0 \
    | xargs -0 sed -i -E "s#js/all(-[0-9]+)?\\.js#js/all-${ts}.js#"

# Replace "main.css" with timestamped name in all HTML files
find . -name '*.html' -print0 \
    | xargs -0 sed -i -E "s#css/main(-[0-9]+)?\\.css#css/main-${ts}.css#"

# Remove the old timestamped files
if [ -n "$old_js_files" ] ; then
    rm $old_js_files            # do not quote
fi
if [ -n "$old_css_files" ] ; then
    rm $old_css_files           # do not quote
fi
