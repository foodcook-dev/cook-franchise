import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const APP_VERSION = '1.0.7'

// const DEV_FLAG = __DEV__;
const DEV_FLAG = false
// const DEV_FLAG = true

// const MAIN_ENDPOINT = "https://xn--wv4b09focz31b.com";
const MAIN_ENDPOINT = 'https://admin.xn--wv4b09focz31b.com'
const TEST_ENDPOINT = 'https://admin.cookerp.shop'
const API_ENDPOINT = DEV_FLAG ? TEST_ENDPOINT : MAIN_ENDPOINT
// const API_ENDPOINT = TEST_ENDPOINT;

const PAY_MAIN_ENDPOINT_LIVE = 'https://pay.xn--wv4b09focz31b.com'
const PAY_MAIN_ENDPOINT_TEST = 'https://pay.cookerp.shop'
const PAY_MAIN_ENDPOINT = DEV_FLAG
  ? PAY_MAIN_ENDPOINT_TEST
  : PAY_MAIN_ENDPOINT_LIVE

const API = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000 * 15, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const PRODUCT_API = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000 * 15, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

function updateApiBaseUrl() {
  let userInfo = null
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const userInfoString = localStorage.getItem('userInfo')
      userInfo = userInfoString ? JSON.parse(userInfoString) : null
      console.log(
        'updateApiBaseUrl userInfo > branch > branch_server_url:',
        userInfo?.branch?.branch_server_url
      )
    }
  } catch (error) {
    console.log('updateApiBaseUrl no userInfo')
  }
  if (userInfo?.branch?.branch_server_url) {
    PRODUCT_API.defaults.baseURL = userInfo.branch.branch_server_url
  } else {
    PRODUCT_API.defaults.baseURL = API_ENDPOINT
  }
}

function setAPIAccessToken() {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    API.defaults.headers.authorization = `Bearer ${accessToken}`
    PRODUCT_API.defaults.headers.authorization = `Bearer ${accessToken}`
    return true
  } else {
    API.defaults.headers.authorization = ''
    PRODUCT_API.defaults.headers.authorization = ''
    return false
  }
}

// init API settings when app starts
function initAPISettings() {
  setAPIAccessToken()
  updateApiBaseUrl()
}

function requestInterceptor(config: InternalAxiosRequestConfig) {
  console.log(
    'axios:request:',
    config.baseURL,
    config.url,
    config.headers?.authorization?.toString().slice(0, 20) + '...'
  )
  return config
}

function authErrorInterceptor(error: AxiosError) {
  console.log('axios:error:', error.cause, error.message, error.response?.data)

  // check content type
  if (error.response?.headers['content-type']?.includes('application/json')) {
    console.log('axios:error: content-type: application/json')
    // check error message
    if (error.response.data) {
      console.log('axios:error: message:', error.response.data)
    }
  } else if (error.response?.headers['content-type']?.includes('text/html')) {
    console.log('axios:error: content-type: text/html')
    if (error.response.data) {
      console.log('axios:error: data:', error.response.data)
    }
  }

  return Promise.reject(error)
}

PRODUCT_API.interceptors.request.use(requestInterceptor)
PRODUCT_API.interceptors.response.use(
  (response) => response,
  authErrorInterceptor
)

export {
  API,
  MAIN_ENDPOINT,
  TEST_ENDPOINT,
  PAY_MAIN_ENDPOINT,
  API_ENDPOINT,
  PRODUCT_API,
  updateApiBaseUrl,
  setAPIAccessToken,
  initAPISettings,
}
