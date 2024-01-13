function html_unescape(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// Fetches JSON from `file` and calls `callback_func`. If the file does not
// exist or there is any other error, fetches JSON from `url` and calls
// `callback_func`.
function get_file_or_url(file, url, callback_func) {
  file = '/' + file;
  $.ajax({
    dataType: "json",
    url: file,
    data: null,
    success: callback_func,
    error: () => {
      $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: callback_func
      });
    }
  });
}
