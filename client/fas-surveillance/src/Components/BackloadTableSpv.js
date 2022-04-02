import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  CCol,
  CRow,
  CButton,
  CBadge,
  CDataTable,
  CSelect,
  CFormGroup,
  CLabel
} from '@coreui/react'

import FormAdd from './formAdd'
import FormHandover from './formHandover'
import FormEdit from './formEdit'
import moment from 'moment'
import { api } from '../config/axios'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import { filterBackloadSpvByParams } from '../store'
import { checkCertDate, getNumRow } from '../helper'

const fields = [
  { key: 'no', label: 'No' },
  { key: 'type', label: 'Type' },
  { key: 'pn', label: 'PN' },
  { key: 'sn', label: 'SN' },
  { key: 'item', label: 'Description' },
  { key: 'status', label: 'Status' },
  { key: 'steelbox', label: 'Steelbox' },
  { key: 'condition', label: 'Condition'},
  { key: 'plan', label: 'Plan'},
  { key: 'remark', label: 'Remark', _style: { width: '20%'} },
  { key: 'cert_date', label: 'Certification Date', _style: { width: '20%'} },
  { key: 'tools_date_in', label: 'Number of Days in Storage', _style: { width: '20%'} },
  { key: 'maintenance_by', label: 'Update By', _style: { width: '10%'}},
  { key: 'backload_status', label: 'Backload Status' },
]

