import React, { useState } from 'react'
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


export default function HeaderSpv ({ className }) {
  const router = useHistory()
  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
      <>
        <CNavbar className={`navbar navbar-expand-lg ${className}`} style={{ zIndex: 2 }}  expandable="sm">
          <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
          <CNavbarBrand className="text-uppercase" style={styles.headerLeft}>
            Surveillance
          </CNavbarBrand>
          <CNavbarNav className="ml-auto">
            <CNavLink to={'/landing/spv'}>Home</CNavLink>
            <CNavLink to={'/home/spv'}>Asset</CNavLink>
          </CNavbarNav>
          <CCollapse show={isOpen} navbar>
            <CNavbarNav className="ml-auto">
              <span className="navbar-text mr-3 text-uppercase">
                {localStorage.getItem('category')}
              </span>
              <button className="btn btn-danger my-2 my-sm-0" onClick={logout}>Logout</button>
            </CNavbarNav>
          </CCollapse>
        </CNavbar>
      </>
  )
}