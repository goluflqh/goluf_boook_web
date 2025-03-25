import React from 'react'

const Title = ({title1, title2, titleStyle, title1Style, paraStyle}) => {
  return (
    <div className={`${titleStyle} pb-1`}>
      <h2 className={`${title1Style} h2`} >{title1}
         <span className='text-secondary !font-light'> {title2}</span>
      </h2>
      <p className={`${paraStyle} hidden`}>From timeless classics to modern masterpieces, find the <br/>
      perfect read for every moment </p>
    </div>
  )
}

export default Title