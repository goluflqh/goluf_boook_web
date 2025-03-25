import React, { useEffect, useState } from "react";
import { backend_url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { FaEdit, FaTrash as FaTrashIcon } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const List = ({token}) => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const fetchlist = async () => {
    try {
      const response =await axios.get(backend_url+'/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)}
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const removeProduct = async (id) => {
    try {
      const response =await axios.post(backend_url +'/api/product/delete', {id}, {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchlist()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
  fetchlist()
 }, [])

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">Products List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-center">Popular</th>
              <th className="px-4 py-3 text-center">Edit</th>
              <th className="px-4 py-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  {product.popular ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
