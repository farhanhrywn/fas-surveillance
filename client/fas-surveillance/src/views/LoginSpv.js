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

const LoginSpv = () => {
  const router = useHistory()
  const [formSpv, setFormSpv] = useState({
    username: '',
    password: ''
  })

  const userLogin = () => {
    api({
      url: '/Login/LoginSpv',
      method: 'POST',
      data: formSpv
    })
    .then(({ data }) => {
      localStorage.setItem('id', data.data.id_user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('category', data.data.kategori)
      localStorage.setItem('isSpv', data.data.isSpv)
      Swal.fire({
        title: 'Login Success',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      router.push('/landing/spv')
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Wrong username or password',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  const updateFormSpv = (event) => {
    setFormSpv({...formSpv, [event.target.name]: event.target.value})
  }

  return (
    <div style={{ background: `url(${bgImages})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <CContainer className="align-items-center login__container vh-100">
          <CCard className="w-100 custom-card">
            <CCardHeader className="custom-card__header" style={{ color: '#fff', textAlign: 'center'}}>
              <h2 style={{ letterSpacing: '0.26em'}}>SURVEILLANCE</h2>
            </CCardHeader>
            <CCardBody className="custom-card__body">
              <CForm>
                <CFormGroup>
                  <CLabel className="label__custom">Username</CLabel>
                  <CInput className="custom-input__background" type="text" name='username' onChange={updateFormSpv}/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel className="label__custom">Password</CLabel>
                  <CInput className="custom-input__background" type='password' name='password' onChange={updateFormSpv}/>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter className="custom-card__footer">
              <CButton block size="lg" color="primary" onClick={userLogin}>Login</CButton>
              <CRow className="mt-3">
                <CCol md="12" style={{justifyContent: 'space-between', display: 'flex' }}>
                  <CLink className="text-white" onClick={() => router.push('/forget-password/spv')}>
                    Forget Password
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

export default LoginSpv
