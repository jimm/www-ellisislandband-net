var table_data = [];

function load_table_data(table) {
  for (var i = 1, row; row = table.rows[i]; i++) // skip table header row
    table_data.push([row.cells[0].innerHTML, row.cells[1].innerHTML])
}

function sort_by(which) {
  var table = document.getElementById("songlist");
  if (table_data.length == 0)
    load_table_data(table);
  table_data.sort(function (a, b) {
    if (a[which] < b[which]) return -1;
    if (a[which] > b[which]) return 1;
    return 0;
  });
  for (var i = 1, row; row = table.rows[i]; i++) {
    for (var j = 0; j < 2; ++j)
      row.cells[j].innerHTML = table_data[i-1][j];
  }
}

function sort_by_title() {
  sort_by(0);
}

function sort_by_artist() {
  sort_by(1);
}
