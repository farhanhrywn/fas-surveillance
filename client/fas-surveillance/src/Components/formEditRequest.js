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
  CFormText,
  CInvalidFeedback,
  CValidFeedback
} from '@coreui/react'
import assetType from '../assetType.json'
import assetStatus from '../assetStatus.json'
import { api } from "../config/axios";
import moment from "moment";


export default function FormEditRequest ({ onSubmit, onCancel, requestId }) {
  const router = useHistory()
  const [assetsType, setAssetsType] = useState([])
  const [type, setType] = useState('')
  const [certDate, setCertDate] = useState('') 
  const [asset, setAsset] = useState({})
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
    cert_date: '',
    phone: '',
    tools_date_in: '',
    status: ''
  })

  const changeForm = (event) => {
    setAsset({ ...asset, [event.target.name]: event.target.value })
  }

  const isFormValid = () => {
    let arrValueForm = Object.values(form)
    let isValueEmpty = arrValueForm.some(val => val === '' || val === undefined)
    if(isValueEmpty) {
      return true
    }
    return false
  }

  const getRequestById = (assetId) => {
    api({
      url: `/Request/${assetId}`,
      method: 'GET'
    })
    .then(({ data }) => {
      setAsset(data[0])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const saveForm = () => {
    onSubmit(asset)
  }

  useEffect(() => {
    isFormValid()
    getRequestById(requestId)
  },[form])


  return (
    <>
      <CRow>
        <CCol md="12">
          <CFormGroup row>
            <CCol md="3">
              <CLabel>Item Name <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="item" required onChange={changeForm} value={asset.item}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Quantity <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="qty" onChange={changeForm} value={asset.qty}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Plan <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect type="text" name="plan" onChange={changeForm} value={asset.req_to}>
              <option value="">Please Select..</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Warehouse">Warehouse</option>
            </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <div className="d-flex" style={{ justifyContent: 'right'}}>
        <Button className="mr-3" variant="light" size="lg" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="lg" onClick={() => saveForm()}>Save</Button>
      </div>
    </>
  )
}