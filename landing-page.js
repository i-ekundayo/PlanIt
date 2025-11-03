const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close');
const cover = document.querySelector('.cover');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  hamburger.style.display = 'none';
  closeIcon.style.display = 'flex';
  cover.style.display = 'flex';
  sidebar.style.display = 'flex';
  document.body.style.overflow = 'hidden';
})

closeIcon.addEventListener('click', () => {
  hamburger.style.display = "flex";
  closeIcon.style.display = "none";
  cover.style.display = "none";
  sidebar.style.display = "none";
  document.body.style.overflow = "auto";
})