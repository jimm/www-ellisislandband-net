function get_json(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);
  return JSON.parse(request.responseText);
}

function html_unescape(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
window.onkeyup = function(event) {
  if (event.keyCode == 27)
    document.getElementById('myModal').style.display = 'none';
}

function modal_image(img) {
  const modal = document.getElementById('myModal');
  const modal_img = document.getElementById('img01');
  const caption = document.getElementById('caption');

  modal_img.src = img.src;
  modal_img.alt = img.alt;
  caption.innerHTML = img.alt;
  modal.style.display = 'block';
}
const NUM_COLS = 4;
const ALT_TAG = "The band onstage at Park City, Dec. 2, 2022; photo by Victoria Menard";
const IMAGE_DIR = "images/park_city_2022_12_02/";
const GALLERY_SOURCES = [
  "green-halo.jpg",
  "IMG_1731.jpg",
  "IMG_1734.jpg",
  "IMG_1735.jpg",
  "IMG_1737.jpg",
  "IMG_1738.jpg",
  "IMG_1742.jpg",
  "IMG_1744.jpg",
  "IMG_1745.jpg",
  "IMG_1748.jpg",
  "IMG_1750.jpg",
  "IMG_1753.jpg",
  "IMG_1754.jpg",
  "IMG_1757.jpg",
  "IMG_1758.jpg",
  "IMG_1759.jpg",
  "IMG_1770.jpg",
  "IMG_1771.jpg",
  "IMG_1772.jpg",
  "more-green.jpg",
];
const INDEX_IMAGE_DIR = "images/";
const INDEX_SOURCES = [
  "park_city_2022_12_02/green-halo.jpg",
  "park_city_2022_12_02/IMG_1734.jpg",
  "park_city_2022_12_02/IMG_1735.jpg",
  "park_city_2022_12_02/IMG_1737.jpg",
  "park_city_2022_12_02/IMG_1745.jpg",
  "park_city_2022_12_02/IMG_1748.jpg",
  "park_city_2022_12_02/IMG_1750.jpg",
  "park_city_2022_12_02/IMG_1753.jpg",
  "park_city_2022_12_02/IMG_1754.jpg",
  "park_city_2022_12_02/IMG_1757.jpg",
  "park_city_2022_12_02/IMG_1758.jpg",
  "park_city_2022_12_02/IMG_1759.jpg",
  "park_city_2022_12_02/IMG_1770.jpg",
  "park_city_2022_12_02/IMG_1771.jpg",
  "park_city_2022_12_02/IMG_1772.jpg",
  "park_city_2022_12_02/more-green.jpg",
  "jeff_and_banner_ftc_edited.jpeg"
];

function park_city_image(i) {
  return `<img class="myImg" src="${IMAGE_DIR}${GALLERY_SOURCES[i]}"` +
    ` alt="${ALT_TAG}" onclick="modal_image(this);"/>\n`;
}

function park_city_td(i) {
  return "<td style=\"align: center; text-align: center;\">\n" +
    park_city_image(i) +
    "</td>\n";
}

function index_image(i) {
  const image = INDEX_SOURCES[i];
  return `<img class="myImg" src="${INDEX_IMAGE_DIR}${image}" alt="${ALT_TAG}" onclick="modal_image(this);"/>\n`;
}

function insert_park_city_images() {
  const table = document.getElementById("park-city-images");

  var html = "";
  for (i = 0; i < GALLERY_SOURCES.length; ++i) {
    if ((i % NUM_COLS) == 0) {
      if (i > 0) { html += "</tr>\n"; }
      html += "<tr style=\"vertical-align: top;\">\n";
    }
    html += park_city_td(i);
  };
  html += "</tr>\n";
  table.innerHTML = html; 
}

function insert_random_index_image() {
  const index = Math.floor(Math.random() * INDEX_SOURCES.length);
  const img = document.getElementById("random-index-image");
  img.innerHTML = index_image(index);
}
function insert_schedule() {
  const schedule = get_json('https://www.bandhelper.com/feed/calendar/64519?range=9');

  html = "<ul>";
  schedule.forEach(gig => {
    html += `<li><strong>${gig.date_display}</strong>`;
    html += ` &ndash; <em>${gig.name}.</em> `;
    html += html_unescape(gig.custom_cC99h9);
    html += "</li><p>";
  });
  html += "</ul>";
  const div = document.getElementById("schedule-list");
  div.innerHTML = html;
}
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

function insert_song_list() {
  const song_list = get_json('https://www.bandhelper.com/feed/smart_list/9s5Ljv/64519');
  song_list.forEach(entry => {
    if (entry.type == "song") {
      name = entry.name;
      if (name.match(/, The/))
        name = `The ${name.substring(0, name.length - 5)}`;
      table_data.push([name, entry.artist]);
      document.write(`<tr><td class="rownum">0</td><td>name</td><td>entry.artist</td></tr>`);
    }
  });
  console.log(table_data);
}
