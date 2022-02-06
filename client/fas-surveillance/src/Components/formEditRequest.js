import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
} from '@coreui/react'
import { api } from "../config/axios";


export default function FormEditRequest ({ onSubmit, onCancel, requestId }) {
  const [asset, setAsset] = useState({})

  const changeForm = (event) => {
    setAsset({ ...asset, [event.target.name]: event.target.value })
  }

  const saveForm = () => {
    onSubmit(asset)
  }

  useEffect(() => {
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
    
    getRequestById(requestId)
  },[requestId])


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
              <CLabel htmlFor="hf-email">Request To <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect type="text" name="plan" onChange={changeForm} value={asset.req_to}>
              <option value="">Please Select..</option>
              <option value="Supervisor KAL">Supervisor KAL</option>
              <option value="Supervisor JOP">Supervisor JOP</option>
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