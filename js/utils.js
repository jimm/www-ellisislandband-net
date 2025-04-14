function html_unescape(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  var text = doc.documentElement.textContent;
  return text.replaceAll("\n\n", "<br/></br/>");
}

// Fetches JSON from either `url` or `file` and calls `callback_func` on
// success. On failure, tries the other one. The order is determined by
// `try_order` below. BandHelper already caches this data and we'd prefer
// the fresher data, but it seems slower. The files will exist locally
// because they are fetched every 15 minutes by a cron job. If there is an
// error fetching them, they will contain old-ish data.
function get_json_data(url, file, callback_func) {
  try_order = [file, url];
  $.ajax({
    dataType: "json",
    url: try_order[0],
    data: null,
    success: callback_func,
    error: () => {
      $.ajax({
        dataType: "json",
        url: try_order[1],
        data: null,
        success: callback_func
      });
    }
  });
}
