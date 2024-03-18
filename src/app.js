import express from 'express'
import { ProductManager } from './controllers/productManager.js'
import { CartManager } from './controllers/cartManager.js'
import { productsRouter } from './routes/products.router.js'
import { cartsRouter } from './routes/cart.router.js';

const app = express();
const PORT = 8080;

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter )

app.listen(PORT, (req, res) => {
    console.log('Servidor escuchando en el puerto 8080')
})