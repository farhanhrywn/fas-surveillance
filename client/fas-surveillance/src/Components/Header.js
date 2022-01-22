import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { CCollapse, CNavbar, CNavbarBrand, CNavbarNav, CNavLink, CToggler } from '@coreui/react'

const styles = {
  headerLeft: {
    color: '#FFFFFF',
    fontSize: 23,
    letterSpacing: '0.26em', 
    fontWeight: 800,
    height: 62,
    display: 'flex',
    alignItems: "center"
  },
  headerRight: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 400,
  }
}


export default function Header ({ className }) {
  const router = useHistory()
  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
      <>
        {/* <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4F8FCC'}}>    
          <div className="collapse navbar-collapse">
            <p className="text-uppercase" style={styles.headerLeft}>Surveillance</p>
          </div>
          <span className="navbar-text mr-3" style={styles.headerRight}>
            {localStorage.getItem('pic_name')}, {localStorage.getItem('loc_name')}
          </span>
          <button className="btn btn-danger my-2 my-sm-0" onClick={logout}>Logout</button>
        </nav> */}
        <CNavbar className={`navbar navbar-expand-lg ${className}`} style={{ zIndex: 2 }}  expandable="sm">
          <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
          <CNavbarBrand className="text-uppercase" style={styles.headerLeft}>
            Surveillance
          </CNavbarBrand>
          <CCollapse show={isOpen} navbar>
            <CNavbarNav className="ml-auto">
              <CNavLink>Home</CNavLink>
              <CNavLink>Link</CNavLink>
            </CNavbarNav>
          </CCollapse>
        </CNavbar>
      </>
  )
}