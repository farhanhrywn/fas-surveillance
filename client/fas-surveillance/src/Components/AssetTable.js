import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
  CCol,
  CRow,
  CButton,
  CSelect,
  CDataTable,
  CBadge,
  CFormGroup,
  CLabel,
  CInput
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
import { 
  getAssetsBackloadByLocationId,
  getAssetRequest,
  fetchDataAsset,
  filterAssetByType,
  saveHandoverAsset,
  saveEditAsset,
  deleteAsset,
  filterAssetByName
} from "../store";


const fields = [
  { key: 'type', label: 'Type' },
  { key: 'pn', label: 'PN' },
  { key: 'sn', label: 'SN' },
  { key: 'item', label: 'Description' },
  { key: 'sub_location', label: 'Sub Location' },
  { key: 'status', label: 'Status' },
  { key: 'steelbox', label: 'Steelbox' },
  { key: 'condition', label: 'Condition'},
  { key: 'plan', label: 'Plan'},
  { key: 'remark', label: 'Remark', _style: { width: '20%'} },
  { key: 'cert_date', label: 'Certification Date' },
  { key: 'tools_date_in', label: 'Number of Days in Storage', _style: { width: '20%'} },
  { key: 'maintenance_by', label: 'Update By', _style: { width: '10%' }},
  { key: 'action', label: 'Action'}
]

