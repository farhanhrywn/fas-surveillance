import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
  CCol,
  CRow,
  CButton,
  CBadge,
  CDataTable,
  CSelect
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
import { checkCertDate } from '../helper'

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
  { key: 'backload_status', label: 'Backload Status', _style: { width: '10%'}},
  { key: 'action', label: 'Action'}
]

export default function BackloadTable ({ backloadList }) {
  const router = useHistory()
  const [assetData, setAssetData] = useState([])
  const [filteredAsset, setFilteredAsset] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalHandoverOpen, setModalHandoverOpen] = useState(false)
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [idSurv, setIdSurv] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedBackloadStatus, setSelectedBackloadStatus] = useState('Not yet')

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

  const showUpdateStatusBackloadModal = (assetId) => {
    Swal.fire({
      title: 'Are you sure to update this item ?',
      // text: "You won't be able to revert this item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        api({
          url: `/Surveillance/setStatusBackloadOff/${assetId}`,
          method: 'PUT'
        })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Sukses update item',
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
          <CCol md="3">
            <CIcon style={{ color: '#008000'}} icon={Icon.cilCheckAlt} width={20} onClick={() => showUpdateStatusBackloadModal(asset.id_surv)}/>
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

  const exportToExcel = () => {
    const link = document.createElement('a');

    link.href = `${process.env.REACT_APP_API_URL_DEV}/Surveillance/exportToExcel/${localStorage.getItem('loc_id')}/backload`;
    
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

  const filterBackloadList = () => {
    if(!selectedMonth) {
      let result = backloadList.filter((backloadItem) => selectedBackloadStatus === 'Not yet' ? backloadItem.plan !== 'Backload' : backloadItem.plan === 'Backload')
      setFilteredAsset(result)
    } else {
      let start = moment().month(selectedMonth).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
      let end = moment(start).endOf('month')
  
      let filterByMonth = backloadList.filter((backloadItem) => {
        let result = moment(backloadItem.maintenance_date).isBetween(start, end)
  
        return result === true
      })
  
      let result = filterByMonth.filter((backloadItem) => selectedBackloadStatus === 'Not yet' ? backloadItem.plan !== 'Backload' : backloadItem.plan === 'Backload')
  
      setFilteredAsset(result)

    }
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
        <CCol md="12">
          <div className={'d-flex'}>
            <div className={'d-flex align-items-center mr-3'}>
              <span style={{ width: 100 }}>Status :</span>
              <CSelect className={'custom-input__background'} onChange={(event) => setSelectedBackloadStatus(event.target.value)} value={selectedBackloadStatus}>
                <option value="Not yet">Not yet</option>
                <option value="Done">Done</option>
              </CSelect>
            </div>
            <div className={'d-flex align-items-center mr-3'}>
              <span style={{ width: 100 }}>Month :</span>
              <CSelect className={'custom-input__background'} onChange={(event) => setSelectedMonth(event.target.value)}>
                <option value="">Select the month..</option>
                <option value="0">Januari</option>
                <option value="1">Februari</option>
                <option value="2">Maret</option>
                <option value="3">April</option>
                <option value="4">Mei</option>
                <option value="5">Juni</option>
                <option value="6">Juli</option>
                <option value="7">Agustus</option>
                <option value="8">September</option>
                <option value="9">Oktober</option>
                <option value="10">November</option>
                <option value="11">Desember</option>
              </CSelect>
            </div>
            <div className={'d-flex align-items-center'}>
              <CButton block size='lg' color="primary" onClick={filterBackloadList}>Search</CButton>
            </div>
          </div>
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
              'type': (asset) => checkValue(asset, 'type'),
              'cert_date': (asset) => checkCertDate(asset.cert_date),
              'action': (asset, index) => actionField(asset),
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