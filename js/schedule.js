const MONTHS = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const CATEGORY_FULL_BAND = 'Full Band Gig';
const CATEGORY_ACOUSTIC = 'Acoustic Gig';
const POSTER_REGEX_STR = "{% *poster ([^ %]+)( +alt=\"([^\"]+)\")? *%}";

// Custom field name mappings
// - custom_cC99h9: gig description (required)
// - custom_CCMx5n: poster image name or URL (optional)
// - custom_Kz3bz0: poster alt text (optional)

function _date_div(date) {
  const ymd = date.split('-');
  var html = '<div class="schedule-date">';
  html += `<div class="month">${MONTHS[Number(ymd[1])]}</div>`;
  html += `<div class="day">${Number(ymd[2])}</div>`;
  html += '</div>';
  return html;
}

function _text_div(gig, name_class) {
  var html = '<div class="schedule-text">';
  html += `<div class="schedule-name"><span class="${name_class}">${gig.name}</span></div>`;
  html += `<div class="schedule-datetime">${gig.date_display}</div>`;
  html += `<p>${html_unescape(gig.custom_cC99h9)}</p>`; // description
  html += '</div>';
  return html;
}

function _has_poster(gig) {
  return gig.custom_CCMx5n != "";
}

function _poster_image(gig) {
  const src = `images/posters/${gig.custom_CCMx5n}`;
  const poster_alt_text = gig.custom_Kz3bz0;
  var alt = "";
  if (poster_alt_text != null)
    alt = `alt="${poster_alt_text}"`;
  return `<img class="myImg schedule" width="200" src="${src}" ${alt} onclick="modal_image(this);"/>`;
}

function _gig_html(gig) {
  var name_class = gig.category == CATEGORY_FULL_BAND ? 'band' : 'acoustic';
  var gig_html = '<tr>';

  gig_html += `<td class="date-display">${_date_div(gig.date_start)}</td>`;

  if (_has_poster(gig))
    gig_html +=  '<td colspan="2">';
  else
    gig_html +=  '<td>';
  gig_html += _text_div(gig, name_class);
  gig_html += '</td>';

  if (_has_poster(gig))
    gig_html += `<td class="poster">${_poster_image(gig)}</td>`;

  gig_html += '</tr>';
  return gig_html;
}

function _do_insert_schedule(schedule) {
  var html = '<table class="schedule">';
  schedule.forEach(gig => {
    if (gig.category == CATEGORY_FULL_BAND || gig.category == CATEGORY_ACOUSTIC)
      html += _gig_html(gig);
  });
  html += '</table>';

  const div = document.getElementById("schedule-list");
  div.innerHTML = html;
}

function insert_schedule() {
  $.getJSON(
    'https://www.bandhelper.com/feed/calendar/64519?range=9',
    _do_insert_schedule
  );
}
