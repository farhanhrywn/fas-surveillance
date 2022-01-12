import React from 'react'
import images from '../assets/images/landing_page.svg'

const LandingPage = ({first_name, location}) => {
  return (
    <div className='text-center vh-100'>
      <div className='d-flex align-items-center flex-column'>
          <h2 style={{ letterSpacing: '0.26em', marginBottom: 42, paddingTop: 25}}>SURVEILENCE</h2>
          <h3>Welcome {first_name},</h3>
          <h5>@ {location}</h5>

          <img src={images} alt='landing_page' style={{ marginBottom: 54, marginTop: 25 }} />

          <p style={{ fontSize: 30 }}>
            Welcome to fas-slb app.
            <span className='d-block'>
              Let’s update your job here !
            </span>
          </p>

      </div>
    </div>
  )
}

export default LandingPage
