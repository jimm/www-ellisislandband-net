const SONG_LIST_FILE = 'song-list.json';
const SONG_LIST_JSON_URL = 'https://www.bandhelper.com/feed/smart_list/9s5Ljv/64519';

var table_data = [];

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
  table_data.forEach(song => normalized[song[which]] = normalize_sort_string(song[which]));
  table_data.sort(function (a, b) {
    a_str = normalized[a[which]];
    b_str = normalized[b[which]];
    if (a_str < b_str) return -1;
    if (a_str > b_str) return 1;
    return 0;
  });

  for (var i = 0; i < table_data.length; i++) {
    var row = $(`#songlist tr:eq(${i+1})`); // tbody tr:eq(i) does not work
    if ((i & 1) == 1)
      row.addClass('odd');
    else
      row.removeClass('odd');
    var cells = row.children();
    $(cells[0]).text("" + (i + 1));
    for (var j = 0; j < 2; ++j)
      $(cells[j+1]).text(table_data[i][j]);
  }
}

function sort_by_title() {
  sort_by(0);
}

function sort_by_artist() {
  sort_by(1);
}

function _do_insert_song_list(song_list) {
  html = '';
  song_list.forEach(entry => {
    if (entry.type == "song" && entry.tags != "Learning") {
      name = html_unescape(entry.name);
      artist = html_unescape(entry.artist);
      if (name.match(/, The/))
        name = `The ${name.substring(0, name.length - 5)}`;
      if (entry.tags == "Acoustic")
        name += " (Acoustic only)";
      table_data.push([name, artist]);
      html += `<tr><td class="rownum">0</td><td>${name}</td><td>${artist}</td></tr>`;
    }
  });
  $('#songlist tbody').html(html);
  sort_by_title();
}

function insert_song_list() {
  get_file_or_url(SONG_LIST_FILE, SONG_LIST_JSON_URL, _do_insert_song_list);
}
