const MONTHS = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const SCHEDULE_FILE = 'schedule.json';
const SCHEDULE_JSON_URL = 'https://www.bandhelper.com/feed/calendar/64519?range=6';
const CATEGORY_FULL_BAND = 'Full Band Gig';
const CATEGORY_ACOUSTIC = 'Acoustic Gig';
const POSTER_REGEX_STR = "{% *poster ([^ %]+)( +alt=\"([^\"]+)\")? *%}";
const PRIVATE_EVENT_NAME = 'Private Event';
const ACOUSTIC_NOTES = ' (Acoustic)';

// Custom field name mappings
// - custom_cC99h9: gig description (required)
// - custom_CCMx5n: poster image name or URL (optional)
// - custom_Kz3bz0: poster alt text (optional)
// - custom_7CpO7C: display as private (optional, numeric)

function _date_div(date, date_display) {
  const ymd = date.split('-');
  const day_name = date_display.split(' ')[0];
  var html = '<div class="schedule-date">';
  html += `<div class="month">${MONTHS[Number(ymd[1])]}</div>`;
  html += `<div class="day-name">${day_name}</div>`;
  html += `<div class="day">${Number(ymd[2])}</div>`;
  html += '</div>';
  return html;
}

function _address_link(gig) {
  address = html_unescape(gig.address);
  search_term = encodeURIComponent(address.replaceAll(/[.,]/g, " "));
  return `<a href="https://www.google.com/maps/search/?api=1&query=${search_term}" target="_blank">${address}</a>`;
}

function _info_div(gig) {
  var venue_info = '';
  if (!gig.is_private_event) {
    venue_info = ` @ ${html_unescape(gig.venue)}`;
    if (gig.address)
      venue_info += `, ${_address_link(gig)}`;
  }

  return `<div class="schedule-info">${gig.date_display}${venue_info}</div>`;
}

function _text_div(gig, name_class) {
  const name = html_unescape(gig.name);
  // Using https://github.com/markedjs/marked to turn Markdown into HTML.
  const description = gig.is_private_event ? '' : marked.parseInline(html_unescape(gig.custom_cC99h9));
  const notes = gig.is_acoustic ? ACOUSTIC_NOTES : '';

  var html = '<div class="schedule-text">';
  html += `<div class="schedule-name"><span class="${name_class}">${name}${notes}</span></div>`;
  html += _info_div(gig);
  html += `<div class="schedule-description">${description}</div>`;
  html += '</div>';
  return html;
}

function _has_poster(gig) {
  return gig.custom_CCMx5n !== undefined && gig.custom_CCMx5n != "";
}

function _poster_image_src(gig) {
  const url = gig.custom_CCMx5n;
  if (url.startsWith("<a href=")) {
    return url.substring(9, url.indexOf('"', 9));
  }
  return `images/posters/${url}`;
}

function _poster_image(gig) {
  const src = _poster_image_src(gig);
  const poster_alt_text = gig.custom_Kz3bz0;
  var alt = "";
  if (poster_alt_text != null)
    alt = `alt="${poster_alt_text}"`;
  return `<img class="myImg schedule" src="${src}" ${alt} onclick="modal_image(this);"/>`;
}

function _gig_html(gig) {
  var name_class = gig.is_acoustic ? 'acoustic' : 'band';

  var gig_html = '<div class="row">';
  if (_has_poster(gig)) {
    gig_html += `<div class="column left">${_date_div(gig.date_start, gig.date_display)}</div>`;
    gig_html += `<div class="column middle">${_text_div(gig, name_class)}</div>`;
    gig_html += `<div class="column right">${_poster_image(gig)}</div>`;
  }
  else {
    gig_html += `<div class="column left">${_date_div(gig.date_start, gig.date_display)}</div>`;
    gig_html += `<div class="column right">${_text_div(gig, name_class)}</div>`;
  }
  gig_html += '</div>';

  return gig_html;
}

function _should_display(gig) {
  // Private events are marked "Public" with "Hide Details" in BandHelper.
  // They always have the name PRIVATE_EVENT_NAME.
  return gig.category == CATEGORY_FULL_BAND
    || gig.is_acoustic
    || gig.is_private_event;
}

function _do_insert_schedule(schedule) {
  var html = '<table class="schedule">';
  schedule.forEach(gig => {
    gig.is_private_event = gig.name == PRIVATE_EVENT_NAME;
    gig.is_acoustic = gig.category == CATEGORY_ACOUSTIC;
    if (_should_display(gig)) {
      html += _gig_html(gig);
    }
  });
  html += '</table>';

  const div = document.getElementById("schedule-list");
  div.innerHTML = html;
}

function insert_schedule() {
  get_file_or_url(SCHEDULE_FILE, SCHEDULE_JSON_URL, _do_insert_schedule);
}
