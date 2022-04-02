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
import RequestTable from "../Components/RequestTable";
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
  const requestList = useSelector((state) => state.assetsRequest)

  return (
      <>
      <Header className="bg-primary" />
        <div className="mx-5">
          <CTabs activeTab="home">
            <CNav variant="tabs" className="mt-5">
              <CNavItem>
                <CNavLink className="custom-nav__item" data-tab="home">
                  <CContainer>
                    <CLabel style={styles.headerTitle}>Asset Surveillance</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className="custom-nav__item" data-tab="profile">
                  <CContainer>
                    <CLabel style={styles.headerTitle}>Items Request</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className="custom-nav__item" data-tab="backload">
                  <CContainer>
                    <CLabel style={styles.headerTitle}>Items Backload</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="home">
                <AssetTable />
              </CTabPane>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="profile">
                <RequestTable requestList={requestList}/>
              </CTabPane>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="backload">
                <BackloadTable backloadList={backloadList} />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </div>

      </>
  )
}