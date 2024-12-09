import { retriveOneProduct } from "../repositories/productRepository.js";

export class CartProduct {
    constructor(productID, quantity) {
        this.productID = productID;
        this.quantity = quantity;
    }

    static keyInLocalStorage = "cart_products";

    getProduct() {
        return retriveOneProduct(this.productID).then((p) => p);
    }

    getSubtotal() {
        return this.getProduct().then((p) => this.quantity * Number(p.price));
    }

    toString() {
        return `${this.productID},${this.quantity}`;
    }
}
