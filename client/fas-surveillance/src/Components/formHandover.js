import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CInputFile,
  CSelect,
  CForm,
  CInvalidFeedback,
  CValidFeedback
} from '@coreui/react'
import assetType from '../assetType.json'


export default function FormHandover ({ onSubmit, onCancel }) {
  const router = useHistory()
  const [form, setForm] = useState({
    remark: '',
    remark_file: {}
  })

  const changeForm = (event) => {
    if(event.target.name === 'remark_file') {
      setForm({ ...form, [event.target.name]: event.target.files[0] })
    } else {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
    // setItem(event.target.value)
    // setForm({ ...form, [event.target.name]: event.target.files[0] })
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

  useEffect(() => {
    isFormValid()
  },[form])


  return (
    <>
      <CRow>
        <CCol md="12">
          <CFormGroup row>
            <CCol md="2">
              <CLabel htmlFor="input-name">Remark <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="10" style={{ paddingRight: 50 }}>
              <CTextarea rows={10} type="text" name="remark" required onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="2">
              <CLabel htmlFor="hf-email">Attach File <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="10">
              <CInputFile type="file" name="remark_file" onChange={changeForm} />
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: 'center'}}>
        <Button className="mr-3" variant="primary" size="lg" onClick={() => onSubmit(form)}>Add Item</Button>
        <Button variant="danger" size="lg" onClick={onCancel}>Cancel</Button>
      </CRow>
    </>
  )
}