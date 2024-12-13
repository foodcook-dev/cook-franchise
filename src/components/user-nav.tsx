import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslations } from 'use-intl'
import { UserFull } from '@/types/users'
import { IconUser } from '@tabler/icons-react'
import { logout } from '@/controller/user-auth'
// import { useNavigate } from 'react-router-dom'
// import { changeThemeColor } from '@/utils/changeThemeColor'

interface UserNavProps extends React.HTMLAttributes<HTMLElement> {
  userInfo: UserFull
}

export function UserNav({ userInfo }: UserNavProps) {
  const t = useTranslations('userNav')
  // const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>
              <IconUser size={18} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {userInfo?.nickname}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {userInfo?.username}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout()

            // changeThemeColor()
            window.location.reload()
            // navigate('/login')
          }}
        >
          {t('log_out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
