type UserExpoTokenPostData = {
  token: string
  device_id: string
  push_token: string
  user_id: number
  device_type: string
  os_platform: 'ios' | 'android' | 'windows' | 'macos' | 'web'
  os_version: string | number
  app_version: string
  locale: string
  last_activity: string
}

type AuthCompany = {
  result: boolean
  message: string
  company_name: string
}

type UserFull = {
  // payload: {
  branch: {
    branch_name: string
    branch_origin: string
    branch_server_url: string
    id: number
    is_active: boolean
  } | null
  username: string
  nickname: string
  phone_num: string
  phone_number: string
  email: string
  cart: string
  point: {
    id: number
    point: number
  }
  exp: number
  iat: number
  user_id: number
  order_count: number
  user_consent: {
    terms_of_service: boolean
    terms_of_service_date: string
    privacy_policy: boolean
    privacy_policy_date: string
    marketing_information_receive: boolean
    marketing_information_receive_date: string
    push_notifications: boolean
    push_notifications_date: string
    night_push_notifications: boolean
    night_push_notifications_date: string
  }
  company: string
  is_meet_pay_available: boolean
  is_card_pay_available: boolean
  is_paymonth_pay_available: boolean
  franchise: {
    contact_email: string | null
    contact_phone: string | null
    id: number
    name: string
    ui_information: {
      id: number
      background_color_code: string
      created_at: string
      franchise_name: string
      is_active: boolean
      logo_image: string
      splash_description: string
      splash_height_position: number
      splash_image: string
      splash_subtitle_color_code: string
      splash_title: string | null
      splash_title_color_code: string | null
      splash_duration_in_ms: number
      splash_font_size: number
    }
  }
  // };
}

type UserProfile = {
  id: number
  username: string
  nickname: string
  email?: string
  phone_num?: string
  tier?: number
  date_joined: string
  is_staff: boolean
  recommender?: number
  memo?: string
  gate_password?: string
  last_month_sales: number
  company_name: string
  company_number: string
}

type UserTier = {
  tier: string
  need_pay: number
  next_tier: string
  accomplished_tier: string
  progress: number
  image: string
  next_image: string
  accomplished_image: string
  previous_tier_total_paid: number
  discount_rate: number
  total_paid_amount_this_month: number
  target_paid_amount: number
}

type DeliveryAddress = {
  id: number
  allias: string
  address: string
  address_detail: string
  zip_code: string
  is_default: boolean
  user: number
}

type AddressBook = {
  postcode: string
  postcode1: string
  postcode2: string
  postcodeSeq: string
  zonecode: string
  address: string
  addressEnglish: string
  addressType: string
  bcode: string
  bname: string
  bnameEnglish: string
  bname1: string
  bname1English: string
  bname2: string
  bname2English: string
  sido: string
  sidoEnglish: string
  sigungu: string
  sigunguEnglish: string
  sigunguCode: string
  userLanguageType: string
  query: string
  buildingName: string
  buildingCode: string
  apartment: string
  jibunAddress: string
  jibunAddressEnglish: string
  roadAddress: string
  roadAddressEnglish: string
  autoRoadAddress: string
  autoRoadAddressEnglish: string
  autoJibunAddress: string
  autoJibunAddressEnglish: string
  userSelectedType: string
  noSelected: string
  hname: string
  roadnameCode: string
  roadname: string
  roadnameEnglish: string
}

type UserCompany = {
  address: null | string
  b_nm: string
  b_no: string
  b_sector: null | string
  b_type: null | string
  cert_image: string
  driver: null | string
  email: null | string
  id: number
  is_card_pay_available: boolean
  is_confirmed: boolean
  is_meet_pay_available: boolean
  is_test: boolean
  manager: null | string
  note: null | string
  overdue_amount: number
  owner: {
    associated_tempcompanies: []
    date_joined: string
    deleted_at: null
    email: string
    gate_password: string
    groups: []
    id: number
    is_staff: boolean
    is_superuser: boolean
    last_login: string
    last_month_sales: number
    memo: string
    nickname: string
    password: string
    phone_num: string
    recommender: null
    tier: number
    user_permissions: []
    username: string
  }
  owner_name: null | string
  phone_num: null | string
  start_dt: null | string
  tax_type: string
  zip_code: null | string
}

export type {
  UserExpoTokenPostData,
  AuthCompany,
  UserFull,
  UserProfile,
  UserTier,
  DeliveryAddress,
  UserCompany,
  AddressBook,
}
