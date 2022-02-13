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
  CFormText,
  CInputCheckbox
} from "@coreui/react";
import Header from "../Components/Header";
import assetType from "../assetType.json";
import assetStatus from "../assetStatus.json";
import { api } from "../config/axios";
import moment from "moment";
import { saveEditAsset } from "../store";
import { RemarkHistoryTable } from "../Components/RemarkHistoryTable";

const styles = {
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function EditItem () {
  const dispatch = useDispatch()
  const { id } = useParams()
  const router = useHistory()
  const [assetsType, setAssetsType] = useState([])
  const [type, setType] = useState('')
  const [asset, setAsset] = useState({})
  const [isEdit, setIsEdit] = useState(true)
  const [remarkHistory, setRemarkHistory] = useState([])

  useEffect(() => {
    const getDetailAsset = (assetId) => {
      api({
        url: `/Surveillance/detail/${assetId}`,
        method: 'GET'
      })
      .then(({ data }) => {
        setAsset(data[0])
        getAssetType(data[0].type)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const getRemarkHistory = (assetId) =>{
      api({
        url: `/RemarkHistory/${assetId}/0`,
        method: 'GET'
      })
      .then(({ data }) => {
        let payload = data.map(history => (
          {
            ...history,
            key: history.id
          }
        ))
        setRemarkHistory(payload)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    getRemarkHistory(id)
    getDetailAsset(id)
  },[id])

  const changeForm = (event) => {
    setAsset({ ...asset, [event.target.name]: event.target.value })
  }

  const filterType = (event) => {
    setAssetsType(assetType.filter(asset => asset.type === event.target.value))
  }

  const getAssetType = (value) => {
    let result = assetType.find(el => el.value === value)
    setType(result.type)
    setAssetsType(assetType.filter(asset => asset.type === result.type))
  }

  const submitForm = () => {
    let payload = {
      ...asset,
      maintenance_by: localStorage.getItem('pic_name'),
      location: localStorage.getItem('loc_id'),
      phone: localStorage.getItem('pic_phone')
    }

    dispatch(saveEditAsset(payload, router))
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
                    <CLabel style={styles.headerTitle}>Detail Item</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className="custom-nav__item" data-tab="history">
                  <CContainer>
                    <CLabel style={styles.headerTitle}>Remark History</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="home">
                <CContainer style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                  <CInputCheckbox onChange={() => setIsEdit(!isEdit)}/>
                  <CLabel className="form-check-label">Please check the box if you want to edit this item</CLabel>
                </CContainer>
                <CCol xs="12" sm="12">
                  <CCard>
                    <CCardBody>
                      <CFormGroup>
                        <CLabel htmlFor="input-name">Name <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                        <CInput type="text" name="item" disabled={isEdit} required onChange={changeForm} value={asset.item}/>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email" >Part Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="text" name="pn" onChange={changeForm} value={asset.pn} disabled={isEdit}/>
                          <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Fill n/a if Part Number unavailable</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Serial Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="text" name="sn" onChange={changeForm} value={asset.sn} disabled={isEdit}/>
                          <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Fill n/a if Serial Number unavailable</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Sub Location <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CSelect type="text" name="sub_location" onChange={changeForm} value={asset.sub_location} disabled={isEdit}>
                            <option value="">Please Select..</option>
                            <option value="Well site">Well site</option>
                            <option value="Yard">Yard</option>
                          </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Plan <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CSelect type="text" name="plan" onChange={changeForm} value={asset.plan} disabled={isEdit}>
                            <option value="">Please Select..</option>
                            <option value="Backload">Backload</option>
                            <option value="Keep in Store">Keep in Store</option>
                            <option value="Repair">Repair</option>
                          </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Steelbox <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="text" name="steelbox" onChange={changeForm} value={asset.steelbox} disabled={isEdit}/>
                          <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Fill n/a if Steelbox unavailable</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Status <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CSelect type="text" name="status" onChange={changeForm} value={asset.status} disabled={isEdit}>
                            <option value="">Please Select..</option>
                            {
                              assetStatus.map(type => (
                                <option value={type.value} key={type.value}>{type.label}</option>
                              ))
                            }
                          </CSelect>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel>Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                            <CSelect type="text" name="type" onChange={filterType} value={type} disabled={isEdit}>
                              <option value="">Please Select..</option>
                              <option value="Tools">Tools</option>
                              <option value="ESP Equipment">ESP Equipment</option>
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                              <CLabel>Sub Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                              <CSelect type="text" name="type" onChange={changeForm} value={asset.type} disabled={isEdit}>
                                <option value="">Please Select..</option>
                                {
                                  assetsType.map(type => (
                                    <option value={type.value} key={type.value}>{type.label}</option>
                                  ))
                                }
                              </CSelect>
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Quantity <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="number" name="qty" onChange={changeForm} value={asset.qty} disabled={isEdit}/>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="hf-email">Condition <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                        <CSelect type="text" name="condition" onChange={changeForm} value={asset.condition} disabled={isEdit}>
                          <option value="">Please Select..</option>
                          <option value="Good">Good</option>
                          <option value="Bad">Bad</option>
                        </CSelect>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="hf-email">Certification Date</CLabel>
                            <CInput type="date" name="cert_date" onChange={changeForm} value={moment(asset.cert_date).format('YYYY-MM-DD')} disabled={isEdit}/>
                            <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Skip this step if cert date is unavailable</CFormText>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup >
                              <CLabel htmlFor="hf-email">Arrival Date <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                              <CInput type="date" name="tools_date_in" onChange={changeForm} value={moment(asset.tools_date_in).format('YYYY-MM-DD')} disabled={isEdit} />
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                      <CRow>
                        <CCol md="6">
                          <CButton color="danger" size="lg" block onClick={() => router.push('/home')}>Cancel</CButton>
                        </CCol>
                        <CCol md="6">
                          <CButton color="primary" size="lg" block onClick={() => submitForm()} disabled={isEdit}>Submit</CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CTabPane>

              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="history">
                <RemarkHistoryTable data={ remarkHistory }/>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </div>
        
    </>
  )
}