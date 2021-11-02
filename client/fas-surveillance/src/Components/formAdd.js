import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CForm,
  CInvalidFeedback,
  CValidFeedback
} from '@coreui/react'
import assetType from '../assetType.json'


export default function FormAdd ({ onSubmit, onCancel }) {
  const router = useHistory()
  const [form, setForm] = useState({})
  const [item, setItem] = useState('')

  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    // setItem(event.target.value)
  }

  const isFormValid = () => {
    if((form.item === undefined || form.item === '') || (form.pn === undefined || form.pn === '') || (form.sn === undefined || form.sn === '') || (form.qty === undefined || form.qty === '') || (form.condition === undefined || form.condition === '')) {
      return true
    }
    return false
  }

  useEffect(() => {
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
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Part Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="pn" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Serial Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="sn" onChange={changeForm} />
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Quantity <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="qty" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Category</CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="category" onChange={changeForm}>
                <option value="">Please Select..</option>
                <option value="Lifting Equipment">Lifting Equipmnent</option>
                <option value="Installation Kit">Installation Kit</option>
                <option value="Splicing Kit">Splicing Kit</option>
                <option value="Electrical">Electrical</option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Type</CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="jenis" onChange={changeForm}>
                <option value="">Please Select..</option>
                {
                  assetType.map(type => (
                    <option value={type.value}>{type.label}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Condition <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="condition" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Certification Date</CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="date" name="cert_date" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Phone</CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="phone" onChange={changeForm} />
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: 'center'}}>
        <Button disabled={isFormValid()} className="mr-3" variant="primary" size="lg" onClick={() => onSubmit(form)}>Add Item</Button>
        <Button variant="danger" size="lg" onClick={onCancel}>Cancel</Button>
      </CRow>
    </>
  )
}