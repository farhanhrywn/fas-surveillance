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
  CSelect,
  CLink,
  CRow,
  CCol
} from '@coreui/react'
import Swal from 'sweetalert2'
import { api } from '../config/axios'
import bgImages from '../assets/images/bg-login.jpg';

const ForgetPasswordTech = () => {
  const router = useHistory()
  const [form, setForm] = useState({
    pic_name: '',
    pic_phone_number: '',
    pic_email: '',
    id_lokasi: ''
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

  const submitForgetPassword = () => {
    console.log(form)
  }

  const updateForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const filterFields = (event) => {
    setFields(locations.filter(location => location.alamat_lokasi === event.target.value))
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
                  <CLabel className="label__custom">PIC Name</CLabel>
                  <CInput className="custom-input__background" type="text" name='pic_name' onChange={updateForm}/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel className="label__custom">Phone Number</CLabel>
                  <CInput className="custom-input__background" type="text" name='pic_phone_number' onChange={updateForm} />
                </CFormGroup>
                <CFormGroup>
                  <CLabel className="label__custom">Email</CLabel>
                  <CInput className="custom-input__background" type="text" name='pic_email' onChange={updateForm} />
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
              </CForm>
            </CCardBody>
            <CCardFooter className="custom-card__footer">
              <CButton block size="lg" color="primary" onClick={submitForgetPassword}>Submit</CButton>
              <CRow className="mt-3">
                <CCol md="12" style={{justifyContent: 'space-between', display: 'flex' }}>
                  <CLink className="text-white" onClick={() => router.push('/')}>
                    Login as Technician
                  </CLink>
                  <CLink className="text-white" onClick={() => router.push('/login/spv')}>
                    Login as Supervisor
                  </CLink>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CContainer>
    </div>
  )
}

export default ForgetPasswordTech