export default function AssetTable () {
  const router = useHistory()
  const dispatch = useDispatch()
  const { assets, filteredAssets } = useSelector((state) => state)
  // const [assets, setAssets] = useState([])
  // const [filteredAssets, setFilteredAssets] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalHandoverOpen, setModalHandoverOpen] = useState(false)
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [idSurv, setIdSurv] = useState('')
  const [itemName, setItemName] = useState(null)

  const convertDate = (date) => {
    let newDate = moment(date).format('DD MMM YYYY')
    if(newDate === 'Invalid date') {
      return (
        <td>
          -
        </td>
      )
    }
    return (
        <td>
          {newDate}
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
      icon: 'warning',
      timer: 2000,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAsset(assetId))
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
      <td style={{ verticalAlign: 'middle'}}>
        <div className='d-flex'>
          <div className='btn border mx-1 rounded'>
            <CIcon icon={Icon.cilPencil} width={20} onClick={() => router.push(`/edit/item/${asset.id_surv}`)} />
          </div>
          <div className='btn border mx-1 rounded'>
            <CIcon icon={Icon.cilNoteAdd} width={20} onClick={() => router.push(`edit/handover/${asset.id_surv}`)}/>
          </div>
          <div className='btn border mx-1 rounded'>
            <CIcon style={{ color: '#F83C3C'}} icon={Icon.cilX} width={20} onClick={() => showRemoveModal(asset.id_surv)}/>
          </div>
        </div>
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
      Swal.fire({
        icon: 'success',
        title: 'Sukses menambahkan asset',
        timer: 2000,
        showConfirmButton: false
      })
      // fetchDataAsset(localStorage.getItem('loc_id'))
      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const saveHandover = (item) => {
    let payload = {
      ...item,
      id_surv: idSurv,
      maintenance_by: localStorage.getItem('pic_name'),
      location: localStorage.getItem('loc_id'),
      phone: localStorage.getItem('pic_phone')
    }

    dispatch(saveHandoverAsset(payload, localStorage.getItem('loc_id')))

    setTimeout(() => {
      window.location.reload()
      hideModal()
    },[5000])
  }

  const saveItem = (item) => {
    let payload = {
      ...item,
      maintenance_by: localStorage.getItem('pic_name'),
      location: localStorage.getItem('loc_id'),
      phone: localStorage.getItem('pic_phone')
    }

    dispatch(saveEditAsset(payload))

    setTimeout(() => {
      window.location.reload()
      hideModal()
    },[5000])
  }

  const filterAsset = (event) => {
    dispatch(filterAssetByType(event.target.value, assets))
  }

  const exportToExcel = () => {
      const link = document.createElement('a');

      link.href = `${process.env.REACT_APP_API_URL_PROD}/Surveillance/exportToExcel/${localStorage.getItem('loc_id')}/notbackload`;
      
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

  const getName = (asset) => {
    let date = moment(asset.maintenance_date).format('DD MMM YYYY')
    return (
      <td>
        {`${asset.maintenance_by} - ${date}`}
      </td>
    )
  }

  const searchItemByName = () => {
    dispatch(filterAssetByName(itemName, localStorage.getItem('loc_id'), assets))
  }

  useEffect(() => {
    let locationId = localStorage.getItem('loc_id')

    // const fetchDataAsset = async () => {
    //   await api({
    //     url: `/Surveillance/${locationId}`,
    //     method: 'GET'
    //   })
    //   .then(({ data }) => {
    //     setAssets(data)
    //     setFilteredAssets(data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }

    // fetchDataAsset()

    dispatch(fetchDataAsset(locationId))
    dispatch(getAssetsBackloadByLocationId(locationId))
    dispatch(getAssetRequest(locationId))
  },[dispatch])

  return (
    <>
      <CRow className="justify-content-between">
        <CCol md="4" style={{position: 'relative'}}>
          <div className={'d-flex'} style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <CButton block size='lg' color="primary" onClick={() => router.push('/add/item')} className={'mr-3'}>Add Item</CButton>
            <CButton block size='lg' color="primary" onClick={exportToExcel} className={'mt-0 mr-3'}>Export</CButton>
            <CButton block size='lg' color="primary" className={'mt-0'}>Import</CButton>
          </div>
        </CCol>
        <CCol md="4">
          <div className={'d-flex justify-content-end'}>
              <div className={'d-flex align-items-center'}>
                <span style={{width:60}}>Type :</span>
                <CSelect onChange={filterAsset} className={'custom-input__background'}>
                  <option value="">Select the type</option>
                  {
                    assetType.map(type => (
                      <option value={type.value} key={type.value}>{type.label}</option>
                    ))
                  }
                </CSelect>
              </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol md="12" className="mb-3">
          <div className={'d-flex justify-content-end'}>
              <div className={'d-flex align-items-center mr-3'}>
                <CInput type='text' name='item_name' placeholder='Search asset here...' onChange={(event) => setItemName(event.target.value)}/>
              </div>
              <div className={'d-flex align-items-center'}>
                <CButton block size='md' color="primary" onClick={searchItemByName}>Search</CButton>
            </div>
          </div>
        </CCol>
        <CCol xl={12}>
          <CDataTable
            items={filteredAssets}
            fields={fields}
            size='500px'
            hover
            striped
            scopedSlots={{
              'type': (asset) => checkValue(asset, 'type'),
              'cert_date': (asset) => convertDate(asset.cert_date),
              'status': (asset) => (
                <td style={{ verticalAlign: 'middle'}}>
                  {badgeStatus(asset)}
                </td>
              ),
              'action': (asset, index) => actionField(asset),
              'tools_date_in': (asset) => calculateDateIn(asset),
              'remark': (asset) => checkValue(asset, 'remark'),
              'maintenance_by': (asset) => getName(asset),
              'sub_location': (asset) => checkValue(asset, 'sub_location')
            }}
          />
        </CCol>
      </CRow>

      {/* Modal component for add new item */}
      <Modal show={isModalOpen} centered>
        <Modal.Header>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAdd onSubmit={createItem} onCancel={hideModal}/>
        </Modal.Body>
      </Modal>

      {/* Modal Component for handover item */}
      <Modal show={isModalHandoverOpen} centered>
        <Modal.Header>
          <Modal.Title>Handover Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormHandover onSubmit={saveHandover} onCancel={hideModal} assetId={idSurv}/>
        </Modal.Body>
      </Modal>

      {/* Modal component for edit item */}
      <Modal show={isModalEditOpen} centered>
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