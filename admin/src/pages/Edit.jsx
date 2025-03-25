import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { backend_url } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const Edit = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    popular: false,
    image: null
  })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${backend_url}/api/product/single`,
          { productId: id },
          { headers: { token } }
        )
        
        if (response.data.success) {
          const product = response.data.product
          setFormData({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            popular: product.popular
          })
          setPreview(product.image)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch product details')
      }
    }

    fetchProduct()
  }, [id, token])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              type === 'number' ? Number(value) : value
    }))

    if (type === 'file' && files[0]) {
      setPreview(URL.createObjectURL(files[0]))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = new FormData()
      form.append('id', id)
      form.append('name', formData.name)
      form.append('description', formData.description)
      form.append('category', formData.category)
      form.append('price', formData.price)
      form.append('popular', formData.popular)
      if (formData.image) {
        form.append('image', formData.image)
      }

      const response = await axios.post(
        `${backend_url}/api/product/edit`,
        form,
        {
          headers: { 
            token,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/list')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="popular"
            checked={formData.popular}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Popular</label>
        </div>
        <div>
          <label className="block mb-1">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 h-32 object-contain"/>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  )
}

export default Edit 