function get_json() {
  const url = 'https://www.bandhelper.com/feed/calendar/64519?range=9';
  var request = new XMLHttpRequest(); // a new request
  request.open("GET", url, false);
  request.send(null);
  return request.responseText;          
}

function html_decode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function insert_schedule() {
  const schedule = JSON.parse(get_json());

  html = "<ul>";
  schedule.forEach(gig => {
    html += `<li><strong>${gig.date_display}</strong>`;
    html += ` &ndash; <em>${gig.name}.</em> `;
    html += html_decode(gig.custom_cC99h9);
    html += "</li><p>";
  });
  html += "</ul>";
  const div = document.getElementById("schedule-list");
  div.innerHTML = html;
}
