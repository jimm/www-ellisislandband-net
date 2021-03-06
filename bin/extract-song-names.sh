#!/bin/bash
#
# usage: extract-song-names.sh [songfile]

here="$(cd $(dirname "$0") > /dev/null && pwd)"
songfile=${1:-$pim/orgs/music/ellis_island.org}

if [ ! -f $songfile ] ; then
    echo song file $songfile does not exist
    exit 1
fi

awk '/start list/ {exit} ; {print}' "$here/../song-list.md"
echo '<!-- start list -->'
awk -f "$here/extract-song-names.awk" $songfile \
    | sed \
          -e 's#<#&lt;#g' \
          -e 's#&#&amp;#g' \
          -e 's#^\*\* #<tr><td>#' \
          -e 's# - #</td><td>#' \
          -e 's#$#</td></tr>#'
echo '</table>'
