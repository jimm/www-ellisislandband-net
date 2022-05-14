window.onkeyup = function(event) {
  if (event.keyCode == 27)
    document.getElementById('myModal').style.display = 'none';
}

function modal_image(img) {
  const modal = document.getElementById('myModal');
  const modal_img = document.getElementById('img01');
  const caption = document.getElementById('caption');

  modal_img.src = img.src;
  modal_img.alt = img.alt;
  caption.innerHTML = img.alt;
  modal.style.display = 'block';
}
