import { API, setAPIAccessToken } from '@/controller/api'
import { changeThemeColor } from '@/utils/changeThemeColor'

const setAccessToken = async (accessToken: string, refreshToken: string) => {
  try {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setAPIAccessToken()
  } catch (e) {
    console.error(e)
  }
}

const getAccessToken = () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken || null
  } catch (e) {
    console.error(e)
    return null
  }
}

const removeAccessToken = () => {
  try {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('franchiseInfo')
    localStorage.removeItem('refreshToken')
  } catch (e) {
    console.error(e)
  }
}

const login = async (id: string, password: string) => {
  const response = await API.post(`/user/login/`, { username: id, password })
  if (response.status === 200) {
    // console.log('login', response.data)
    await setAccessToken(response.data['access'], response.data['refresh'])
    await setAPIAccessToken()

    localStorage.setItem('userInfo', JSON.stringify(response.data?.user))

    if (response.data?.franchise) {
      localStorage.setItem(
        'franchiseInfo',
        JSON.stringify(response.data?.franchise)
      )

      changeThemeColor()
    }

    return true
  }
  return false
}

const logout = async () => {
  removeAccessToken()
  await setAPIAccessToken()

  window.location.reload()
}

const refreshAccessToken = async () => {
  try {
    const validateToken = await validateAccessToken()
    const refreshToken = localStorage.getItem('refreshToken')

    if (!validateToken) {
      const result = await API.post(`/user/login/refresh/`, {
        refresh: refreshToken,
      })
      setAccessToken(result.data['access_token'], result.data['refresh_token'])
      setAPIAccessToken()
    }
  } catch (e) {
    console.error(e)
    logout()
  }
}

const validateAccessToken = async () => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
      return false
    }
    const userInfoObj = JSON.parse(userInfo)
    const response = await API.post(`/user/validate-token/`, {
      username: userInfoObj?.username,
    })
    return response.status === 201
  } catch (e) {
    console.error(e)
    return false
  }
}

export {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  login,
  logout,
  refreshAccessToken,
  validateAccessToken,
}
