#!/bin/bash

tmpfile=/tmp/song-list.md
dest="$(dirname $0)/../song-list.md"

awk '/start list/ {exit} ; {print}' $(dirname $0)/../song-list.md > $tmpfile
echo '<!-- start list -->' >> $tmpfile
awk '/^\* Songs/,/^\* Tim/ {print}' $pom/ellis_island.org \
    | awk '/^\*\* .*-/ {print}' \
    | sed 's/^\*\* /- /' >> $tmpfile
mv $tmpfile "$dest"
