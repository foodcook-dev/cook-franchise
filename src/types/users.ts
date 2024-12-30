type Franchise = {
  id: number
  name: string
  headquarters_address: string | null
  contact_email: string | null
  contact_phone: string | null
  ui?: {
    franchise: number
    id: number
    accent: string
    accent_foreground: string
    background: string
    border: string
    chart1: string
    chart2: string
    chart3: string
    chart4: string
    chart5: string
    destructive: string
    destructive_foreground: string
    foreground: string
    input: string
    logo_image: string
    muted: string
    primary: string
    primary_foreground: string
    ring: string
    secondary: string
    secondary_foreground: string
  }
}

type UserFull = {
  id: number
  username: string
  is_active: boolean
  registered_at: string
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

export type { UserFull, UserProfile, UserCompany, Franchise }
