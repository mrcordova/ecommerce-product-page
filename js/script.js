let slideIndex = 1;
const arrows = document.querySelectorAll(".left-arrow, .right-arrow");
const counterBtns = document.querySelectorAll(".counter");
const quantity = document.querySelector(".quantity-amount");
const addToCartBtn = document.querySelector(".cart-btn");
const cartAmount = document.querySelector(".cart-amount");
const showCart = document.querySelector(".cart");
const cartMenuEmpty = document.querySelector(".cart-menu-empty");
const cartMenuListContainer = document.querySelector(
  ".cart-menu-list-container"
);
const cartList = document.querySelector(".cart-list");
const thumbnailBtns = document.querySelectorAll(".thumbnail-container>button");
let focusdImg = document.getElementById("autofocus");

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
    slides[i].classList.add("hide");
  }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  slides[slideIndex - 1].classList.toggle("hide", false);
  //   dots[slideIndex - 1].className += " active";
}

function updateCounter(e) {
  const val = parseInt(e.currentTarget.getAttribute("data-value"));
  quantity.textContent = `${Math.max(0, parseInt(quantity.textContent) + val)}`;
}
function createLiElement() {
  const li = document.createElement("li");
  cartList.appendChild(li);

  const thumbnailImg = document.createElement("img");
  thumbnailImg.setAttribute("class", "thumbnail");
  thumbnailImg.setAttribute("src", "./images/image-product-1-thumbnail.jpg");
  thumbnailImg.setAttribute("alt", "shoes");
  li.appendChild(thumbnailImg);

  const div = document.createElement("div");
  li.appendChild(div);

  const cardItemTitlePara = document.createElement("p");
  cardItemTitlePara.setAttribute("class", "cart-item-title kumbh-sans-700");
  cardItemTitlePara.insertAdjacentText(
    "afterbegin",
    "Fall Limited Edition Sneakers"
  );
  div.appendChild(cardItemTitlePara);

  const para = document.createElement("p");
  div.appendChild(para);

  para.insertAdjacentHTML(
    "beforeend",
    '<span class="cart-item-price">$125.00 </span>'
  );
  para.insertAdjacentHTML(
    "beforeend",
    `<span class="cart-item-quantity">x ${quantity.textContent} </span>`
  );
  para.insertAdjacentHTML(
    "beforeend",
    `<span class="cart-item-total kumbh-sans-700">$${(
      parseInt(quantity.textContent) * 125.0
    ).toFixed(2)}</span>`
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete-btn");

  deleteBtn.addEventListener(
    "click",
    (e) => {
      const q = e.currentTarget.parentElement
        .querySelector(".cart-item-quantity")
        .textContent.slice(2);
      cartAmount.textContent = `${
        parseInt(cartAmount.textContent) + -parseInt(q)
      }`;
      cartAmount.classList.toggle(
        "hide",
        parseInt(cartAmount.textContent) == 0
      );
      cartMenuEmpty.classList.toggle(
        "hide",
        parseInt(cartAmount.textContent) != 0
      );
      cartMenuListContainer.classList.toggle(
        "hide",
        parseInt(cartAmount.textContent) == 0
      );
      e.currentTarget.parentElement.remove();
    },
    { once: true }
  );

  li.appendChild(deleteBtn);

  const trashImg = document.createElement("img");
  trashImg.setAttribute("class", "delete");
  trashImg.setAttribute("src", "./images/icon-delete.svg");
  trashImg.setAttribute("alt", "trash can");

  deleteBtn.appendChild(trashImg);
}

function addToCart(e) {
  const currentItemAmount =
    parseInt(quantity.textContent) + parseInt(cartAmount.textContent);

  cartAmount.classList.toggle("hide", currentItemAmount == 0);
  cartMenuEmpty.classList.toggle("hide", currentItemAmount != 0);
  cartMenuListContainer.classList.toggle("hide", currentItemAmount == 0);

  cartAmount.textContent = `${currentItemAmount}`;
  createLiElement();
}

function changeFocus(e) {
  focusdImg.removeAttribute("id", "autofocus");
  e.currentTarget.setAttribute("id", "autofocus");
  focusdImg = e.currentTarget;
}
for (const arrow of arrows) {
  arrow.addEventListener("click", moveSlides);
}

for (const counterBtn of counterBtns) {
  counterBtn.addEventListener("click", updateCounter);
}

for (const thumbnailBtn of thumbnailBtns) {
  thumbnailBtn.addEventListener("click", changeFocus);
}
addToCartBtn.addEventListener("click", addToCart);
