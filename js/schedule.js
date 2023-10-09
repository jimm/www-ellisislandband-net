const MONTHS = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const CATEGORY_FULL_BAND = 'Full Band Gig';
const CATEGORY_ACOUSTIC = 'Acoustic Gig';
const POSTER_REGEX_STR = "{% *poster ([^ %]+)( +alt=\"([^\"]+)\")? *%}";
const PRIVATE_EVENT_NAME = 'Private Event';

// Custom field name mappings
// - custom_cC99h9: gig description (required)
// - custom_CCMx5n: poster image name or URL (optional)
// - custom_Kz3bz0: poster alt text (optional)
// - custom_7CpO7C: display as private (optional, numeric)

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
  var notes = '';
  var name = gig.name;
  if (gig.custom_7CpO7C != "")
    name = PRIVATE_EVENT_NAME;
  if (name_class == 'acoustic')
    notes = ' (Acoustic Set)';
  html += `<div class="schedule-name"><span class="${name_class}">${name}${notes}</span></div>`;
  html += `<div class="schedule-datetime">${gig.date_display}</div>`;
  html += `${html_unescape(gig.custom_cC99h9)}`; // description
  html += '</div>';
  return html;
}

function _has_poster(gig) {
  return gig.custom_CCMx5n != "";
}

function _poster_image(gig) {
  const url = gig.custom_CCMx5n;
  const src = url.startsWith("http") ? url : `images/posters/${url}`;
  const poster_alt_text = gig.custom_Kz3bz0;
  var alt = "";
  if (poster_alt_text != null)
    alt = `alt="${poster_alt_text}"`;
  return `<img class="myImg schedule" src="${src}" ${alt} onclick="modal_image(this);"/>`;
}

function _gig_html(gig) {
  var name_class = gig.category == CATEGORY_FULL_BAND ? 'band' : 'acoustic';

  var gig_html = '<div class="row">';
  if (_has_poster(gig)) {
    gig_html += `<div class="column left">${_date_div(gig.date_start)}</div>`;
    gig_html += `<div class="column middle">${_text_div(gig, name_class)}</div>`;
    gig_html += `<div class="column right">${_poster_image(gig)}</div>`;
  }
  else {
    gig_html += `<div class="column left">${_date_div(gig.date_start)}</div>`;
    gig_html += `<div class="column right">${_text_div(gig, name_class)}</div>`;
  }
  gig_html += '</div>';

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
