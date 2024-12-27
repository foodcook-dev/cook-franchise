import { API, setAPIAccessToken } from '@/controller/api'
import { changeThemeColor } from '@/utils/changeThemeColor'

const setAccessToken = (accessToken: string) => {
  try {
    localStorage.setItem('accessToken', accessToken)
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
  } catch (e) {
    console.error(e)
  }
}

const login = async (id: string, password: string) => {
  const response = await API.post(`/user/login/`, { username: id, password })
  if (response.status === 200) {
    console.log('login', response.data)
    await setAccessToken(response.data['access'])
    await setAPIAccessToken()

    localStorage.setItem('userInfo', JSON.stringify(response.data?.user))
    localStorage.setItem(
      'franchiseInfo',
      JSON.stringify(response.data?.franchise)
    )
    changeThemeColor()
    return true
  }
  return false
}

const logout = async () => {
  removeAccessToken()
  await setAPIAccessToken()
  // await updateApiBaseUrl()
}

const refreshAccessToken = async () => {
  try {
    const accessToken = getAccessToken()
    const refreshToken = await API.post(`/users/refresh-token/`, {
      refresh_token: accessToken,
    })
    setAccessToken(refreshToken.data['access_token'])
  } catch (e) {
    console.error(e)
    logout()
  }
}

export {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  login,
  logout,
  refreshAccessToken,
}
