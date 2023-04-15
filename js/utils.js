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
