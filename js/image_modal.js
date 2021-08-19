function modal_image(img) {
  const modal = document.getElementById('myModal');
  const modal_img = document.getElementById('img01');
  const caption = document.getElementById('caption');

  modal.style.display = 'block';
  modal_img.src = img.src;
  modal_img.alt = img.alt;
  caption.innerHTML = img.alt;
}
