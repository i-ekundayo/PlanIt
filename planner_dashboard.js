const menu = document.querySelector(".header__search img");
const container = document.querySelector(".container");

menu.addEventListener("click", () => {
  container.classList.toggle("collapsed");
});
