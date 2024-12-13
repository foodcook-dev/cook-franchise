// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem('accessToken')
  // const navigate = useNavigate()

  if (!accessToken) {
    // accessToken이 없으면 로그인 페이지로 이동
    return <Navigate to='/login' replace />
  }

  // accessToken이 있으면 children 렌더링
  return <>{children}</>
}

export default ProtectedRoute
