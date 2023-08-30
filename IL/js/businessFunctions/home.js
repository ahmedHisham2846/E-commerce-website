// Show Products
import { retriveAllProducts } from "../../../BL/repositories/productRepository.js";

function loadProducts() {
  retriveAllProducts().then((products) => showProducts(products));
}

function showProducts(products) {
  let productsContainer = document.querySelector(".shop .products");
  productsContainer.innerHTML = "";
  products.forEach((p) => {
    productsContainer.innerHTML += `
    <div class="product-card d-flex justify-content-center pb-5 position-relative top-0">
      <input type="number"  name="quantity" min="1" max="${p.getQuantityInStore()}" value="1" class="position-absolute ps-2">
      <div
      class="d-flex flex-column gap-3 justify-content-center align-items-center px-2 pb-4"
      >
        <img src="${p.imagePath}" />
        <span class="text-center">${p.name}</span>
        <span>Rs. ${p.price}</span>
        <input type="hidden" name="category" value="${p.category}">
        <input type="hidden" name="id" value="${p.id}">
        <button class="btn custom-btn">Add To Cart</button>
        </div>
    </div>
    `;
  });
  setClicEventOnButton();
}

import { storeCartProductInLocalStorage } from "../../../BL/repositories/productCartRepository.js";
import { CartProduct } from "../../../BL/entities/cartProduct.js";

function addProductToCart(e) {
  let productID =
    e.target.parentElement.querySelector('input[name="id"]').value;
  let count = e.target.parentElement.parentElement.querySelector(
    'input[name="quantity"]'
  ).value;
  storeCartProductInLocalStorage(new CartProduct(productID, count));
}

function setClicEventOnButton() {
  let buttons = document.querySelectorAll(
    ".shop .products .product-card button"
  );
  buttons.forEach((b) => {
    b.onclick = addProductToCart;
  });
}

loadProducts();

/*----------------------------------------------------------*/

// Search For Products
document.getElementById("txtSearch").oninput = (e) => {
  let keyWord = e.target.value;
  loadSearchedProducts(keyWord);
};

function loadSearchedProducts(keyWord) {
  retriveAllProducts().then((products) => {
    let sProducts = products.filter((p) => p.name.includes(keyWord));
    showProducts(sProducts);
  });
}

/*----------------------------------------------------------*/

// Filter Using Category
document.querySelectorAll(".shop .filter .category").forEach((c) => {
  c.onclick = () => {
    let category = c.dataset.category;
    console.log(category);
    loadFilteredProducts(category);
  };
});

function loadFilteredProducts(category) {
  retriveAllProducts().then((products) => {
    let fProducts = products.filter((p) => p.category == category);
    showProducts(fProducts);
  });
}
