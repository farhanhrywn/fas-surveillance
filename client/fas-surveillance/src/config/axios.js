import axios from "axios"

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  // baseURL: process.env.REACT_APP_API_URL_PROD
  baseURL: process.env.REACT_APP_API_URL_DEV
})

const apiForExport = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: process.env.REACT_APP_API_URL_PROD_EXPORT
})

export {
  api,
  apiForExport
}