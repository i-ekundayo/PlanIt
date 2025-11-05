const menu = document.querySelector(".header__search img");
const container = document.querySelector(".container");

menu.addEventListener("click", () => {
  console.log('clicked');
  
  container.classList.toggle("collapsed");
});
