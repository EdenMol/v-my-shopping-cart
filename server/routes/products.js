const express = require('express');
const router = express.Router()
const path = require('path')
const appRootDir = path.dirname(require.main.filename)
const fs = require('fs')

const Product = require('../models/product')

//GET /products
router.get("/", (req, res) => {
    const p = req.query.p ? req.query.p : 1;
    Product.find({}, (error, products) => {
        if (error) console.log(error)
        res.json(products)
    })
        .skip((p - 1) * 4)
        .limit(4)
})

//GET /products/category
router.get("/:category", (req, res) => {
    const cat = req.params.category
    const p = req.query.p ? req.query.p : 1;

    Product.find({ category: cat }, (error, products) => {
        if (error) console.log(error)
        res.json(products)
    })
        .skip((p - 1) * 4)
        .limit(4)
})

//GET /count/category
router.get("/count/:category", (req, res) => {
    const cat = req.params.category
    if (cat === "all") {
        Product.countDocuments({}, (error, count) => res.json(count))
    } else {
        Product.countDocuments({ categoty: cat }, (error, count) => res.json(count))
    }
})

//POST /products
router.post("/", (req, res) => {

    const name = req.fields.name
    const category = req.fields.category
    const description = req.fields.description
    const imageUpload = req.files.imageUpload
    let image = imageUpload ? imageUpload.name : "noImage.png"
    const price = req.fields.price

    if (image !== "noImage.png") {
        image = +new Date() + "_" + image
        const oldPath = imageUpload.path
        const newPath = `${appRootDir}/public/media/products/${image}`
        const rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, error => {
            if (error) {
                res.status(500).send(error)
            }
        })
    }

    const product = new Product({
        name,
        category,
        description,
        image,
        price
    })

    product.save(error => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(201).end()
        }
    })
})
//PUT /products
router.put("/", (req, res) => {

    const id = req.fields.id
    const name = req.fields.name
    const category = req.fields.category
    const description = req.fields.description
    const imageUpload = req.files.imageUpload
    const price = req.fields.price

    Product.findById(id, (error, product) => {
        if (error) {
            res.status(500).send(error)
        }
        if (imageUpload) {
            //if not then remove it
            if (product.image != "noImage.png") {
                const imagePath = `${appRootDir}/public/media/products/${product.image}`
                //remove image
                fs.unlink(imagePath, error => {
                    if (error) {
                        res.status(500).send(error)
                    }
                })
            }

            const image = +new Date() + "_" + imageUpload.name
            const oldPath = imageUpload.path
            const newPath = `${appRootDir}/public/media/products/${image}`
            const rawData = fs.readFileSync(oldPath)

            fs.writeFile(newPath, rawData, error => {
                //if error end it
                if (error) res.status(500).send(error)
            })
            //change current image prod name
            product.image = image
        }

        product.name = name
        product.category = category
        product.description = description
        product.price = price

        product.save(error => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.status(201).end()
            }
        })
    })

})
//DELETE /products/:id
router.delete("/:id", (req, res) => {
    const id = req.params.id
    //find this product
    Product.findById(id, (error, product) => {
        if (error)
            res.status(500).send(error)


        if (product.image != "noImage.png") {
            const imagePath = `${appRootDir}/public/media/products/${product.image}`
            //remove image
            fs.unlink(imagePath, error => {
                if (error) {
                    res.status(500).send(error)
                }
            })
        }
        product.remove()
        res.status(204).end()
    })

})

module.exports = router