export default function BackloadTableSpv ({ backloadList, locationList }) {
  const dispatch = useDispatch()
  const [assetData, setAssetData] = useState([])
  const [filteredAsset, setFilteredAsset] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalHandoverOpen, setModalHandoverOpen] = useState(false)
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [idSurv, setIdSurv] = useState('')
  const [formFilter, setFormFilter] = useState({
    id_lokasi: 'null',
    month: 'null',
    plan_status: 'null'
  })

  const fetchDataAsset = (locationId) => {
    api({
      url: `/Surveillance/getBackload/${locationId}`,
      method: 'GET'
    })
    .then(({ data }) => {
      setAssetData(data)
      setFilteredAsset(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const calculateDateIn = (asset) => {
    let assetDuration = moment(asset.tools_date_in).from(moment())

    if( assetDuration === 'Invalid date' ) {
      return (
        <td>
          -
        </td>
      )
    }
    return (
      <td>
        {assetDuration}
      </td>
    )
  }

  const hideModal = () => {
    setModalOpen(false)
    setModalHandoverOpen(false)
    setModalEditOpen(false)
  }

  const createItem = (item) => {
    api({
      url: '/Surveillance/create',
      method: 'POST',
      data: JSON.stringify({ 
        ...item,
        maintenance_by: localStorage.getItem('pic_name'),
        location: localStorage.getItem('loc_id'),
        phone: localStorage.getItem('pic_phone')
      })
    })
    .then(({ data }) => {
      fetchDataAsset(localStorage.getItem('loc_id'))
      Swal.fire({
        icon: 'success',
        title: 'Sukses menambahkan asset',
        timer: 2000,
        showConfirmButton: false
      })
      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const saveHandover = (item) => {
    api({
      url: `/Surveillance/handover/${localStorage.getItem('loc_id')}`,
      method: 'POST',
      data: JSON.stringify({ 
        ...item,
        id_surv: idSurv,
        maintenance_by: localStorage.getItem('pic_name'),
        location: localStorage.getItem('loc_id'),
        phone: localStorage.getItem('pic_phone')
      })
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses menambahkan handover',
        timer: 2000,
        showConfirmButton: false
      })
      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const saveItem = (item) => {
    api({
      url: `/Surveillance/update/${item.id_surv}`,
      method: 'POST',
      data: JSON.stringify({
        ...item,
        maintenance_by: localStorage.getItem('pic_name'),
        location: localStorage.getItem('loc_id'),
        phone: localStorage.getItem('pic_phone')
      })
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses edit asset',
        timer: 2000,
        showConfirmButton: false
      })
      window.location.reload()

      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const exportToExcel = () => {
    const link = document.createElement('a');

    link.href = `${process.env.REACT_APP_API_URL_PROD}/Surveillance/exportToExcel/null/backload`;
    
    document.body.appendChild(link);

    link.click();

    link.remove();
  }

  const checkValue = (asset, params) => {
    if(!asset[params]) {
      return (
        <td>
          N/A
        </td>
      )
    }
    return (
        <td>
          {asset[params]}
        </td>
    )
  }


  const badgeStatus = (asset) => {

    switch (asset.status) {
      case 'Pulled':
        return <CBadge color='info'>{asset.status}</CBadge>
      case 'New':
        return <CBadge color='success'>{asset.status}</CBadge>
      default:
        return <CBadge color='danger'>{asset.status}</CBadge>
    }
    
  }

  const getName = (asset) => {
    let date = moment(asset.maintenance_date).format('DD MMM YYYY')
    return (
      <td>
        {`${asset.maintenance_by} - ${date}`}
      </td>
    )
  }

  const getTransportStatus = (asset) => {
    if( asset.status === 'Backload' && asset.plan === 'Backload' ) {
      return <CBadge color='success'>Done</CBadge>
    } else {
      return <CBadge color='danger'>Not yet</CBadge>
    }
  }

  const getBackloadList = () => {
    let result = backloadList.filter((backloadItem) => backloadItem.plan !== 'Backload')
    return result
  }

  const searchItemByFilter = () => {
    let payload = {}

    for( const key in formFilter ) {
      if(formFilter[key] === '') {
        payload[key] = 'null'
      } else {
        payload[key] = formFilter[key]
      }
    }

    dispatch(filterBackloadSpvByParams(payload))
  }

  return (
    <>
      <CRow className="mt-5">
        <CCol md="4">
          <CButton block color="primary" onClick={exportToExcel} disabled={!backloadList.length}>Export</CButton>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol md="2">
          <CFormGroup>
            <CLabel>Location : </CLabel> <br />
            <CSelect name='id_lokasi' className={'custom-input__background'} onChange={(event) => setFormFilter({ ...formFilter, [event.target.name]: event.target.value })}>
              <option value="null">Select the location</option>
              {
                locationList.map(location => (
                  <option value={location.id_lokasi} key={location.id_lokasi}>{location.nama_lokasi}</option>
                ))
              }
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CFormGroup>
            <CLabel>Status : </CLabel>
            <CSelect name='plan_status' className={'custom-input__background'} onChange={(event) => setFormFilter({ ...formFilter, [event.target.name]: event.target.value })}>
              <option value="null">Not yet</option>
              <option value="Backload">Done</option>
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CFormGroup>
            <CLabel>Month : </CLabel>
            <CSelect name='month' className={'custom-input__background'} onChange={(event) => setFormFilter({ ...formFilter, [event.target.name]: event.target.value })}>
                <option value="">Select the month..</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CButton block size='lg' color="primary" style={{ marginTop: 25 }} onClick={searchItemByFilter}>Search</CButton>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol xl={12}>
          <CDataTable
            items={filteredAsset ? filteredAsset : getBackloadList()}
            fields={fields}
            size='500px'
            hover
            striped
            scopedSlots={{
              'no': (asset, index) => getNumRow(index),
              'type': (asset) => checkValue(asset, 'type'),
              'cert_date': (asset) => checkCertDate(asset.cert_date),
              'tools_date_in': (asset) => calculateDateIn(asset),
              'remark': (asset) => checkValue(asset, 'remark'),
              'maintenance_by': (asset) => getName(asset),
              'status': (asset) => (
                <td style={{ verticalAlign: 'middle'}}>
                  {badgeStatus(asset)}
                </td>
              ),
              'backload_status': (asset) => (
                <td style={{ verticalAlign: 'middle'}}>
                  {getTransportStatus(asset)}
                </td>
              )
            }}
          />
        </CCol>
      </CRow>

      {/* Modal component for add new item */}
      <Modal show={isModalOpen} size="xl" centered>
        <Modal.Header>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAdd onSubmit={createItem} onCancel={hideModal}/>
        </Modal.Body>
      </Modal>

      {/* Modal Component for handover item */}
      <Modal show={isModalHandoverOpen} size="xl" centered>
        <Modal.Header>
          <Modal.Title>Handover Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormHandover onSubmit={saveHandover} onCancel={hideModal}/>
        </Modal.Body>
      </Modal>

      {/* Modal component for edit item */}
      <Modal show={isModalEditOpen} size="xl" centered>
        <Modal.Header>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEdit onSubmit={saveItem} onCancel={hideModal} assetId={idSurv}/>
        </Modal.Body>
      </Modal>
    </>
  )
}