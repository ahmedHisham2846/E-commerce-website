import { Product } from "../entities/product.js";

export async function retriveAllProducts() {
  try {
    let jsonProducts = await fetch("../../DAL/products.json");
    let productsFromApi = await jsonProducts.json();
    let products = [];
    productsFromApi.forEach((pFromApi) => {
      let product = new Product(
        pFromApi.id,
        pFromApi.name,
        Number(pFromApi.price),
        pFromApi.category
      );
      products.push(product);
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function retriveOneProduct(id) {
  try {
    let products = await retriveAllProducts();
    let product;
    products.forEach((p) => {
      if (p.id == id) product = p;
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}

export function storeProductInLocalStorage(product) {
  localStorage.setItem(product.productKeyInLocalStorage, product);
}

export function getProductFromLocalStorage(id) {
  let product = new Product(id);
  let strProduct = localStorage.getItem(product.productKeyInLocalStorage);
  product.name = strProduct.split(";")[1];
  product.price = strProduct.split(";")[2];
  product.category = strProduct.split(";")[3];
  return product;
}

export function removeProductFromLocalStorage(id) {
  localStorage.removeItem(new Product(id).productKeyInLocalStorage);
}
