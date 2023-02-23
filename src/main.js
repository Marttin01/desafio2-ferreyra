
import fs from 'fs/promises'

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
        this.productsId = 1;
    }

    async addProduct (product) {
        product.id = this.productsId++
        this.products.push(product)
        let json =  JSON.stringify(this.products, null, 1)
        await fs.writeFile(this.path, json)
    }

    async getProducts () {
        let json = await fs.readFile(this.path, "utf-8")
        let stack = JSON.parse(json)
        return stack
    }

     async getProductById (id) {
        const json = await fs.readFile(this.path, "utf-8")
        const productsId = JSON.parse(json)

        let idFound = productsId.find(p => p.id === id)

        if(!idFound) {
            console.log("Not found")
            return null
        }else {
            return idFound
        }

    }

    async updateProduct (id, productUpdate) {
        const json = await fs.readFile(this.path, "utf-8")
        const producData = JSON.parse(json)
        
        let index = producData.findIndex(p => p.id === id)

        if(index === -1) {
            console.log("El id del producto a actualizar no se encontro")
            return null
        }

       producData[index] = {
        ...producData[index],
        ...productUpdate,
        id,
       }

       let json2 =  JSON.stringify(producData, null, 1)
       await fs.writeFile(this.path, json2)
    }

    async deleteProduct (id) {
        let producDelete = this.products.find(p => p.id === id)
        if ( producDelete) {
           let indexOfDelete = this.products.indexOf(producDelete)
            this.products.splice(indexOfDelete, 1)
        }
        let json = JSON.stringify(this.products, null, 1)
        await fs.writeFile(this.path, json)

    }

}

const stack = new ProductManager("./static/productos.txt")
await stack.addProduct({"title":"silla", "description":"para sentarse", "price":"1000", "thumbnail":"img/silla.png", "code":"01","stock":"20"})
await stack.addProduct({"title":"mesa", "description":"para comer", "price":"2000", "thumbnail":"img/mesa.png", "code":"02","stock":"30"})
await stack.addProduct({"title":"cama", "description":"para dormir", "price":"3000", "thumbnail":"img/cama.png", "code":"03","stock":"40"})
await stack.addProduct({"title":"tele", "description":"para entretener", "price":"10000", "thumbnail":"img/tele.png", "code":"04","stock":"50"})
await stack.addProduct({"title":"escritorio", "description":"para estudiar", "price":"5000", "thumbnail":"img/escritorio.png", "code":"05","stock":"60"})

// await stack.updateProduct(1, {"title":"silla-gamer", "price":"15000"})
// await stack.deleteProduct(1)

console.log(await stack.getProducts())
// console.log( await stack.getProductById(2))