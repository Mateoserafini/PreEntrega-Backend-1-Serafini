import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    static ultId = 0;

    constructor() {
        this.path = './src/models/products.json';
        this.products = [];
    }

    async addProduct({ title, description, price, img, code, stock }) {
        try {
            const id = uuidv4();
            let newProduct = { id, title, description, price, img, code, stock };

            this.products = await this.getProducts();
            this.products.push(newProduct);

            await fs.writeFile(this.path, JSON.stringify(this.products));
            return newProduct;
        } catch (error) {
            throw new Error('Error al añadir producto: ' + error.message);
        }
    }

    async getProducts() {
        try {
            const response = await fs.readFile(this.path, 'utf-8');
            const responseJSON = JSON.parse(response);
            return responseJSON;
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    }

    async getProductsById(id) {
        try {
            const response = await this.getProducts();
            const product = response.find(product => product.id == id);

            if (product) {
                return product;
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al obtener producto por ID: ' + error.message);
        }
    }

    async updateProduct(id, { ...data }) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id == id);

            if (index !== -1) {
                products[index] = { id, ...data };
                await fs.writeFile(this.path, JSON.stringify(products));
                return products[index];
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al actualizar producto: ' + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id == id);

            if (index !== -1) {
                products.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(products));
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al eliminar producto: ' + error.message);
        }
    }
}
