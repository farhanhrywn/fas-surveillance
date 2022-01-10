import React from "react";
import { useSelector } from "react-redux";

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
import BackloadTable from "../Components/BackloadTable";
import Header from "../Components/Header"

const styles = {
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function MainPage () {
  const backloadList = useSelector((state) => state.assetsBackload)

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
              <CNavItem>
                <CNavLink data-tab="backload">
                  <CContainer>
                    <CLabel style={styles.headerTitle}>Backload Items</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="home">
                <AssetTable />
              </CTabPane>
              <CTabPane data-tab="profile">
                Coming Soon
              </CTabPane>
              <CTabPane data-tab="backload">
                <BackloadTable backloadList={backloadList} />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CContainer>

      </>
  )
}