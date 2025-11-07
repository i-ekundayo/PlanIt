const div = document.querySelector(".chat__body");
const messageCard = document.querySelectorAll(".message__card");
const back = document.querySelector(".chat__heading--img");
const chats = document.querySelector(".chats__active");
const noChat = document.querySelector(".chats__none")
const messages = document.querySelector(".messages");

const mq = window.matchMedia("(max-width: 900px)");

messageCard.forEach((card) => {
  card.addEventListener("click", () => {
    chats.style.display = "flex";
    noChat.style.display = "none";
    div.scrollTop = div.scrollHeight;
  });
});

mq.addEventListener("change", (e) => {
  if (e.matches) {
    chats.style.display = "none";
    back.addEventListener("click", () => {
      chats.style.display = "none";
      messages.style.display = "flex";
    });
    messageCard.forEach((card) => {
      card.addEventListener("click", () => {
        messages.style.display = "none";
        chats.style.display = "flex";
      });
    });
  } else {
    messages.style.display = "flex";
    chats.style.display = "flex";
  }
});

