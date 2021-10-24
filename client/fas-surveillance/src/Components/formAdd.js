import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput
} from '@coreui/react'


export default function FormAdd (props) {

  return (
    <>
      <Modal {...props} size="xl" centered>
        <Modal.Header>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CRow>
            <CCol md="4">
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Number</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="number" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Name</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="name" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Part Number</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="pn" />
                </CCol>
              </CFormGroup>
            </CCol>
            <CCol md="4">
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Certification</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="certificationDate" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Condition</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="condition" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Category</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="category" />
                </CCol>
              </CFormGroup>
            </CCol>
            <CCol md="4">
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Quantity</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="quantity" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="hf-email">Type</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="type" />
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="primary" size="lg" onClick={props.onHide}>Add Item</Button>
          <Button variant="danger" size="lg" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
}