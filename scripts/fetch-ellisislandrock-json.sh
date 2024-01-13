#!/bin/bash
#
# usage: fetch-ellisislandrock-json.sh [output-dir]

output_dir="${1:-$HOME/apps/ellis-island}"

SCHEDULE_FEED_URL="https://www.bandhelper.com/feed/calendar/64519?range=9"
SONG_LIST_FEED_URL="https://www.bandhelper.com/feed/smart_list/9s5Ljv/64519"
SCHEDULE_JSON_FILE="$output_dir/schedule.json"
SONG_LIST_JSON_FILE="$output_dir/song-list.json"

curl --silent -o "$SCHEDULE_JSON_FILE" "$SCHEDULE_FEED_URL"
curl --silent -o "$SONG_LIST_JSON_FILE" "$SONG_LIST_FEED_URL"
