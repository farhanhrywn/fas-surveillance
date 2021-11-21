import React from "react";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CContainer,
  CLabel
} from '@coreui/react'
import AssetTable from "../Components/AssetTable";
import Header from "../Components/Header"

const styles = {
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function MainPage () {
    return (
        <>
        <Header />
          <CContainer>
            <CTabs activeTab="home">
              <CNav variant="tabs" className="mt-5">
                <CNavItem>
                  <CNavLink data-tab="home">
                    <CContainer>
                      <CLabel style={styles.headerTitle}>Asset Surveillance</CLabel>
                    </CContainer>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="profile">
                    <CContainer>
                      <CLabel style={styles.headerTitle}>Request Tools</CLabel>
                    </CContainer>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="home">
                  <AssetTable />
                </CTabPane>
                <CTabPane data-tab="profile">
                  456
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CContainer>

        </>
    )
}