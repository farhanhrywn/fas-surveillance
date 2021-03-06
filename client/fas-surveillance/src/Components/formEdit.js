import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CFormText,
} from '@coreui/react'
import assetType from '../assetType.json'
import assetStatus from '../assetStatus.json'
import { api } from "../config/axios";
import moment from "moment";


export default function FormEdit ({ onSubmit, onCancel, assetId }) {
  const [assetsType, setAssetsType] = useState([])
  const [type, setType] = useState('')
  const [asset, setAsset] = useState({})

  const changeForm = (event) => {
    setAsset({ ...asset, [event.target.name]: event.target.value })
  }

  const getAssetType = (value) => {
    let result = assetType.find(el => el.value === value)
    setType(result.type)
    setAssetsType(assetType.filter(asset => asset.type === result.type))
  }

  const filterType = (event) => {
    setType(event.target.value)
    setAssetsType(assetType.filter(asset => asset.type === event.target.value))
  }

  useEffect(() => {
    const getRequestById = (assetId) => {
      api({
        url: `/Surveillance/detail/${assetId}`,
        method: 'GET'
      })
      .then(({ data }) => {
        console.log(data)
        setAsset(data[0])
        getAssetType(data[0].type)
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
              <CLabel htmlFor="input-name">Name <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="item" required onChange={changeForm} value={asset.item}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row style={{ marginBottom: 0 }}>
            <CCol md="3">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Part Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="pn" onChange={changeForm} value={asset.pn}/>
              <CFormText style={{ marginBottom: '1rem', fontSize: 10 }}>Fill n/a if Part Number unavailable</CFormText>
            </CCol>
          </CFormGroup>
          <CFormGroup row style={{ marginBottom: 0 }}>
            <CCol md="3">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Serial Number <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="sn" onChange={changeForm} value={asset.sn} />
              <CFormText style={{ marginBottom: '1rem', fontSize: 10 }}>Fill n/a if Serial Number unavailable</CFormText>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Plan <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect type="text" name="plan" onChange={changeForm} value={asset.plan}>
              <option value="">Please Select..</option>
              <option value="Backload">Backload</option>
              <option value="Keep in Store">Keep in Store</option>
              <option value="Repair">Repair</option>
            </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <CFormGroup row style={{ marginBottom: 0 }}>
            <CCol md="3">
              <CLabel htmlFor="hf-email" style={{ marginBottom: 0 }}>Steelbox <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="steelbox" onChange={changeForm} value={asset.steelbox}/>
              <CFormText style={{ marginBottom: '1rem', fontSize: 10 }}>Fill n/a if Steelbox unavailable</CFormText>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect type="text" name="type" onChange={filterType} value={type}>
                <option value="">Please Select..</option>
                <option value="Tools">Tools</option>
                <option value="ESP Equipment">ESP Equipment</option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Sub Type <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect type="text" name="type" onChange={changeForm} value={asset.type}>
                <option value="">Please Select..</option>
                {
                  assetsType.map(type => (
                    <option value={type.value}>{type.label}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <CFormGroup row >
            <CCol md="3">
              <CLabel htmlFor="hf-email">Quantity <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="text" name="qty" onChange={changeForm} value={asset.qty} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Status <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect type="text" name="status" onChange={changeForm} value={asset.status}>
                <option value="">Please Select..</option>
                {
                  assetStatus.map(status => (
                    <option value={status.value}>{status.label}</option>
                  ))
                }
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Condition <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
            <CSelect type="text" name="condition" onChange={changeForm} value={asset.condition}>
              <option value="">Please Select..</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Certification Date</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="date" name="cert_date" onChange={changeForm}  value={moment(asset.cert_date).format('YYYY-MM-DD')}/>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="hf-email">Arrival Date <span style={{ color: '#FF0B0B' }}>*</span></CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput type="date" name="tools_date_in" onChange={changeForm} value={moment(asset.tools_date_in).format('YYYY-MM-DD')} />
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