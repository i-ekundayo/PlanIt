// Changing the background of the quick action links
const quickAction = document.querySelectorAll(".quick-action");

quickAction.forEach((action) => {
  action.addEventListener("click", () => {
    quickAction.forEach((action) => {
      action.classList.remove("active");
    });
    action.classList.add("active");
  });
});

// Displaying and Closing the event creation modal
const createEvent = document.querySelector(".header__button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__heading img");
const cancelBtn = document.querySelector(".modal__button--cancel");
const overlay = document.querySelector(".overlay");

// function to show and hide modal
const modalDisplay = () => {
  modal.classList.toggle("show");
  document.body.classList.toggle("no-scroll");
  overlay.classList.toggle("show");
};
// Open Modal
createEvent.addEventListener("click", modalDisplay);
// Close modal using close btn
closeBtn.addEventListener("click", modalDisplay);
// Close modal using cancel btn
cancelBtn.addEventListener('click', modalDisplay);
