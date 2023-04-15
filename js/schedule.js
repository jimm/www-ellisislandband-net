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
