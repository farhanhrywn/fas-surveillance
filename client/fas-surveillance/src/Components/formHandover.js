import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CTextarea,
  CInputFile,
} from '@coreui/react'
import { api } from "../config/axios";

export default function FormHandover ({ onSubmit, onCancel, assetId }) {
  const [asset, setAsset] = useState({})

  const changeForm = (event) => {
    if(event.target.name === 'remark_file') {
      setAsset({ ...asset, [event.target.name]: event.target.files[0] })
    } else {
      setAsset({ ...asset, [event.target.name]: event.target.value })
    }
    // setItem(event.target.value)
    // setForm({ ...form, [event.target.name]: event.target.files[0] })
  }

  // const isFormValid = () => {
  //   // if((form.item === undefined || form.item === '') || (form.pn === undefined || form.pn === '') || (form.sn === undefined || form.sn === '') || (form.qty === undefined || form.qty === '') || (form.condition === undefined || form.condition === '')) {
  //   //   return true
  //   // }
  //   // return false
  //   let arrValueForm = Object.values(form)
  //   let isValueEmpty = arrValueForm.some(val => val === '' || val === undefined)
  //   if(isValueEmpty) {
  //     return true
  //   }
  //   return false
  // }

  useEffect(() => {

    const getAssetById = (assetId) => {
      api({
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

    getAssetById(assetId)
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
              <CTextarea rows={10} type="text" name="remark" required onChange={changeForm} value={asset.remark} placeholder="Please fill your remark or N/A if unavailable"/>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <div className="d-flex mt-3" style={{ justifyContent: 'right'}}>
        <Button className="mr-3" variant="light" size="lg" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="lg" onClick={() => onSubmit(asset)}>Save</Button>
      </div>
    </>
  )
}