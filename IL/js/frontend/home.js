document.getElementsByTagName("body")[0].onscroll = () => {
  if (window.scrollY >= 250) {
    document.querySelector("body>i").classList.remove("d-none");
  } else {
    document.querySelector("body>i").classList.add("d-none");
  }
};

document.querySelector("body>i").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function slideLandingImage() {
  let landingImage = document.querySelector(
    "header .landing .landing-slider .slider img"
  );

  let images = [
    "./IL/images/landingSlider/Rocket.png",
    "./IL/images/landingSlider/mobile.png",
    "./IL/images/landingSlider/dress.png",
    "./IL/images/landingSlider/sperker.png",
  ];
  let imageIndex = 0;
  setInterval(() => {
    if (imageIndex == images.length) imageIndex = 0;
    landingImage.style.opacity = "0";

    setTimeout(() => {
      landingImage.src = images[imageIndex++];
      setTimeout(() => {
        landingImage.style.opacity = "1";
      }, 200);
    }, 500);
  }, 3000);
}

/*
  Discount Slider
  * discount array.
  * next index of discount array.
  * function to get next discount html elements.
  * declare the container of discount slider.
  * function that return a new function to remove the current discount and show the next descount.
  * declare the variable that contain the slider interval.
  * setting the bullets of discount slider.
*/

// Hint: this discounts are static but if in other setuation it will be a stored data come from API

let discounts = [
  {
    id: 1,
    brand: "H & M",
    type: "DRESS",
    offer: "UP TO 25% OFF",
    imagePath: "./IL/images/landingSlider/dress.png",
  },
  {
    id: 2,
    brand: "LAVA",
    type: "SPEAKER",
    offer: "UP TO 25% OFF",
    imagePath: "./IL/images/landingSlider/sperker.png",
  },
  {
    id: 3,
    brand: "SAMSUNG",
    type: "MOBILE",
    offer: "UP TO 25% OFF",
    imagePath: "./IL/images/landingSlider/mobile.png",
  },
];

let discountIndex = 0;
function getNextDiscountElements(id) {
  let discountDetails = document.createElement("div");
  discountDetails.classList.add(
    "descount-details",
    "d-flex",
    "flex-column",
    "gap-3",
    "justify-content-center",
    "align-self-center"
  );
  discountDetails.innerHTML = `<span>${discounts[id].brand}</span>`;
  discountDetails.innerHTML += `<span>${discounts[id].type}</span>`;
  discountDetails.innerHTML += `<span>${discounts[id].offer}</span>`;
  discountDetails.innerHTML += "<button class='btn btn-dark'>Shop Now</button>";

  let discountImage = document.createElement("img");
  discountImage.src = discounts[id].imagePath;
  discountImage.className = "h-100";

  return [discountDetails, discountImage];
}

let discountContainer = document.querySelector(
  ".discount > div:not(:last-child) div"
);
function slideDiscounts(id = discountIndex++, isBullitClicked) {
  return function () {
    if (discountIndex == discounts.length) discountIndex = 0;
    discountContainer.style.scale = "0";

    setTimeout(() => {
      discountContainer.innerHTML = "";

      !isBullitClicked ? (id = discountIndex++) : id;
      let nextDiscountDetails = getNextDiscountElements(id)[0];
      discountContainer.appendChild(nextDiscountDetails);
      let nextDiscountImage = getNextDiscountElements(id)[1];
      discountContainer.appendChild(nextDiscountImage);

      setTimeout(() => {
        discountContainer.style.scale = "1";
      }, 200);
    }, 500);
  };
}

let autoSlideDiscount;
document
  .querySelectorAll(".discount .discount-pointers span ")
  .forEach((bullit) => {
    bullit.onclick = () => {
      clearInterval(autoSlideDiscount);
      let discountID = bullit.dataset.discountid;
      slideDiscounts(discountID, true)();
      setTimeout(() => {
        startDiscountInterval();
      }, 700);
    };
  });

function startDiscountInterval() {
  autoSlideDiscount = setInterval(slideDiscounts(), 5000);
}

function toggleNavbar() {
  document.querySelector(
    "header .nav-bar .container button.humporgar"
  ).onclick = () => {
    document
      .querySelector("header .nav-bar .container nav")
      .classList.toggle("opened");
  };
}

toggleNavbar();
startDiscountInterval();
slideLandingImage();
