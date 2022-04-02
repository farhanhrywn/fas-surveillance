import React, { useEffect } from "react";
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

import AssetTableSpv from "../Components/AssetTableSpv";
import RequestTableSpv from "../Components/RequestTableSpv";
import BackloadTableSpv from "../Components/BackloadTableSpv";
import HeaderSpv from "../Components/HeaderSpv"

const styles = {
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function MainPageSpv () {
  const backloadList = useSelector((state) => state.assetsBackloadSpv)
  const requestList = useSelector((state) => state.filteredReqSpv)
  const locationList = useSelector((state) => state.locations)
  const numOfNotSeenReq = useSelector((state) => state.countNotSeenRequest)

  return (
      <>
      <HeaderSpv className="bg-primary" bgColor="#007bff" notSeenReq={numOfNotSeenReq}/>
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
                <AssetTableSpv />
              </CTabPane>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="profile">
                <RequestTableSpv requestList={requestList} locationList={locationList}/>
              </CTabPane>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="backload">
                <BackloadTableSpv backloadList={backloadList} locationList={locationList} />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </div>

      </>
  )
}