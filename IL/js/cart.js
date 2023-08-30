function showSubtotal(element) {
  let subtotal = element.querySelector("div:last-of-type").innerHTML;
  document.querySelector(
    ".cart-detals .details > div:first-child div:last-child"
  ).innerHTML = subtotal;
}

/*---------------------------------------------------------------- */
import { retriveAllCartProducts } from "../../BL/repositories/productCartRepository.js";

function loadCartProducts() {
  let cartProducts = retriveAllCartProducts();
  showCartProducts(cartProducts);
}

function showCartProducts(cartProducts) {
  let cartProductsContainer = document.querySelector(".cart .cart-products");
  cartProductsContainer.innerHTML = "";
  let totalAmmount = 0;
  cartProducts.forEach(async (cp, index) => {
    let product = await cp.getProduct();
    let subtotal = await cp.getSubtotal();
    totalAmmount += subtotal;

    cartProductsContainer.innerHTML += `
    <div class="product bg-white d-flex justify-content-center gap-5 align-items-center p-3">
    <img src="${product.imagePath}" />
    <div>${product.name}</div>
    <div>Rs. ${product.price}</div>
    <div class="quantity py-1 px-2">${cp.quantity}</div>
    <div id="subtotal">Rs. ${subtotal}</div>
    <i class="fa-solid fa-trash-can p-3"></i>
    <input type="hidden" name="id" value="${cp.productID}">
    </div>
    `;
    displayTotalAmmount(totalAmmount);
    setDelletEvent();
  });
}

import { removeCartProductFromLocalStorage } from "../../BL/repositories/productCartRepository.js";

function setDelletEvent() {
  document.querySelectorAll(".cart .cart-products .product i").forEach((e) => {
    e.onclick = function (e) {
      let productID =
        e.target.parentElement.querySelector('input[name="id"]').value;
      removeCartProductFromLocalStorage(productID);
      e.target.parentElement.remove();
    };
  });
}

function displayTotalAmmount(totalAmmount) {
  document.querySelector(
    ".cart .cart-detals .details .total"
  ).innerHTML = `Rs. ${totalAmmount}`;
}

loadCartProducts();
