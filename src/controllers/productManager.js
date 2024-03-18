import { promises as fs } from 'fs'
import {v4 as uuidv4} from 'uuid'

export class ProductManager{
    static ultId = 0;

    constructor(){
        this.path  = './src/models/products.json'
        this.products = []
    }

    addProduct = async ({title, description, price, img, code, stock}) => {
        //https://www.npmjs.com/package/uuid enlase para ver el packege que me genera el id
        const id = uuidv4()
        let newProduct = {id, title, description, price, img, code, stock}

        this.products = await this.getProducts()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
        return newProduct;
    }

    getProducts = async () =>{
        const response = await fs.readFile(this.path,'utf-8')
        const responseJSON = JSON.parse(response)

        return responseJSON;
    }

    getProductsById = async (id) =>{
        const response = await this.getProducts()

        const product = response.find(product => product.id == id)

        if(product){
            return(product)
        }else{
            console.log('producto no encontrado')
        }
    }

    async updateProduct(id, {... data}) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id == id);
    
        if (index !== -1) { // Corregir la comparación aquí
            products[index] = {id, ...data};
            await fs.writeFile(this.path, JSON.stringify(products));
            return products[index];
        } else {
            console.log('No se encontró el producto');
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id == id)

        if(index !== -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        }else{
            console.log('Producto no encontrado')
        }
    }
}