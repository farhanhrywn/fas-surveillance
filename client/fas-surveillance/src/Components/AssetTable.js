import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CButton,
  CLabel,
  CSelect,
  CCard,
  CCardBody,
  CDataTable,
  CFormGroup,
  CInput,
  CTextarea
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as Icon from '@coreui/icons'
import Swal from 'sweetalert2'
import FormAdd from './formAdd'

const fields = [
  { key: 'id', label: 'No' },
  { key: 'name', label: 'Name' },
  { key: 'pn', label: 'PN' },
  { key: 'sn', label: 'SN' },
  { key: 'certificationDate', label: 'Certification Date' },
  { key: 'location', label: 'Location' },
  { key: 'condition', label: 'Condition'},
  { key: 'action', label: 'Action'}
]

export default function AssetTable () {
  const [assetData, setAssetData] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)

  const fetchDataAsset = () => {
    fetch('http://localhost:3005/asset', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => setAssetData(data))
    .catch(err => console.log(err))
  }

  const editAsset = (assetId) => {
    
  }

  const actionField = (assetId) => {
    return (
      <td>
        <CRow>
          <CCol md="3">
            <CIcon icon={Icon.cilPencil} width="20" onClick={() => editAsset(assetId)} />
          </CCol>
          <CCol md="3">
            <CIcon icon={Icon.cilNoteAdd} width="20" onClick={() => editAsset(assetId)} />
          </CCol>
          <CCol md="3">
            <CIcon style={{ color: '#F83C3C'}} icon={Icon.cilX} width="20" onClick={() => editAsset(assetId)} />
          </CCol>
        </CRow>
    </td>
    )
  }

  useEffect(() => {
    fetchDataAsset()
  },[])

  return (
    <>
      <CRow className="mt-5 justify-content-between">
        <CCol md="4">
          <CButton block color="primary" onClick={() => setModalOpen(true)}>Add Item</CButton>
        </CCol>
        <CCol md="4">
          <CRow>
            <CCol md="3" className="ml-3">
              <CLabel>Type :</CLabel>
            </CCol>
            <CCol md="8">
              <CSelect>
                <option value="">Select the type</option>
                <option value="type 1">Type 1</option>
                <option value="type 2">Type 2</option>
              </CSelect>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol xl={12}>
          <CCard>
            <CCardBody>
              <CDataTable
                items={assetData}
                fields={fields}
                hover
                striped
                scopedSlots={{
                  'action': (asset, index) => actionField(asset.id)
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <FormAdd show={isModalOpen} onHide={() => setModalOpen(false)}/>
    </>
  )
}