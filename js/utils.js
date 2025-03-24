function html_unescape(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  var text = doc.documentElement.textContent;
  return text.replaceAll("\n\n", "<br/></br/>");
}

// Fetches JSON from `url` and calls `callback_func`. Fetches JSON from
// `file` and calls `callback_func`. If the fetch fails, fetches JSON from
// `file` and calls `callback_func`.
//
// We do it in this order because BandHelper already caches this data and
// we'd prefer the fresher data. The files will exist locally because they
// are fetched every 15 minutes by a cron job. If there is an error fetching
// them, they will contain old-ish data.
function get_json_data(url, file, callback_func) {
  file = '/' + file;
  $.ajax({
    dataType: "json",
    url: url,
    data: null,
    success: callback_func,
    error: () => {
      $.ajax({
        dataType: "json",
        url: file,
        data: null,
        success: callback_func
      });
    }
  });
}
