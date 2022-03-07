import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  CCol,
  CRow,
  CButton,
  CLabel,
  CSelect,
  CDataTable,
  CFormGroup,
  CInput,
  CBadge
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as Icon from '@coreui/icons'
import FormEditRequest from './formEditRequest'
import moment from 'moment'
import { api } from '../config/axios'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import { Button, Space } from 'antd'
import { filterRequestSpvByParams, getRequestSpv } from '../store'

const fields = [
  { key: 'item', label: 'Item Name' },
  { key: 'qty', label: 'Quantity' },
  { key: 'req_to', label: 'Request To' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'req_status', label: 'Request Status' },
  { key: 'seen_status', label: 'Seen Status'},
  { key: 'create_by', label: 'Request By'},
  { key: 'create_date', label: 'Request Date'},
  { key: 'update_by', label: 'Update By'},
  { key: 'update_date', label: 'Update Date', _style: {width: '10%'}},
  { key: 'action', label: 'Action' }
]

export default function RequestTableSpv ({ requestList, locationList }) {
  const dispatch = useDispatch()
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [idReq, setIdReq] = useState('')

  const [formFilter, setFormFilter] = useState({
    id_lokasi: 'null',
    seen_status: 'null',
    start_date: 'null',
    end_date: 'null'
  })

  const convertDate = (value) => {
    let date = moment(value).format('DD MMM YYYY')
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

  const checkName = (asset) => {
    if(!asset.update_by) {
      return (
        <td>
        -
      </td>
      )
    }

    return (
      <td>
        {asset.update_by}
      </td>
    )
  }


  const showEditModal = (assetId) => {
    setModalEditOpen(true)
    setIdReq(assetId)
  }

  const showRemoveModal = (requestId) => {
    Swal.fire({
      title: 'Are you sure to remove this request ?',
      // text: "You won't be able to revert this item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api({
          url: `/Request/${requestId}`,
          method: 'DELETE'
        })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Sukses remove item',
            'success'
          )
          // fetchDataAsset(localStorage.getItem('loc_id'))
        })
      }
    })
  }

  const hideModal = () => {
    setModalEditOpen(false)
  }

  const acceptRequest = (requestId) => {
    Swal.fire({
      title: 'Are you sure to accept this request ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        api({
          url: `/Request/changeReqStatus/${requestId}/accepted`,
          method: 'PUT'
        })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Sukses accept request',
            'success'
          )
          dispatch(getRequestSpv())
        })
      }
    })
  }

  const declineRequest = (requestId) => {
    Swal.fire({
      title: 'Are you sure to reject this request ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        api({
          url: `/Request/changeReqStatus/${requestId}/rejected`,
          method: 'PUT'
        })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Sukses reject request',
            'success'
          )
          dispatch(getRequestSpv())
        })
      }
    })
  }

  const badgeStatus = (request) => {
    if(request.seen_status === 'seen') {
      return <CBadge color='success'>{request.seen_status}</CBadge>
    } else {
      return <CBadge color='danger'>{request.seen_status}</CBadge>
    }
  }

  const actionField = (request) => {
    return (
      <td>
        <CRow>
          <CCol md="3">
            <CIcon style={{ color: '#008000'}} icon={Icon.cilCheckAlt} width={20} onClick={() => acceptRequest(request.id_req)}/>
          </CCol>
          <CCol md="3">
            <CIcon style={{ color: '#FF0000'}} icon={Icon.cilBan} width={20} onClick={() => declineRequest(request.id_req)}/>
          </CCol>
          {/* <CCol md="3">
            <CIcon icon={Icon.cilFolderOpen} width={20} onClick={() => seenRequest(request.id_req)}/>
          </CCol> */}
        </CRow>
    </td>
    )
  }

  const saveItem = (item) => {
    api({
      url: `/Request/${item.id_req}`,
      method: 'PUT',
      data: {
        ...item,
        create_by: localStorage.getItem('pic_name')
      }
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses edit request',
        timer: 2000,
        showConfirmButton: false
      })

      hideModal()
    })
    .catch((err) => {
      console.log(err)
    })
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

    dispatch(filterRequestSpvByParams(payload))
  }

  return (
    <>
      <CRow>
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
            <CSelect className={'custom-input__background'} name='seen_status' onChange={(event) => setFormFilter({ ...formFilter, [event.target.name]: event.target.value })}>
              <option value="null">Please select...</option>
              <option value="seen">Seen</option>
              <option value="not seen">Not Seen</option>
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CFormGroup>
            <CLabel>Start Date : </CLabel>
            <CInput type="date" name="start_date" onChange={(event) => setFormFilter({ ...formFilter, [event.target.name]: event.target.value })}/>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CFormGroup>
            <CLabel>End Date : </CLabel>
            <CInput type="date" name="end_date" onChange={(event) => setFormFilter({ ...formFilter, [event.target.name]: event.target.value })}/>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CButton block color="primary" style={{ marginTop: 32 }} onClick={searchItemByFilter}>Search</CButton>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol xl={12}>
          <CDataTable
            items={requestList}
            fields={fields}
            size='500px'
            hover
            striped
            scopedSlots={{
              'create_date': (asset) => convertDate(asset.create_date),
              'update_by': (asset) => checkName(asset),
              'update_date': (asset) => convertDate(asset.update_date),
              'action': (asset, index) => actionField(asset),
              'seen_status': (request) => (
                <td style={{ verticalAlign: 'middle'}}>
                  {badgeStatus(request)}
                </td>
              ),
            }}
          />
        </CCol>
      </CRow>

      {/* Modal component for edit item */}
      <Modal show={isModalEditOpen} size="xl" centered>
        <Modal.Header>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEditRequest onSubmit={saveItem} onCancel={hideModal} requestId={idReq}/>
        </Modal.Body>
      </Modal>
    </>
  )
}