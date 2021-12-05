import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const styles = {
  headerLeft: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 800,
  },
  headerRight: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}


export default function Header () {
  const router = useHistory()
  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
      <>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4F8FCC'}}>    
          <div className="collapse navbar-collapse">
            <p className="text-uppercase" style={styles.headerLeft}>Surveillance</p>
          </div>
          <span className="navbar-text mr-3" style={styles.headerRight}>
            {localStorage.getItem('pic_name')}, {localStorage.getItem('loc_name')}
          </span>
          <button class="btn btn-danger my-2 my-sm-0" onClick={logout}>Logout</button>
        </nav>
      </>
  )
}