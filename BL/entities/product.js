import { retriveAllCartProducts } from "../repositories/productCartRepository.js";

export class Product {
    constructor(id, name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.id = id;
        this.imagePath = `images/products/${id}.png`;
        this.productKeyInLocalStorage = `product_${id}`;
    }
    getQuantityInStore() {
        let allCartProducts = retriveAllCartProducts();
        let curreCardProduct = allCartProducts.find(
            (cp) => cp.productID == this.id
        );
        return curreCardProduct ? 10 - curreCardProduct.quantity : 10;
    }

    toString() {
        return `${this.id};${this.name};${this.price};${this.category};${this.getQuantityInStore()}`;
    }
}
