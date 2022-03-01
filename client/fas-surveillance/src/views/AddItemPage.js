import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
  CFormText
} from "@coreui/react";
import { AutoComplete } from "antd";
import Header from "../Components/Header";
import assetType from "../assetType.json";
import { api } from "../config/axios";
import Swal from "sweetalert2";

const { Option } = AutoComplete
const styles = {
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400
  }
}

export default function AddItem () {
  const router = useHistory()
  const [assetsType, setAssetsType] = useState([])
  const [certDate, setCertDate] = useState('')
  const [waiting, setWaiting] = useState(null)
  const [suggestionList, setSuggestionList] = useState([])
  const [form, setForm] = useState({
    item: '',
    sn: '',
    pn: '',
    plan: '',
    qty: '',
    steelbox: '',
    status: '',
    type: '',
    condition: '',
    tools_date_in: '',
    sub_location: ''
  })

  useEffect(() => {
    setAssetsType(assetType)
  },[])

  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const filterType = (event) => {
    setAssetsType(assetType.filter(asset => asset.type === event.target.value))
  }

  const changeCertDate = (event) => {
    setCertDate(event.target.value)
  }

  const isFormValid = () => {
    let arrValueForm = Object.values(form)
    let isValueEmpty = arrValueForm.some(val => val === '' || val === undefined)
    if(isValueEmpty) {
      return true
    }
    return false
  }

  const submitForm = async () => {
    let payload = {
      ...form,
      cert_date: certDate,
      maintenance_by: localStorage.getItem('pic_name'),
      location: localStorage.getItem('loc_id'),
      phone: localStorage.getItem('pic_phone')
    }

    await api({
      url: '/Surveillance/create',
      method: 'POST',
      data: payload
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses menambahkan asset',
        timer: 2000,
        showConfirmButton: false
      })
      router.push('/home')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleSearch = (value) => {
    if(waiting !== null) {
      clearTimeout(waiting)
    }
    if( value === "" ) {
      clearTimeout(waiting)
      setSuggestionList([])
      return
    }
    setWaiting(
      setTimeout(() => getAssetSuggestion(value), 1000)
    )
  }

  const getAssetSuggestion = async (value) => {
    await api({
      url:`/SourceItem/${value}`,
      method: 'GET'
    })
    .then(({ data }) => {
      setSuggestionList(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleSelect = (value) => {
    let selectedItem = suggestionList.filter(suggestion => suggestion.item === value)
    
    setForm({ ...form, pn: selectedItem[0].pn, item: selectedItem[0].item })
  }
  
  const handleChange = (value) => {
    setForm({ ...form, item: value })
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
                    <CLabel style={styles.headerTitle}>Add Item</CLabel>
                  </CContainer>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane className={`p-5 border border-top-0 custom-border__radius`} data-tab="home">
                <CCol xs="12" sm="12">
                  <CCard>
                    <CCardBody>
                      <CFormGroup>
                        <CLabel htmlFor="input-name">Name <span style={{ color: '#FF0B0B' }}>*</span></CLabel> <br/>
                        <AutoComplete
                          style={{ width: '100%' }}
                          onSearch={handleSearch}
                          notFoundContent="Not Found"
                          onSelect={handleSelect}
                          onChange={handleChange}
                        >
                          {
                            suggestionList.length !== 0 && suggestionList.map((suggestion) => (
                              <Option key={suggestion.id} value={suggestion.item}>
                                { suggestion.item }
                              </Option>
                            ))
                          }

                        </AutoComplete>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email" >Part Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="text" name="pn" onChange={changeForm} value={form.pn}/>
                          <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Fill n/a if Part Number unavailable</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Serial Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="text" name="sn" onChange={changeForm} />
                          <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Fill n/a if Serial Number unavailable</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Sub Location <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CSelect type="text" name="sub_location" onChange={changeForm}>
                            <option value="">Please Select..</option>
                            <option value="Well site">Well site</option>
                            <option value="Yard">Yard</option>
                          </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Plan <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CSelect type="text" name="plan" onChange={changeForm}>
                            <option value="">Please Select..</option>
                            <option value="Keep in Store">Keep in Store</option>
                            <option value="Repair">Repair</option>
                          </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Steelbox <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CInput type="text" name="steelbox" onChange={changeForm} />
                          <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Fill n/a if Steelbox unavailable</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <CLabel htmlFor="hf-email">Status <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                          <CSelect type="text" name="status" onChange={changeForm}>
                            <option value="">Please Select..</option>
                            <option value="New">New</option>
                            <option value="Used Item">Used item</option>
                          </CSelect>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel>Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                            <CSelect type="text" name="type" onChange={filterType}>
                              <option value="">Please Select..</option>
                              <option value="Tools">Tools</option>
                              <option value="ESP Equipment">ESP Equipment</option>
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                              <CLabel>Sub Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                              <CSelect type="text" name="type" onChange={changeForm}>
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
                          <CInput type="number" name="qty" onChange={changeForm} />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="hf-email">Condition <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                        <CSelect type="text" name="condition" onChange={changeForm}>
                          <option value="">Please Select..</option>
                          <option value="Good">Good</option>
                          <option value="Bad">Bad</option>
                        </CSelect>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="hf-email">Certification Date</CLabel>
                            <CInput type="date" name="cert_date" onChange={changeCertDate} />
                            <CFormText style={{ marginBottom: '1rem', fontSize: 11 }}>Skip this step if cert date is unavailable</CFormText>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup >
                              <CLabel htmlFor="hf-email">Arrival Date <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
                              <CInput type="date" name="tools_date_in" onChange={changeForm} />
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                      <CRow>
                        <CCol md="6">
                          <CButton color="danger" size="lg" block onClick={() => router.push('/home')}>Cancel</CButton>
                        </CCol>
                        <CCol md="6">
                          <CButton color="primary" size="lg" block onClick={() => submitForm()} disabled={isFormValid()}>Submit</CButton>
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