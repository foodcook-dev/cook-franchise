import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from './skip-to-main'
import { useEffect } from 'react'
import { initAPISettings } from '@/controller/api'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  // const [apiLoaded, setApiLoaded] = useState(false)
  const navigation = useNavigate()
  const franchiseInfo = JSON.parse(
    localStorage.getItem('franchiseInfo') || '{}'
  )

  useEffect(() => {
    initAPISettings()
  }, [])

  useEffect(() => {
    if (!userInfo) {
      navigation('/login')
    }
  }, [])

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <SkipToMain />

      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        userInfo={userInfo}
        franchiseInfo={franchiseInfo}
      />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
