import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { 
  CCol,
  CCard,
  CSelect,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CTabs,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CContainer,
  CButton,
  CRow,
  CInputFile,
  CTextarea
} from "@coreui/react";
import Header from "../Components/Header";
import assetType from "../assetType.json";
import { api } from "../config/axios";
import moment from "moment";
import { saveEditAsset, saveHandoverAsset } from "../store";

const styles = {
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function EditHandover () {
  const dispatch = useDispatch()
  const { id } = useParams()
  const router = useHistory()
  const [asset, setAsset] = useState({})

  useEffect(() => {
    const getDetailAsset = (id) => {
      api({
        url: `/Surveillance/detail/${id}`,
        method: 'GET'
      })
      .then(({ data }) => {
        setAsset(data[0])
      })
      .catch((err) => {
        console.log(err)
      })
    }

    getDetailAsset(id)
  },[])

  const changeForm = (event) => {
    if(event.target.name === 'remark_file') {
      setAsset({ ...asset, [event.target.name]: event.target.files[0] })
    } else {
      setAsset({ ...asset, [event.target.name]: event.target.value })
    }
  }

  const submitForm = () => {
    // let formData = new FormData()
    let payload = {
      ...asset,
      maintenance_by: localStorage.getItem('pic_name'),
      location: localStorage.getItem('loc_id'),
      phone: localStorage.getItem('pic_phone')
    }

    // for( const key in payload ) {
    //   formData.append(key, payload[key])
    // }
    dispatch(saveHandoverAsset(payload, localStorage.getItem('loc_id')))

    router.push('/home')
  }


  return (
    <>
      <Header className="bg-primary"/>
        <div className="mx-5">
          <CTabs activeTab="home">
            <CNav variant="tabs" className="mt-5">
              <CNavItem>
                <CNavLink className="custom-nav__item" data-tab="home">
                  <CContainer>
                    <CLabel style={styles.headerTitle}>Edit Handover Item</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="home">
                <CCol xs="12" sm="12">
                  <CCard>
                    <CCardBody>
                      <CFormGroup row>
                        <CLabel col md="2" htmlFor="file-input">Remark File :</CLabel>
                        <CCol xs="12" md="10">
                          <CInputFile type="file" name="remark_file" onChange={changeForm}/>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="textarea-input">Remark <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                        </CCol>
                        <CCol xs="12" md="10">
                          <CTextarea 
                            name="remark" 
                            type="text"
                            rows="9"
                            required
                            placeholder="Please fill your remark or N/A if unavailable"
                            value={asset.remark}
                            onChange={changeForm}
                          />
                        </CCol>
                      </CFormGroup>
                      <CRow>
                        <CCol md="6">
                          <CButton color="danger" size="lg" block onClick={() => router.push('/home')}>Cancel</CButton>
                        </CCol>
                        <CCol md="6">
                          <CButton color="primary" size="lg" block onClick={() => submitForm()}>Submit</CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </div>
        
    </>
  )
}