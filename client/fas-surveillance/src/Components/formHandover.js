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
import { api } from "../config/axios";
import assetType from '../assetType.json'


export default function FormHandover ({ onSubmit, onCancel, assetId }) {
  const router = useHistory()
  // const [asset, setAsset] = useState({})
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
    const getRequestById = (assetId) => {
      api({
        url: `/Surveillance/detail/${assetId}`,
        method: 'GET'
      })
      .then(({ data }) => {
        setForm(data[0])
      })
      .catch((err) => {
        console.log(err)
      })
    }

    getRequestById(assetId)
  },[assetId])


  return (
    <>
      <CRow>
        <CCol md="12">
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Attach File </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInputFile type="file" name="remark_file" onChange={changeForm} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="input-name">Remark <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea rows={10} type="text" name="remark" required onChange={changeForm} value={form.remark} placeholder="Please fill your remark or N/A if unavailable"/>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <div className="d-flex mt-3" style={{ justifyContent: 'right'}}>
        <Button className="mr-3" variant="light" size="lg" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="lg" onClick={() => onSubmit(form)}>Add Item</Button>
      </div>
    </>
  )
}