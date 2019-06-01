import React from 'react'
import { Carousel } from 'antd'
import './TopCarousel.css'

const TopCarousel = () => {
  return (
    <div className="top-carousel">
      <Carousel>
        <div>
          <img src="/api/static/images/57aeb9e05842d77bf0fd2e42a6812b11.png" alt="" />
        </div>
        <div>
          <img src="/api/static/images/57aeb9e05842d77bf0fd2e42a6812b11.png" alt="" />
        </div>
        <div>
          <img src="/api/static/images/57aeb9e05842d77bf0fd2e42a6812b11.png" alt="" />
        </div>
        <div>
          <img src="/api/static/images/57aeb9e05842d77bf0fd2e42a6812b11.png" alt="" />
        </div>
      </Carousel>
    </div>
  )
}

export default TopCarousel
