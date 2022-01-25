import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
  CCol,
  CRow,
  CButton,
  CLabel,
  CSelect,
  CCard,
  CCardBody,
  CBadge,
  CDataTable,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as Icon from '@coreui/icons'
import FormAdd from './formAdd'
import FormHandover from './formHandover'
import FormEdit from './formEdit'
import moment from 'moment'
import { api } from '../config/axios'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import assetType from '../assetType.json'

import { getAssetsBackloadByLocationId } from '../store'

const fields = [
  { key: 'type', label: 'Type' },
  { key: 'pn', label: 'PN' },
  { key: 'sn', label: 'SN' },
  { key: 'item', label: 'Description' },
  { key: 'status', label: 'Status' },
  { key: 'steelbox', label: 'Steelbox' },
  { key: 'condition', label: 'Condition'},
  { key: 'plan', label: 'Plan'},
  { key: 'remark', label: 'Remark', _style: { width: '20%'} },
  { key: 'cert_date', label: 'Certification Date' },
  { key: 'tools_date_in', label: 'Number of Days in Storage', _style: { width: '20%'} },
  { key: 'maintenance_by', label: 'Update By', _style: { width: '10%'}},
  { key: 'action', label: 'Action'}
]

export default function BackloadTable ({ backloadList }) {
  const dispatch = useDispatch()
  const router = useHistory()
  const [assetData, setAssetData] = useState([])
  const [filteredAsset, setFilteredAsset] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalHandoverOpen, setModalHandoverOpen] = useState(false)
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [idSurv, setIdSurv] = useState('')

  const fetchDataAsset = (locationId) => {
    api({
      url: `/Surveillance/getBackload/${locationId}`,
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
    let date = moment(asset.cert_date).format('DD MMM YYYY')
    if(date === 'Invalid date') {
      return (
        <td>
          -
        </td>
      )
    }
    return (
        <td>
          {date}
        </td>
    )
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
        api({
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
            <CIcon icon={Icon.cilPencil} width={20} onClick={() => router.push(`/edit/item/${asset.id_surv}`)} />
          </CCol>
          <CCol md="3">
            <CIcon icon={Icon.cilNoteAdd} width={20} onClick={() => router.push(`edit/handover/${asset.id_surv}`)}/>
          </CCol>
          <CCol md="3">
            <CIcon style={{ color: '#F83C3C'}} icon={Icon.cilX} width={20} onClick={() => showRemoveModal(asset.id_surv)}/>
          </CCol>
        </CRow>
    </td>
    )
  }

  const createItem = (item) => {
    api({
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

  const filterAsset = (event) => {
    if(event.target.value === '') {
      setFilteredAsset(assetData)
    } else {
      setFilteredAsset(assetData.filter((asset) => asset.type === event.target.value))
    }
  }

  const exportToExcel = () => {
    const link = document.createElement('a');

    link.href = `${process.env.REACT_APP_API_URL_PROD_EXPORT}/Surveillance/exportToExcel/${localStorage.getItem('loc_id')}/backload`;
    
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



  // useEffect(() => {
  //   let locationId = localStorage.getItem('loc_id')
  //   fetchDataAsset(locationId)
  // },[])


  return (
    <>
      <CRow className="mt-5">
        <CCol md="4">
          <CButton block color="primary" onClick={exportToExcel} disabled={!backloadList.length}>Export</CButton>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol xl={12}>
          <CDataTable
            items={backloadList}
            fields={fields}
            size='500px'
            hover
            striped
            scopedSlots={{
              'type': (asset) => checkValue(asset, 'type'),
              'cert_date': (asset) => convertDate(asset),
              'action': (asset, index) => actionField(asset),
              'tools_date_in': (asset) => calculateDateIn(asset),
              'remark': (asset) => checkValue(asset, 'remark'),
              'maintenance_by': (asset) => getName(asset),
              'status': (asset) => (
                <td style={{ verticalAlign: 'middle'}}>
                  {badgeStatus(asset)}
                </td>
              ),
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