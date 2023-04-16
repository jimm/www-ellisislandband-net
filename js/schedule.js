const MONTHS = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function _date_div(date) {
  const ymd = date.split('-');
  var html = '<div class="schedule-date">';
  html += `<div class="month">${MONTHS[Number(ymd[1])]}</div>`;
  html += `<div class="day">${Number(ymd[2])}</div>`;
  html += '</div>';
  return html;
}

function _text_div(gig) {
  var html = '<div class="schedule-text">';
  html += `<div class="schedule-name">${gig.name}</div>`;
  html += `<div class="schedule-datetime">${gig.date_display}</div>`;
  html += html_unescape(gig.custom_cC99h9);
  html += '</div>';
  return html;
}

function _do_insert_schedule(schedule) {
  var html = '<ul class="schedule">';
  schedule.forEach(gig => {
    html += '<li>';
    html += '<div class="schedule-item">';
    html += _date_div(gig.date_start);
    html += _text_div(gig);
    html += '</div>';
    html += '</li>';
  });
  html += "</ul>";
  const div = document.getElementById("schedule-list");
  div.innerHTML = html;
}

function insert_schedule() {
  $.getJSON(
    'https://www.bandhelper.com/feed/calendar/64519?range=9',
    _do_insert_schedule
  );
}
