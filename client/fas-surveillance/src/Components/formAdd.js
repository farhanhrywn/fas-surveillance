import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import DateTimePicker from 'react-datetime-picker'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CForm,
  CInvalidFeedback,
  CValidFeedback,
  CFormText
} from '@coreui/react'
import assetType from '../assetType.json'


export default function FormAdd ({ onSubmit, onCancel }) {
  const [assets, setAssets] = useState([])
  const [certDate, setCertDate] = useState('') 
  const router = useHistory()
  const [form, setForm] = useState({
    item: '',
    sn: '',
    pn: '',
    plan: '',
    qty: '',
    steelbox: '',
    sheet: '',
    type: '',
    condition: '',
    tools_date_in: ''
  })

  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    // setItem(event.target.value)
  }

  const isFormValid = () => {
    // if((form.item === undefined || form.item === '') || (form.pn === undefined || form.pn === '') || (form.sn === undefined || form.sn === '') || (form.qty === undefined || form.qty === '') || (form.condition === undefined || form.condition === '')) {
    //   return true
    // }
    // return false
    let arrValueForm = Object.values(form)
    let isValueEmpty = arrValueForm.some(val => val === '' || val === undefined)
    if(isValueEmpty) {
      return true
    }
    return false
  }

  const filterType = (event) => {
    setAssets(assetType.filter(asset => asset.type === event.target.value))
  }

  const changeCertDate = (event) => {
    setCertDate(event.target.value)
  }

  const saveForm = () => {
    let payload = {...form, cert_date: certDate}
    onSubmit(payload)
  }

  useEffect(() => {
    setAssets(assetType)
    isFormValid()
  },[form])


  return (
    <>
      <CRow>
        <CCol md="4">
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="input-name">Name <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="item" required onChange={changeForm}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row style={{ marginBottom: 0 }}>
            <CCol md="5">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Part Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
              <CFormText style={{ marginBottom: '1rem', fontSize: 10 }}>Fill n/a if Part Number unavailable</CFormText>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="pn" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row style={{ marginBottom: 0 }}>
            <CCol md="5">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Serial Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
              <CFormText style={{ marginBottom: '1rem', fontSize: 10 }}>Fill n/a if Part Number unavailable</CFormText>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="sn" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Plan <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="plan" onChange={changeForm}>
              <option value="">Please Select..</option>
              <option value="Backload">Backload</option>
              <option value="Keep in Store">Keep in Store</option>
              <option value="Repair">Repair</option>
            </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup row style={{ marginBottom: 0 }}>
            <CCol md="5">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Steelbox <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
              <CFormText style={{ marginBottom: '1rem', fontSize: 10 }}>Fill n/a if Part Number unavailable</CFormText>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="steelbox" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Category <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="sheet" onChange={changeForm}>
                <option value="">Please Select..</option>
                <option value="Mechanical Lift Cert Eqp">Mechanical Lift Cert Equipment</option>
                <option value="Electrical Cert Eqp">Electrical Cert Equipment</option>
                <option value="Pressure Related Eqp">Pressure Related Equipment</option>
                <option value="Sensor Rih Eqp">Sensor Rih Equipment</option>
                <option value="Installation Tool">Installation Tool</option>
                <option value="Splicing Tools">Splicing Tool</option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="type" onChange={filterType}>
                <option value="">Please Select..</option>
                <option value="Tools">Tools</option>
                <option value="ESP Equipment">ESP Equipment</option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Sub Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="type" onChange={changeForm}>
                <option value="">Please Select..</option>
                {
                  assets.map(type => (
                    <option value={type.value}>{type.label}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Quantity <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CInput type="text" name="qty" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Condition <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
            <CSelect type="text" name="condition" onChange={changeForm}>
              <option value="">Please Select..</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Certification Date</CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CInput type="date" name="cert_date" onChange={changeCertDate} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Arrival Date <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CInput type="date" name="tools_date_in" onChange={changeForm} />
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: 'center'}}>
        <Button disabled={isFormValid()} className="mr-3" variant="primary" size="lg" onClick={() => saveForm()}>Add Item</Button>
        <Button variant="danger" size="lg" onClick={onCancel}>Cancel</Button>
      </CRow>
    </>
  )
}