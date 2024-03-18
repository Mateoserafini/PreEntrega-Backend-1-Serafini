import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {

    constructor() {
        this.path = './src/models/cart.json';
        this.products = [];
    }

    async getCarts() {
        try {
            const response = await fs.readFile(this.path, 'utf-8');
            const responseJSON = JSON.parse(response);
            return responseJSON;
        } catch (error) {
            throw new Error('Error al leer los carritos: ' + error.message);
        }
    }

    async getCart(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id == id);

            if (cart) {
                return cart.products;
            } else {
                throw new Error('Carrito no encontrado');
            }
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

    async newCart() {
        try {
            const id = uuidv4();
            const newCart = { id, products: [] };
            this.carts = await this.getCarts();
            this.carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(this.carts));
            return newCart;
        } catch (error) {
            throw new Error('Error al crear un nuevo carrito: ' + error.message);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            if (!carts || !Array.isArray(carts)) {
                throw new Error('No se pudieron obtener los carritos.');
            }

            const index = carts.findIndex(cart => cart.id == cartId);
            if (index === -1) {
                throw new Error('Carrito no encontrado');
            }

            const cartProducts = await this.getCart(cartId);
            if (!cartProducts || !Array.isArray(cartProducts)) {
                throw new Error('No se pudieron obtener los productos del carrito.');
            }

            const existProductIndex = cartProducts.findIndex(product => product.productId == productId);
            if (existProductIndex !== -1) {
                cartProducts[existProductIndex].quant++;
            } else {
                cartProducts.push({ productId, quant: 1 });
            }

            carts[index].products = cartProducts;
            await fs.writeFile(this.path, JSON.stringify(carts));
            console.log('Producto agregado con éxito');
        } catch (error) {
            throw new Error('Error al agregar producto al carrito: ' + error.message);
        }
    }
}
