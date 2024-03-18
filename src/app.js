import express from 'express'
import { ProductManager } from './controllers/productManager.js'
import { productsRouter } from './routes/products.router.js';

const app = express();
const PORT = 8080;

export const productManager = new ProductManager;

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter)

app.listen(PORT, (req, res) => {
    console.log('Servidor escuchando en el puerto 8080')
})