import { CCarousel, CCarouselCaption, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem } from '@coreui/react'
import React, { useState } from 'react'
import Header from '../Components/Header';
import { importImg } from '../helper';

const carouselImg = importImg(require.context('../assets/images', false, /.png/));
const keys = Object.keys(carouselImg);

const diplayCarousel = () => {

  const component = [];

  keys.map((value, i) => {
    component.push( <CCarouselItem key={i}>
      <img className="d-block w-100" src={carouselImg[keys[i]].default} alt="slide 1"/>
    </CCarouselItem>)
  })

  return component
}


const LandingPage = ({first_name, location}) => {

  const [activeIndex, setActiveIndex] = useState(0)


  return (
    <div className='text-center text-color__primary vh-100' style={{ overflow: "hidden" }}>
      <Header className="bg-black position-fixed w-100 backdrop-blur" />


      <div className='d-flex align-items-center flex-column'>

        <CCarousel className='w-100 background__gradient' activeIndex={activeIndex}>
          <CCarouselIndicators/>
          <CCarouselInner>
            {diplayCarousel()}
          </CCarouselInner>
          <CCarouselControl direction="prev"/>
          <CCarouselControl direction="next"/>
        </CCarousel>
          
      </div>
      <div style={{ position: 'absolute', width: '100%', bottom: 50, color: 'white', zIndex: 2 }}>© 2021 Heri Purnomo</div>
      <div className='square__div' style={{  width: 300, height: 300 , transform: 'rotate(32.13deg)', bottom: '150px', right: '200px'}}/>

    </div>
  )
}

export default LandingPage
