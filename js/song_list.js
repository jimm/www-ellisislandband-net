const SONG_LIST_FILE = 'song-list.json';
const SONG_LIST_JSON_URL = 'https://www.bandhelper.com/feed/smart_list/9s5Ljv/64519';

var songs = [];
var show_acoustic = false;

function toggle_acoustic() {
  var button = $('#acoustic-toggle');
  if (show_acoustic) {
    show_acoustic = false;
    button.html("Show Acoustic-Only Songs");
  }
  else {
    show_acoustic = true;
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
  songs.forEach(song => normalized[song[which]] = normalize_sort_string(song[which]));
  songs.sort(function (a, b) {
    a_str = normalized[a[which]];
    b_str = normalized[b[which]];
    if (a_str < b_str) return -1;
    if (a_str > b_str) return 1;
    return 0;
  });

  html = '';
  row = 1;
  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];
    var is_acoustic = song["is_acoustic"];
    if (!show_acoustic && is_acoustic)
      continue;

    var rowclass = ((row & 1) == 1) ? " class='odd'" : "";
    name = song["name"];
    if (is_acoustic)
      name += " (Acoustic Only)";
    html += `<tr${rowclass}><td class="rownum">${row}</td><td>${name}</td><td>${song["artist"]}</td></tr>`;
    row += 1;
  }
  $('#songlist tbody').html(html);
}

function sort_by_title() {
  sort_by("name");
}

function sort_by_artist() {
  sort_by("artist");
}

function _do_insert_song_list(song_list) {
  songs = [];
  song_list.forEach(entry => {
    if (entry.type == "song" && entry.tags != "Learning") {
      name = html_unescape(entry.name);
      artist = html_unescape(entry.artist);
      if (name.match(/, The/))
        name = `The ${name.substring(0, name.length - 5)}`;
      songs.push({"name": name, "artist": artist, "is_acoustic": (entry.tags == "Acoustic")});
    }
  });
  sort_by_title();
}

function insert_song_list() {
  get_file_or_url(SONG_LIST_FILE, SONG_LIST_JSON_URL, _do_insert_song_list);
}
