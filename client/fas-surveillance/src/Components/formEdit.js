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
import assetStatus from '../assetStatus.json'
import axios from "../config/axios";
import moment from "moment";


export default function FormEdit ({ onSubmit, onCancel, assetId }) {
  const router = useHistory()
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
    date_in: ''
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

  const getAssetById = (assetId) => {
    axios({
      // url: `/asset?id_surv=${assetId}`,
      url: `/Surveillance/detail/${assetId}`,
      method: 'GET'
    })
    .then(({ data }) => {
      setAsset(data[0])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    isFormValid()
    getAssetById(assetId)
  },[form])


  return (
    <>
      <CRow>
        <CCol md="3">
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="input-name">Name <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="item" required onChange={changeForm} value={asset.item}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Part Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="pn" onChange={changeForm} value={asset.pn}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Serial Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="sn" onChange={changeForm} value={asset.sn} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Plan <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="plan" onChange={changeForm} value={asset.plan}/>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Quantity <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="qty" onChange={changeForm} value={asset.qty} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Steelbox <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput type="text" name="steelbox" onChange={changeForm} value={asset.steelbox} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Category <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="sheet" onChange={changeForm} value={asset.sheet}>
                <option value="">Please Select..</option>
                <option value="mechanical lift cert eqp">Mechanical Lift Cert Equipment</option>
                <option value="electrical cert eqp">Electrical Cert Equipment</option>
                <option value="pressure related eqp">Pressure Related Equipment</option>
                <option value="sensor rih eqp">Sensor Rih Equipment</option>
                <option value="installation tool">Installation Tool</option>
                <option value="splicing tool">Splicing Tool</option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="5">
              <CLabel htmlFor="hf-email">Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CSelect type="text" name="type" onChange={changeForm} value={asset.type}>
                {
                  assetType.map(type => (
                    <option value={type.value}>{type.label}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="5">
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Condition <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CInput type="text" name="condition" onChange={changeForm} value={asset.condition}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Certification Date <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CInput type="date" name="cert_date" onChange={changeForm} value={moment(asset.cert_date).format('YYYY-MM-DD')}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Date In <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CInput type="date" name="tools_date_in" onChange={changeForm} value={moment(asset.tools_date_in).format('YYYY-MM-DD')} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="6">
              <CLabel htmlFor="hf-email">Status <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="6">
              <CSelect type="text" name="status" onChange={changeForm} value={asset.status}>
                {
                  assetStatus.map(status => (
                    <option value={status.value}>{status.label}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: 'center'}}>
        <Button className="mr-3" variant="primary" size="lg" onClick={() => onSubmit(asset)}>Save</Button>
        <Button variant="danger" size="lg" onClick={onCancel}>Cancel</Button>
      </CRow>
    </>
  )
}