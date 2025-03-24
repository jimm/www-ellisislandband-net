#!/bin/bash
#
# usage: fetch-ellisislandrock-json.sh [output-dir]

output_dir="${1:-$HOME/apps/ellis-island}"

SCHEDULE_FEED_URL="https://www.bandhelper.com/feed/calendar/64519?range=9"
SONG_LIST_FEED_URL="https://www.bandhelper.com/feed/smart_list/9s5Ljv/64519"
SCHEDULE_JSON_FILE="$output_dir/schedule.json"
SONG_LIST_JSON_FILE="$output_dir/song-list.json"

# usage: safeish_get url output-file
safeish_get() {
    tmpfile="$(mktemp)"
    curl --silent -o "$tmpfile" "$1" &&
        mv "$tmpfile" $2
}

safeish_get "$SCHEDULE_FEED_URL" "$SCHEDULE_JSON_FILE" 
safeish_get "$SONG_LIST_FEED_URL" "$SONG_LIST_JSON_FILE" 
