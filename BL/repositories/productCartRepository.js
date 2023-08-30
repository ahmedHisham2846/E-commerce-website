import { CartProduct } from "../entities/cartProduct.js";

export function retriveAllCartProducts() {
  let allCartProducts = [];
  let strCartProducts = localStorage.getItem(CartProduct.keyInLocalStorage);
  if (strCartProducts == null) return allCartProducts;
  strCartProducts.split(";").forEach((strCartProduct) => {
    let cartProduct = new CartProduct();
    cartProduct.productID = Number(strCartProduct.split(",")[0]);
    cartProduct.quantity = Number(strCartProduct.split(",")[1]);
    if (cartProduct.productID) allCartProducts.push(cartProduct);
  });

  return allCartProducts;
}

export function retriveOneProduct(id) {
  return retriveAllCartProducts().find((cp) => cp.productID == id);
}

export function storeCartProductInLocalStorage(cartProduct) {
  let allCartProducts = retriveAllCartProducts();
  let isCartProductFound = false;
  let strAllCartProducts = "";

  for (let index = 0; index < allCartProducts.length; index++) {
    if (allCartProducts[index].productID == cartProduct.productID) {
      isCartProductFound = true;
      allCartProducts[index] = cartProduct;
    }
    strAllCartProducts += `${allCartProducts[index]};`;
  }

  if (!isCartProductFound) strAllCartProducts += `${cartProduct};`;
  localStorage.setItem(CartProduct.keyInLocalStorage, strAllCartProducts);
}

export function removeCartProductFromLocalStorage(id) {
  let allCartProducts = retriveAllCartProducts();
  let strAllCartProducts = "";

  for (let index = 0; index < allCartProducts.length; index++) {
    if (allCartProducts[index].productID == id) continue;
    strAllCartProducts += `${allCartProducts[index]};`;
  }
  
  localStorage.setItem(CartProduct.keyInLocalStorage, strAllCartProducts);
}
