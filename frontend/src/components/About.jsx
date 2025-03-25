import React from 'react'
import Title from './Title'
import { TbTruckReturn } from 'react-icons/tb'
import about from '../assets/book_1.png'

const About = () => {
  return (
    <section className='max-padd-container py-16 xl:py-24'>
      {/* container */}
      <div className='grid lg:grid-cols-2 gap-10'>
        {/*left side*/}
        <div className='space-y-8'>
          <Title 
            title1={"Unveiling Our"} 
            title2={"Store's key features!"} 
            titleStyle={'pb-10'} 
            paraStyle={'!block'} 
          />

          <div className='flexCenter gap-x-6'>
            <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
              <TbTruckReturn className='text-2xl' />
            </div>
            <div>
              <h4 className='medium-18 mb-2'>Easy Returns Process</h4>
              <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat possimus consectetur fuga quis delectus?</p>
            </div>
          </div>

          <div className='flexCenter gap-x-6'>
            <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
              <TbTruckReturn className='text-2xl' />
            </div>
            <div>
              <h4 className='medium-18 mb-2'>Secure Payment Options</h4>
              <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat possimus consectetur fuga quis delectus?</p>
            </div>
          </div>

          <div className='flexCenter gap-x-6'>
            <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
              <TbTruckReturn className='text-2xl' />
            </div>
            <div>
              <h4 className='medium-18 mb-2'>Live Customer Support</h4>
              <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat possimus consectetur fuga quis delectus?</p>
            </div>
          </div>
        </div>

        {/*right side*/}
        <div className='flexCenter'>
          <div className='relative bg-secondaryOne p-8 rounded-2xl'>
            <img 
              src={about} 
              alt="aboutImg" 
              height={300} 
              width={300} 
              className='shadow-2xl rounded-2xl z-10 relative'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About