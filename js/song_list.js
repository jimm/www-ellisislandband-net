const SONG_LIST_FILE = 'song-list.json';
const SONG_LIST_JSON_URL = 'https://www.bandhelper.com/feed/smart_list/9s5Ljv/64519';

const state = {
  songs: [],
  show_acoustic: false,
  current_sort_by: "name",
};

function toggle_acoustic() {
  var button = $('#acoustic-toggle');
  if (state.show_acoustic) {
    state.show_acoustic = false;
    button.html("Show Acoustic-Only Songs");
  }
  else {
    state.show_acoustic = true;
    button.html("Hide Acoustic-Only Songs");
  }
  $('#songlist tbody').html('');
  insert_song_list();
}

function normalize_sort_string(str) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    // says to use upper case instead of lower case due to problems with
    // certain UTF-8 character conversions.
  str = str.toUpperCase();
  var regex = /^(AN?|THE) /;
  var found = str.match(regex);
  if (found != null)
    str = str.substr(found[0].length);
  return str;
}

function sort_by(which) {
  var normalized = [];
  state.songs.forEach(song => normalized[song[which]] = normalize_sort_string(song[which]));
  state.songs.sort(function (a, b) {
    a_str = normalized[a[which]];
    b_str = normalized[b[which]];
    if (a_str < b_str) return -1;
    if (a_str > b_str) return 1;
    return 0;
  });

  html = '';
  row = 1;
  for (var i = 0; i < state.songs.length; i++) {
    var song = state.songs[i];
    var is_acoustic = song["is_acoustic"];
    if (!state.show_acoustic && is_acoustic)
      continue;

    name = song["name"];
    if (is_acoustic)
      name += " (Acoustic Only)";
    html += `<tr><td class="rownum">${row}</td><td>${name}</td><td>${song["artist"]}</td></tr>`;
    row += 1;
  }
  $('#songlist tbody').html(html);
}

function sort_by_title() {
  sort_by("name");
  state.current_sort_by = "name";
}

function sort_by_artist() {
  sort_by("artist");
  state.current_sort_by = "artist";
}

function _do_insert_song_list(song_list) {
  state.songs = [];
  song_list.forEach(entry => {
    if (entry.type == "song") {
      tags = entry.tags.split(", ");
      if (!tags.includes("Learning")) {
        name = html_unescape(entry.name);
        artist = html_unescape(entry.artist);
        if (name.match(/, The/))
          name = `The ${name.substring(0, name.length - 5)}`;
        state.songs.push({"name": name, "artist": artist, "is_acoustic": tags.includes("Acoustic")});
      }
    }
  });
  sort_by(state.current_sort_by);
}

function insert_song_list() {
  get_json_data(SONG_LIST_JSON_URL, SONG_LIST_FILE, _do_insert_song_list);
}
