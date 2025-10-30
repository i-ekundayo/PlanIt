const slider = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const skip = document.getElementById("skip");
const next = document.getElementById("next");

let currentIndex = 0;
let startX = 0;
let currentX = 0;

function nextSlide() {
  if(currentIndex < slides.length-1){
    currentIndex = (currentIndex + 1) % slides.length;

    slider.style.transform = `translateX(${-currentIndex * 300}px)`;
  }
  return;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex = (currentIndex - 1) % slides.length;

    slider.style.transform = `translateX(${-currentIndex * 300}px)`;
  }
  return;
}

next.addEventListener("click", nextSlide);

skip.addEventListener("click", () => {
  slider.style.transform = `translateX(${-(slides.length - 1) * 300}px)`;

  currentIndex = slides.length - 1;
});

// Screen touch
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
slider.addEventListener("touchmove", (e) => {
  currentX = e.touches[0].clientX;
});
slider.addEventListener("touchend", (e) => {
  slider.style.transition = "transform 0.4s ease";
  const diff = e.changedTouches[0].clientX - startX;

  if (diff > 0) {
    prevSlide();
  } else {
    nextSlide();
  }
  console.log(currentIndex);
  
});
