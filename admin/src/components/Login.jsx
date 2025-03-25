import React, { useState } from 'react'
import login from "../assets/login.png"
import { backend_url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(backend_url + '/api/user/admin', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <section className='min-h-screen flex items-stretch'>
      {/* Left side - Form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-14 bg-white'>
        <div className='max-w-[450px] w-full mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
            <p className='text-gray-600'>Please sign in to access admin panel</p>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-6'>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-700 block mb-2'>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none'
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-700 block mb-2'>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none'
                placeholder='Enter your password'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-md hover:shadow-lg'
            >
              Sign In
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Admin Panel Access Only
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className='hidden md:block md:w-1/2 bg-gray-200'>
        <img
          src={login}
          alt="Login"
          className='object-cover w-full h-full'
          style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>
    </section>
  )
}

export default Login
