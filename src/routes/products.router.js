import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router()

productsRouter.get('/', async (req, res) =>{
    try{
        const {limit} = req.query;
        const products =  await productManager.getProducts()
        if(limit){
            const limProducts = products.slice(0, limit)
            return res.json(limProducts)
        }
        return res.json(products)

    }catch(error){
        console.log(error)
        res.send('Error al intentar recibir los productos')
    }
})

productsRouter.get('/:pid', async (req, res) =>{
    try{
        const {pid} = req.params;
        const products = await productManager.getProductsById(pid)
        res.json(products)
    }catch(error){
        console.log(error)
        res.send('Error al intentar recibir el producto por id')
    }
})

productsRouter.post('/', async (req, res) =>{
    try{
        const {title, description, price, img, code, stock} = req.body;
        const response = await productManager.addProduct({title, description, price, img, code, stock})
        res.json(response)

    }catch(error){
        console.log(error)
        res.send('Error al agregar un producto')
    }
})

productsRouter.put('/:pid', async (req,res) =>{
    const {pid} = req.params;
    try{
        const {title, description, price, img, code, stock} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, img, code, stock})
        res.json(response)

    }catch(error){
        console.log(error)
        res.send('Error al modificar un producto')
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('Producto eliminado exitosamente')
    } catch (error) {
        console.log(error)
        res.send('Error al eliminar un elemento')
    }
})

export{productsRouter}