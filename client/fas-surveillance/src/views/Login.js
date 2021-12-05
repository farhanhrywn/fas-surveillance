import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import axios from '../config/axios'

const Login = () => {
  const router = useHistory()
  const [picName, setPicName] = useState('')
  const [picPhoneNumber, setPicPhoneNumber] = useState('')
  const [form, setForm] = useState({
    id_lokasi: '',
    password: ''
  })
  const [locations, setLocations] = useState([])

  const getListLocation = () => {
    axios({
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
      axios({
        url: '/loginLoc',
        method: 'POST',
        data: JSON.stringify(form)
      })
      .then(({data}) => {
        console.log(data)
        localStorage.setItem('pic_name', picName)
        localStorage.setItem('pic_phone', picPhoneNumber)
        localStorage.setItem('loc_id', data.data.loc_id)
        localStorage.setItem('loc_name', data.data.lokasi)
        localStorage.setItem('token', data.token)
        Swal.fire({
          title: 'Login Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/home')
      })
      .catch ((err) => {
        console.log(err)
      })
  }

  const updateForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  useEffect(() => {
    getListLocation()
  },[])

  return (
    <>
        <CContainer className="align-items-center mt-5">
          <CCard>
            <CCardHeader style={{ backgroundColor: '#4F8FCC', alignItems: 'center'}}>
              Surveillance
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">PIC Name</CLabel>
                  <CInput type="text" onChange={(e) => setPicName(e.target.value)}/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Phone Number</CLabel>
                  <CInput type="text" onChange={(e) => setPicPhoneNumber(e.target.value)} />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Location</CLabel>
                  <CSelect name="id_lokasi" onChange={updateForm}>
                    <option value="">Select location</option>
                    {
                      locations.map((location) => (
                        <option key={location.id_lokasi} value={location.id_lokasi}>{location.alamat_lokasi}</option>
                      ))
                    }
                  </CSelect>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput type="password" name="password" onChange={updateForm} />
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton block size="md" color="primary" onClick={userLogin}>Login</CButton>
            </CCardFooter>
          </CCard>
        </CContainer>
    </>
  )
}

export default Login
