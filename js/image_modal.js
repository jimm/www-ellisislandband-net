window.onkeyup = function(event) {
  if (event.keyCode == 27)
    $('#myModal').hide();
}

function modal_image(img) {
  const modal = $('#myModal');
  const modal_img = $('#img01');
  const caption = $('#caption');

  modal_img.attr("src", img.src);
  modal_img.attr("alt", img.alt);
  caption.text(img.alt);
  modal.show();
}
