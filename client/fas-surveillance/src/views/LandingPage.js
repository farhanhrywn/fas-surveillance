import { CCarousel, CCarouselCaption, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../Components/Header';
import { importImg } from '../helper';

const carouselImg = importImg(require.context('../assets/images/carousell', false, /.png/));
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

const  useInterval = (callback, delay) => {
  const savedCallback = useRef();


  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const LandingPage = ({first_name, location}) => {

  let [activeIndex, setActiveIndex] = useState(0);

  const autoPlay = () => {
    if(activeIndex === keys.length-1) {
      setActiveIndex(0)
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }

  useInterval(() => {
    autoPlay()
  }, 5000);


  return (
    <div className='text-center text-color__primary vh-100' style={{ overflow: "hidden" }}>
      <Header className="bg-black position-fixed w-100 backdrop-blur" />


      <div className='d-flex align-items-center flex-column'>

        <CCarousel animate={true} className='w-100 background__gradient' activeIndex={activeIndex}>
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
