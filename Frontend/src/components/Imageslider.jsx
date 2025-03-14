import React, { useState } from 'react'

const imageSlider = [
  'https://switch.com.ph/cdn/shop/articles/NPI-iPhone-16-Pro-Coming-Soon-Blog-Banners.jpg?v=1727423801',
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400/f3832e180145769.6505ae76214ca.jpg',
  'https://soundmachine.com.mt/wp-content/uploads/2024/05/SM_S24_PageBanner_APR2024.jpg'
] 
const Imageslider = () => {

  const [ imageIndex, setImageIndex ] = useState(0);

  const PrevImage = () => {
    setImageIndex((index) => {
      if(index === 0) return imageSlider.length - 1
      return index - 1
    })
  }

  const NextImage = () => {
    setImageIndex((index) => {
      if(index === imageSlider.length - 1) return 0
      return index + 1
    })

  }
    // setInterval(() => {
    //   setImageIndex((prev) => {
    //     if(prev === imageSlider.length - 1) return 0
    //     return prev + 1
    //   })
    // }, 5000);
  return (
    <div className = 'image-slider-container' style={{ 
      width: '100%', 
      display: 'flex', 
      overflow: 'hidden', 
      position: 'relative'
      }}>
      { imageSlider.map( (item, index) => (        
        <img key = {index} className = 'image-slider' src={item} alt="" width ="100%" height= '100%' style={{ objectFit: 'cover', translate : `${-100 * imageIndex}%` }} />
      ))}
        <button onClick = {PrevImage} className = 'img-slider-btn' style = {{left : '0'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <button onClick = {NextImage} className = 'img-slider-btn' style = {{right : '0'}}>            
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>        
    </div>
  )
}

export default Imageslider