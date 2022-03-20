import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CForm,
  CInput,
  CCardHeader,
  CFormGroup,
  CLabel,
  CCardFooter,
  CLink,
  CRow,
  CCol
} from '@coreui/react'
import Swal from 'sweetalert2'
import { api } from '../config/axios'
import bgImages from '../assets/images/bg-login.jpg';

const ForgetPasswordSpv = () => {
  const router = useHistory()

  const [email, setEmail] = useState('')

  const submitForgetPassword = () => {
    console.log(email)
  }

  return (
    <div style={{ background: `url(https://dev.fas-slb.com/static/media/bg-login.8f85b1df.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <CContainer className="align-items-center login__container vh-100">
          <CCard className="w-100 custom-card">
            <CCardHeader className="custom-card__header" style={{ color: '#fff', textAlign: 'center'}}>
              <h2 style={{ letterSpacing: '0.26em'}}>SURVEILLANCE</h2>
            </CCardHeader>
            <CCardBody className="custom-card__body">
              <CForm>
                <CFormGroup>
                  <CLabel className="label__custom">Email</CLabel>
                  <CInput className="custom-input__background" type="text" name='pic_email' onChange={(event) => setEmail(event.target.value)} />
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter className="custom-card__footer">
              <CButton block size="lg" color="primary" onClick={submitForgetPassword}>Submit</CButton>
              <CRow className="mt-3">
                <CCol md="12" style={{justifyContent: 'space-between', display: 'flex' }}>
                  <CLink className="text-white" onClick={() => router.push('/login/spv')}>
                    Login as Supervisor
                  </CLink>
                  <CLink className="text-white" onClick={() => router.push('/')}>
                    Login as Technician
                  </CLink>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CContainer>
    </div>
  )
}

export default ForgetPasswordSpv