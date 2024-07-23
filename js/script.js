let slideIndex = 1;
const arrows = document.querySelectorAll(".left-arrow, .right-arrow");
const counterBtns = document.querySelectorAll(".counter");
const quantity = document.querySelector(".quantity-amount");

showSlides(slideIndex);

function moveSlides(e) {
  const n = parseInt(e.currentTarget.getAttribute("data-value"));
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  //   let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  slides[slideIndex - 1].style.display = "block";
  //   dots[slideIndex - 1].className += " active";
}

function updateCounter(e) {
  const val = parseInt(e.currentTarget.getAttribute("data-value"));
  quantity.textContent = `${Math.max(0, parseInt(quantity.textContent) + val)}`;
}

for (const arrow of arrows) {
  arrow.addEventListener("click", moveSlides);
}

for (const counterBtn of counterBtns) {
  counterBtn.addEventListener("click", updateCounter);
}
