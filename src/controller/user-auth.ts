import { API, setAPIAccessToken, updateApiBaseUrl } from '@/controller/api'
import { UserFull, UserCompany, UserProfile } from '@/types/users'
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
  } catch (e) {
    console.error(e)
  }
}

const registration = async (
  username: string,
  password: string,
  nickname: string,
  phoneNum: string,
  companyId: number | null = null,
  franchise: object,
  notificationAgree: {
    marketing_information_receive: boolean
    push_notifications: boolean
    night_push_notifications: boolean
  }
) => {
  const regResult = await API.post(`/users/registration/`, {
    username,
    password,
    nickname,
    phone_num: phoneNum,
    recommend_company: companyId,
    franchise,
    terms_of_service: true,
    privacy_policy: true,
    marketing_information_receive:
      notificationAgree['marketing_information_receive'],
    push_notifications: notificationAgree['push_notifications'],
    night_push_notifications: notificationAgree['night_push_notifications'],
  })
  return regResult.data
}

const login = async (id: string, password: string) => {
  const response = await API.post(`/users/login/`, { username: id, password })
  if (response.status === 200) {
    setAccessToken(response.data['access_token'])
    await setAPIAccessToken()
    await getUser()
    changeThemeColor()
    return true
  }
  return false
}

const franchiseLogin = async (id: string, password: string) => {
  const response = await API.post(`/users/brand-app-login/`, {
    franchise_name: id,
    franchise_password: password,
  })

  if (response.data.type === 'success') {
    console.log('franchiseLogin', response.data)
    localStorage.setItem('franchiseId', response.data.franchise.id.toString())
    return response.data
  }
  return false
}

const brandLogin = async (
  id: string,
  password: string,
  franchise_name: string,
  franchise_password: string
) => {
  const response = await API.post(`/users/brand-app-login/`, {
    username: id,
    password,
    franchise_name,
    franchise_password,
  })
  if (response.status === 200) {
    setAccessToken(response.data['access_token'])
    return true
  }
  return false
}

const logout = async () => {
  removeAccessToken()
  await setAPIAccessToken()
  await updateApiBaseUrl()
}

const withdrwal = async (user: []) => {
  const response = await API.post(`/users/withdrawal/`, user)
  if (response.status === 200) {
    removeAccessToken()
    return true
  }
  return false
}

const getUser = async (): Promise<UserFull> => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    console.log('accessToken is null')
    throw new Error('Access token not found')
  }

  const userInfo = await API.get(`/users/ck-token/?access_token=${accessToken}`)
  localStorage.setItem('userInfo', JSON.stringify(userInfo.data.payload))
  await updateApiBaseUrl()
  return userInfo.data.payload as UserFull
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

const pushAccessToken = async () => {
  try {
    const accessToken = getAccessToken()
    const expoToken = localStorage.getItem('expoToken')

    console.log('pushAccessToken', expoToken)
    const refreshToken = await API.post(`/users/refresh-token/`, {
      refresh_token: accessToken,
      expo_token: expoToken,
    })
    setAccessToken(refreshToken.data['access_token'])
  } catch (e) {
    if (e) console.error(e)
    logout()
  }
}

const getAuthNum = async (phoneNum: number) => {
  const authNumResult = await API.get(`/users/auth-num/?phone_num=${phoneNum}`)
  if (authNumResult.data.result) return authNumResult.data.auth_num
  return null
}

const getUserProfile = async (): Promise<Array<UserProfile>> => {
  const response = await API.get(`/users/self/`)
  return response.data
}

const getCompany = async (): Promise<Array<UserCompany>> => {
  const response = await API.get(`/sales/companys/`)
  return response.data
}

export {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  pushAccessToken,
  getUser,
  login,
  franchiseLogin,
  brandLogin,
  logout,
  withdrwal,
  registration,
  getAuthNum,
  refreshAccessToken,
  getUserProfile,
  getCompany,
}
