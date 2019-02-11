#!/bin/bash

songfile=$pim/orgs/music/ellis_island.org
tmpfile=/tmp/song-list.md
dest="$(dirname $0)/../song-list.md"

if [ ! -f $songfile ] ; then
    echo song file $songfile does not exist
    # do not want to exit with error; let make continue
    exit 0
fi

awk '/start list/ {exit} ; {print}' $(dirname $0)/../song-list.md > $tmpfile
echo '<!-- start list -->' >> $tmpfile
awk '/^\* Songs/,/^\* Tim/ {print}' $songfile \
    | awk '/^\*\* .*-/ {print}' \
    | sed 's/^\*\* /- /' >> $tmpfile
mv $tmpfile "$dest"
