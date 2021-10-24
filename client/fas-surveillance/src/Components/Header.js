import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  headerLeft: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 800
  },
  headerRight: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function Header () {
    return (
        <>
          <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4F8FCC'}}>    
            <div className="collapse navbar-collapse">
              <p className="text-uppercase" style={styles.headerLeft}>Surveillance</p>
            </div>
            <span className="navbar-text" style={styles.headerRight}>
              Cipinang, Farhan
            </span>
          </nav>
        </>
    )
}