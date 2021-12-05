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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as Icon from '@coreui/icons'
import FormAdd from './formAdd'
import FormHandover from './formHandover'
import FormEdit from './formEdit'
import moment from 'moment'
import axios from '../config/axios'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import assetType from '../assetType.json'

const fields = [
  { key: 'id_surv', label: 'No' },
  { key: 'item', label: 'Name' },
  { key: 'pn', label: 'PN' },
  { key: 'sn', label: 'SN' },
  { key: 'cert_date', label: 'Certification Date' },
  { key: 'location', label: 'Location' },
  { key: 'condition', label: 'Condition'},
  { key: 'action', label: 'Action'}
]

export default function AssetTable () {
  const [assetData, setAssetData] = useState([])
  const [filteredAsset, setFilteredAsset] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalHandoverOpen, setModalHandoverOpen] = useState(false)
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [idSurv, setIdSurv] = useState('')
  const locationId = localStorage.getItem('location_id')

  const fetchDataAsset = (locationId) => {
    axios({
      url: `/Surveillance/${locationId}`,
      // url: '/asset',
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

  const convertDate = (asset) => {
    return (
        <td>
          {moment(asset.cert_date).format('DD MMM YYYY')}
        </td>
    )
  }

  const showHandoverModal = (assetId) => {
    setModalHandoverOpen(true)
    setIdSurv(assetId)
  }

  const showModal = () => {
    setModalOpen(true)
  }

  const showEditModal = (assetId) => {
    setModalEditOpen(true)
    setIdSurv(assetId)
  }

  const showRemoveModal = (assetId) => {
    Swal.fire({
      title: 'Are you sure to remove this item ?',
      // text: "You won't be able to revert this item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: `/Surveillance/${assetId}`,
          method: 'DELETE'
        })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Sukses remove item',
            'success'
          )
          fetchDataAsset(localStorage.getItem('loc_id'))
        })
      }
    })
  }

  const hideModal = () => {
    setModalOpen(false)
    setModalHandoverOpen(false)
    setModalEditOpen(false)
  }

  const actionField = (asset) => {
    return (
      <td>
        <CRow>
          <CCol md="3">
            <CIcon icon={Icon.cilPencil} width={20} onClick={() => showEditModal(asset.id_surv)} />
          </CCol>
          <CCol md="3">
            <CIcon icon={Icon.cilNoteAdd} width={20} onClick={() => showHandoverModal(asset.id_surv)}/>
          </CCol>
          {
            (asset.status === 'Installed' || asset.status === 'Backload') &&
            <CCol md="3">
              <CIcon style={{ color: '#F83C3C'}} icon={Icon.cilX} width={20} onClick={() => showRemoveModal(asset.id_surv)}/>
            </CCol>
          }
        </CRow>
    </td>
    )
  }

  const createItem = (item) => {
    axios({
      url: '/Surveillance/create',
      method: 'POST',
      // data: {...item, id: assetData[assetData.length - 1].id + 1, location: 1}
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
        title: 'Sukses menambahkan asset',
        timer: 2000,
        showConfirmButton: false
      })
      fetchDataAsset(localStorage.getItem('loc_id'))
      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const saveHandover = (item) => {
     axios({
      url: `/Surveillance/handover/${idSurv}`,
      method: 'POST',
      data: JSON.stringify(
        { 
          ...item,
          id_surv: idSurv,
          maintenance_by: localStorage.getItem('pic_name'),
          location: localStorage.getItem('loc_id'),
          phone: localStorage.getItem('pic_phone')
        }
      )
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
    axios({
      url: `/Surveillance/${item.id_surv}`,
      method: 'PUT',
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
      fetchDataAsset(localStorage.getItem('loc_id'))
      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const filterAsset = (event) => {
    setFilteredAsset(assetData.filter((asset) => asset.type === event.target.value))
  }

  useEffect(() => {
    let locationId = localStorage.getItem('loc_id')
    fetchDataAsset(locationId)
  },[locationId])


  return (
    <>
      <CRow className="mt-5 justify-content-between">
        <CCol md="4">
          <CButton block color="primary" onClick={showModal}>Add Item</CButton>
        </CCol>
        <CCol md="4">
          <CRow>
            <CCol md="3" className="ml-3">
              <CLabel>Type :</CLabel>
            </CCol>
            <CCol md="8">
              <CSelect onChange={filterAsset}>
                <option value="">Select the type</option>
                {
                  assetType.map(type => (
                    <option value={type.value}>{type.label}</option>
                  ))
                }
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
                items={filteredAsset}
                fields={fields}
                hover
                striped
                scopedSlots={{
                  'cert_date': (asset) => convertDate(asset),
                  'action': (asset, index) => actionField(asset)
                }}
              />
            </CCardBody>
          </CCard>
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