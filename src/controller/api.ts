import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { logout, setAccessToken } from './user-auth'

export const APP_VERSION = '1.0.7'

// const DEV_FLAG = __DEV__;
// const DEV_FLAG = false
const DEV_FLAG = true

// const MAIN_ENDPOINT = "https://xn--wv4b09focz31b.com";
const MAIN_ENDPOINT = 'https://admin.xn--wv4b09focz31b.com'
// const TEST_ENDPOINT = 'https://admin.cookerp.shop'
const TEST_ENDPOINT = 'https://franchise.cookerp.shop'
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
}

function setAPIAccessToken() {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    API.defaults.headers.authorization = `Bearer ${accessToken}`

    return true
  } else {
    API.defaults.headers.authorization = ''

    return false
  }
}

// init API settings when app starts
function initAPISettings() {
  setAPIAccessToken()
  // updateApiBaseUrl()
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

async function authErrorInterceptor(error: AxiosError) {
  console.log('axios:error:', error.cause, error.message, error.response?.data)

  if (error.response?.status === 401) {
    console.log('Unauthorized error detected. Attempting token refresh...')
    try {
      const refreshToken = localStorage.getItem('refreshToken')

      console.log('refreshToken:', refreshToken)
      if (!refreshToken) {
        console.log('No refresh token found. Logging out...')
        logout()
        return Promise.reject(error)
      }

      // Refresh the access token
      const response = await API.post('/user/login/refresh/', {
        refresh: refreshToken,
      })

      // Save new tokens
      const { access_token, refresh_token } = response.data
      setAccessToken(access_token, refresh_token)
      setAPIAccessToken()

      // Retry the failed request with the new access token
      if (error.config) {
        error.config.headers.authorization = `Bearer ${access_token}`
        return API.request(error.config)
      }
    } catch (refreshError) {
      console.error('Failed to refresh token:', refreshError)
      logout()
    }
  }

  return Promise.reject(error)
}

API.interceptors.request.use(requestInterceptor)
API.interceptors.response.use((response) => response, authErrorInterceptor)

export {
  API,
  MAIN_ENDPOINT,
  TEST_ENDPOINT,
  PAY_MAIN_ENDPOINT,
  API_ENDPOINT,
  updateApiBaseUrl,
  setAPIAccessToken,
  initAPISettings,
}
