import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_SERVER_API_ENDPOINT || 'https://read.prendoquota.it',
  timeout: 10000
})

export default API
