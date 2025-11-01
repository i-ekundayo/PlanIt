const slider = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const skip = document.getElementById("skip");
const next = document.getElementById("next");

let currentIndex = 0;
let startX = 0;
let currentX = 0;

function changeIndicator() {
  indicators.forEach((indicator) => {
    indicator.classList.remove("active-indicator");
    indicators[currentIndex].classList.add("active-indicator");
  });
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex = (currentIndex + 1) % slides.length;

    slider.style.transform = `translateX(${-currentIndex * 300}px)`;
    changeIndicator();
  }
  return;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex = (currentIndex - 1) % slides.length;

    slider.style.transform = `translateX(${-currentIndex * 300}px)`;
    changeIndicator();
  }
  return;
}

next.addEventListener("click", nextSlide);

skip.addEventListener("click", () => {
  slider.style.transform = `translateX(${-(slides.length - 1) * 300}px)`;
  currentIndex = slides.length - 1;
  changeIndicator();
});


// Screen touch
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
  currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  if (currentIndex === 0 && diff > 0) {
    console.log(true);

    slider.style.transform = "translateX(0)";
  } else if (currentIndex === 2 && diff < 0) {
    slider.style.transform = `translateX(${-currentIndex * 300}px)`;
  } else {
    slider.style.transform = `translateX(${-currentIndex * 300 + diff}px)`;
  }
});

slider.addEventListener("touchend", (e) => {
  slider.style.transition = "transform 0.4s ease";
  const diff = e.changedTouches[0].clientX - startX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  } else {
    slider.style.transform = `translate(${-currentIndex * 300}px)`;
  }
});
