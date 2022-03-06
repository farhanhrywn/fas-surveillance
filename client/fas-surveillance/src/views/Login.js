import React, { useEffect, useState } from 'react'
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
  CSelect
} from '@coreui/react'
import Swal from 'sweetalert2'
import { api } from '../config/axios'
import bgImages from '../assets/images/bg-login.jpg';

const Login = () => {
  const router = useHistory()
  const [picName, setPicName] = useState('')
  const [loginAs, setLoginAs] = useState('teknisi')
  const [picPhoneNumber, setPicPhoneNumber] = useState('')
  const [form, setForm] = useState({
    id_lokasi: '',
    password: ''
  })
  const [formSpv, setFormSpv] = useState({
    username: '',
    password: ''
  })
  const [locations, setLocations] = useState([])
  const [fields, setFields] = useState([])

  const getListLocation = () => {
    api({
      url: '/Location',
      method: 'GET'
    })
    .then (({ data }) => {
      setLocations(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const userLogin = () => {
    if(loginAs === "teknisi") {
      api({
        url: '/loginLoc',
        method: 'POST',
        data: form
      })
      .then(({data}) => {
        localStorage.setItem('pic_name', picName)
        localStorage.setItem('pic_phone', picPhoneNumber)
        localStorage.setItem('loc_id', data.data.loc_id)
        localStorage.setItem('loc_name', data.data.lokasi)
        localStorage.setItem('token', data.token)
        localStorage.setItem('isSpv', data.data.isSpv)
        Swal.fire({
          title: 'Login Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/landing')
      })
      .catch ((err) => {
        console.log(err)
      })
    } else {
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
        console.log(err)
      })
    }

  }

  const updateForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const updateFormSpv = (event) => {
    setFormSpv({...formSpv, [event.target.name]: event.target.value})
  }

  const filterFields = (event) => {
    setFields(locations.filter(location => location.alamat_lokasi === event.target.value))
  }

  const showFormLogin = () => {
    if(loginAs === 'teknisi') {
      return (
        <>
          <CFormGroup>
            <CLabel className="label__custom">PIC Name</CLabel>
            <CInput className="custom-input__background" type="text" name='pic_name' onChange={(e) => setPicName(e.target.value)}/>
          </CFormGroup>
          <CFormGroup>
            <CLabel className="label__custom">Phone Number</CLabel>
            <CInput className="custom-input__background" type="text" name='pic_phone_number' onChange={(e) => setPicPhoneNumber(e.target.value)} />
          </CFormGroup>
          <CFormGroup>
            <CLabel className="label__custom">Location</CLabel>
            <CSelect className="custom-input__background" onChange={filterFields}>
              <option value="">Select location</option>
              <option value="KAL Operation">KAL Operation</option>
              <option value="JOP Operation">JOP Operation</option>
            </CSelect>
          </CFormGroup>
          <CFormGroup>
            <CLabel className="label__custom">Field</CLabel>
            <CSelect className="custom-input__background" name="id_lokasi" onChange={updateForm}>
              <option value="">Select field</option>
              {
                fields.map((location) => (
                  <option key={location.id_lokasi} value={location.id_lokasi}>{location.nama_lokasi}</option>
                ))
              }
            </CSelect>
          </CFormGroup>
          <CFormGroup>
            <CLabel className="label__custom" htmlFor="nf-password">Password</CLabel>
            <CInput className="custom-input__background" type="password" name="password" onChange={updateForm} />
          </CFormGroup>
        </>
      )
    } else {
      return (
        <>
          <CFormGroup>
            <CLabel className="label__custom">Username</CLabel>
            <CInput className="custom-input__background" type="text" name='username' onChange={updateFormSpv}/>
          </CFormGroup>
          <CFormGroup>
            <CLabel className="label__custom">Password</CLabel>
            <CInput className="custom-input__background" type='password' name='password' onChange={updateFormSpv}/>
          </CFormGroup>
        </>
      )
    }
  }

  const onChangeRole = (event) => {
    setPicName('')
    setPicPhoneNumber('')
    setLoginAs(event.target.value)
  }

  useEffect(() => {
    getListLocation()
  },[])

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
                  <CLabel className="label__custom" htmlFor="nf-email">Login As :</CLabel>
                  <CSelect className="custom-input__background" value={loginAs} onChange={onChangeRole}>
                    <option value="teknisi">Technician</option>
                    <option value="supervisor">Supervisor</option>
                  </CSelect>
                </CFormGroup>
                { showFormLogin() }
              </CForm>
            </CCardBody>
            <CCardFooter className="custom-card__footer">
              <CButton block size="lg" color="primary" onClick={userLogin}>Login</CButton>
            </CCardFooter>
          </CCard>
        </CContainer>
    </div>
  )
}

export default Login
