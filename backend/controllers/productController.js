import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'



//Controller function to create product
const createProduct = async (req, res) => {
   try {
      const { name, description, category, price, popular } = req.body

      let imageUrl = "https://via.placeholder.com/150" // Default image URL

      //Only upload the image if one is provided
      if (req.file) {
         console.log("Uploaded File:", req.file)
         imageUrl = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" }).then(res => res.secure_url)
      }

      const productData = {
         name,
         description,
         category,
         price: Number(price),
         popular: popular === "true" ? true : false,
         image: imageUrl,
         date: Date.now()
      }
      console.log("Product Data:", productData)

      const product = new productModel(productData)
      await product.save()

      res.json({ success: true, message: "Product Created" })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}
//Controller function to delete product
const deleteProduct = async (req, res) => {
   try {
      await productModel.findByIdAndDelete(req.body.id)
      res.json({ success: true, message: "Product Deleted" })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}
//Controller function to list all products
const getAllProduct = async (req, res) => {
   try {
      const products = await productModel.find({})
      res.json({ success: true, products })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}
//Controller function to fetch a single  products details
const getProductById = async (req, res) => {
   try {
      const { productId } = req.body
      const product = await productModel.findById(productId)
      res.json({ success: true, product })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}
//Controller function to edit product
const editProduct = async (req, res) => {
   try {
      const { id, name, description, category, price, popular } = req.body
      
      let updateData = {
         name,
         description,
         category,
         price: Number(price),
         popular: popular === "true" ? true : false,
      }

      // Only update image if new one is provided
      if (req.file) {
         const imageUrl = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" })
         updateData.image = imageUrl.secure_url
      }

      const updatedProduct = await productModel.findByIdAndUpdate(
         id,
         updateData,
         { new: true }
      )

      res.json({ success: true, message: "Product Updated", product: updatedProduct })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

export { createProduct, deleteProduct, getAllProduct, getProductById, editProduct }
