var table_data = [];

function load_table_data(table) {
  for (var i = 1, row; row = table.rows[i]; i++) // skip table header row
    table_data.push([row.cells[1].innerHTML, row.cells[2].innerHTML])
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
  var table = document.getElementById("songlist");
  if (table_data.length == 0)
    load_table_data(table);

  var normalized = [];
  table_data.forEach(song => normalized[song[which]] = normalize_sort_string(song[which]));

  table_data.sort(function (a, b) {
    a_str = normalized[a[which]];
    b_str = normalized[b[which]];
    if (a_str < b_str) return -1;
    if (a_str > b_str) return 1;
    return 0;
  });
  for (var i = 0, row; row = table.rows[i+1]; i++) {
    if ((i & 1) == 1)
      row.classList.add('odd');
    else
      row.classList.remove('odd');
    row.cells[0].innerHTML = "" + (i + 1);
    for (var j = 0; j < 2; ++j)
      row.cells[j+1].innerHTML = table_data[i][j];
  }
}

function sort_by_title() {
  sort_by(0);
}

function sort_by_artist() {
  sort_by(1);
}
