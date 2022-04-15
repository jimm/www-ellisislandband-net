#!/bin/bash
#
# usage: extract-song-names.sh [songfile]

TMPFILE=/tmp/extracted-songs.txt

here="$(cd $(dirname "$0") > /dev/null && pwd)"
songfile=${1:-$pim/orgs/ellis_island.org}

if [ ! -f $songfile ] ; then
    echo song file $songfile does not exist
    exit 1
fi

awk '/start list/ {exit} ; {print}' "$here/../song-list.md"
echo '<!-- start list -->'
awk -f "$here/extract-song-names.awk" $songfile > $TMPFILE
awk -f "$here/extract-old-song-names.awk" $songfile >> $TMPFILE
sed < $TMPFILE \
    -e 's#<#&lt;#g' \
    -e 's#&#&amp;#g' \
    -e 's#^\*\* #<tr><td class="rownum">0</td><td>#' \
    -e 's# - #</td><td>#' \
    -e 's#$#</td></tr>#'
rm $TMPFILE
cat <<EOS
</table>
<script>sort_by_title();</script>
EOS
