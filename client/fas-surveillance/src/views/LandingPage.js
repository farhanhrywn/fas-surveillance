import React from 'react'
import images from '../assets/images/landing_page.svg'

const LandingPage = ({first_name, location}) => {
  return (
    <div className='text-center text-color__primary vh-100' style={{ overflow: "hidden" }}>
      <div className='square__div' style={{  width: 410, height: 410 , transform: 'rotate(32.13deg)', left: '-105px'}}/>
      <div className='square__div' style={{  width: 150, height: 150 , transform: 'rotate(32.13deg)', top: '-20px', right: '55px'}}/>

      <div className='d-flex align-items-center flex-column'>

        <h2 style={{ letterSpacing: '0.26em', marginTop: 30, marginBottom: 30, fontWeight: 800}}>SURVEILENCE</h2>
        <h3>Welcome {first_name},</h3>
        <h5>@ {location}</h5>

        <img src={images} alt='landing_page' style={{ marginBottom: 50, marginTop: 50 }} />

        <p className='text-font__offside' style={{ fontSize: 30, color: 'rgba(2, 2, 2, 0.6)' }}>
          Welcome to fas-slb app.
          <span className='d-block'>
            Let’s update your job here !
          </span>
        </p>
          
      </div>
      <div style={{ position: 'absolute', width: '100%', bottom: 50}}>© 2021 Heri Purnomo</div>
      <div className='square__div' style={{  width: 300, height: 300 , transform: 'rotate(32.13deg)', bottom: '150px', right: '200px'}}/>

    </div>
  )
}

export default LandingPage
