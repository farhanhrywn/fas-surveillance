import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CTooltip,
  CLabel,
  CSelect,
  CDataTable,
  CFormGroup,
  CInput
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as Icon from '@coreui/icons'
import FormEditRequest from './formEditRequest'
import moment from 'moment'
import { api } from '../config/axios'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import { Button } from 'antd'
import { getNumRow } from '../helper'

const fields = [
  { key: 'no', label: 'No' },
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

export default function RequestTable ({ requestList }) {
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [idReq, setIdReq] = useState('')
  const [form, setForm] = useState({
    item: '',
    qty: '',
    req_to: ''
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
        })
      }
    })
  }

  const hideModal = () => {
    setModalEditOpen(false)
  }

  const actionField = (asset) => {
    return (
      <td>
        {
          ( asset.seen_status !== 'seen' ) &&
          <div className='d-flex'>
            <div className='btn border mx-1 rounded'>
              <CTooltip content='edit request'>
                <CIcon icon={Icon.cilPencil} width={20} onClick={() => showEditModal(asset.id_req)} />
              </CTooltip>
            </div>
            <div className='btn border mx-1 rounded'>
              <CTooltip content='delete request'>
                <CIcon style={{ color: '#F83C3C'}} icon={Icon.cilX} width={20} onClick={() => showRemoveModal(asset.id_req)}/>
              </CTooltip>
            </div>
          </div>
        }
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

  const createRequest = () => {
    setIsLoading(true)
    let payload = {
      ...form,
      location: localStorage.getItem('loc_id'),
      create_by: localStorage.getItem('pic_name'),
      phone: localStorage.getItem('pic_phone'),
      location_name: localStorage.getItem('loc_name')
    }


    api({
      url: '/Request',
      method: 'POST',
      data: payload
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Request Success',
        timer: 1500,
        showConfirmButton: false
      })
      setIsLoading(false)
      window.location.reload()
    })
    .catch((err) => {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Sorry, cannot create request',
        timer: 1500,
        showConfirmButton: false
      })
    })

  }


  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const isFormValid = () => {
    let arrValueForm = Object.values(form)
    let isValueEmpty = arrValueForm.some(val => val === '' || val === undefined)
    if(isValueEmpty) {
      setIsButtonDisable(true)
    } else {
      setIsButtonDisable(false)

    }
  }

  useEffect(() => {
    isFormValid()
  },[form])


  return (
    <>
      <CRow>
        <CCol md="2">
          <CFormGroup>
            <CLabel>Item Name : </CLabel>
            <CInput type='text' name='item' onChange={changeForm}/>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CFormGroup>
            <CLabel>Quantity : </CLabel>
            <CInput type='number' name='qty' onChange={changeForm}/>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <CFormGroup>
            <CLabel>Request To : </CLabel>
            <CSelect className={'custom-input__background'} name='req_to' onChange={changeForm}>
              <option value="">Please select...</option>
              <option value="Supervisor KAL">Supervisor KAL</option>
              <option value="Supervisor Floating">Supervisor Floating</option>
              <option value="Supervisor TCO">Supervisor TCO</option>
              <option value="Supervisor OSES">Supervisor OSES</option>
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol md="2">
          <Button
            type='primary'
            size='large'
            loading={isLoading}
            disabled={isButtonDisable}
            style={{ marginTop: 30 }}
            onClick={() => createRequest()}
          >Add Request</Button>
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
              'no': (asset, index) => getNumRow(index),
              'create_date': (asset) => convertDate(asset.create_date),
              'update_by': (asset) => checkName(asset),
              'update_date': (asset) => convertDate(asset.update_date),
              'action': (asset, index) => actionField(asset),
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