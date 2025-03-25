import React from 'react'
import filter from '../assets/features/filter.png'
import rating from '../assets/features/rating.png'
import wishlist from '../assets/features/wishlist.png'
import secure from '../assets/features/secure.png'

const Features = () => {
  return (
    <section className='max-padd-container py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div className='flexCenter flex-col gap-3'>
          <img src={filter} alt="featureIcon" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Advanced Search and Filters</h5>
            <hr className='w-8 h-1 bg-secondary rounded-full border-none'/>
          </div>
          <p className='text-sm text-gray-500 text-center'>Effortlessly search books by title, author, genre, or price range.</p>
        </div>

        <div className='flexCenter flex-col gap-3'>
          <img src={rating} alt="featureIcon" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>User Reviews and Ratings</h5>
            <hr className='w-8 h-1 bg-secondary rounded-full border-none'/>
          </div>
          <p className='text-sm text-gray-500 text-center'>Customers can share reviews, rate books, and guide future readers.</p>
        </div>

        <div className='flexCenter flex-col gap-3'>
          <img src={wishlist} alt="featureIcon" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Wishlist and Favorite</h5>
            <hr className='w-8 h-1 bg-secondary rounded-full border-none'/>
          </div>
          <p className='text-sm text-gray-500 text-center'>Save books to wishlist for future purchases or easy access.</p>
        </div>

        <div className='flexCenter flex-col gap-3'>
          <img src={secure} alt="featureIcon" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Secure Checkout</h5>
            <hr className='w-8 h-1 bg-secondary rounded-full border-none'/>
          </div>
          <p className='text-sm text-gray-500 text-center'>Shop with confidence using our secure payment system.</p>
        </div>
      </div>
    </section>
  )
}

export default Features