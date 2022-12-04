const NUM_COLS = 4;
const ALT_TAG = "The band onstage at Park City, Dec. 2, 2022; photo by Victoria Menard";
const IMAGE_DIR = "images/park_city_2022_12_02/";
const SOURCES = [
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

function park_city_image(i) {
  return `<img class="myImg" src="${IMAGE_DIR}${SOURCES[i]}"` +
    ` alt="${ALT_TAG}" onclick="modal_image(this);"/>\n`;
}

function park_city_td(i) {
  return "<td style=\"align: center; text-align: center;\">\n" +
    park_city_image(i) +
    "</td>\n";
}

function insert_park_city_images() {
  const table = document.getElementById("park-city-images");
  var html = "";
  for (i = 0; i < SOURCES.length; ++i) {
    if ((i % NUM_COLS) == 0) {
      if (i > 0) { html += "</tr>\n"; }
      html += "<tr style=\"vertical-align: top;\">\n";
    }
    html += park_city_td(i);
  };
  html += "</tr>\n";
  table.innerHTML = html; 
}
