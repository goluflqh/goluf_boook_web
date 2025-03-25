import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import logo from '../assets/logo.png'


const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-padd-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" height={36} width={36} />
              <h4 className="bold-22">Goluf</h4>
            </div>
            <p className="text-gray-600">Your trusted online bookstore offering a vast collection of books across all genres.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="medium-18">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900 ">Home</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="medium-18">Contact Info</h5>
            <ul className="space-y-2 text-gray-600">
              <li>123 Book Street</li>
              <li>Reading City, RC 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@goluf.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h5 className="medium-18">Follow Us</h5>
            <div className="flex gap-4">
              <FaFacebook className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer" />
              <FaTwitter className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer" />
              <FaInstagram className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Goluf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
