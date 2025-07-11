import * as React from 'react'
import { Bell } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import MessageLoading from './message-loading'
import { Button, buttonVariants } from '@/components/custom/button'
import { format } from 'date-fns'

const chatBubbleVariant = cva(
  'flex gap-3 max-w-[90%] items-end relative group mb-4',
  {
    variants: {
      variant: {
        received: 'self-start',
        sent: 'self-end flex-row-reverse',
      },
      layout: {
        default: '',
        ai: 'max-w-full w-full items-center',
      },
    },
    defaultVariants: {
      variant: 'received',
      layout: 'default',
    },
  }
)

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariant> {}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, layout, children, ...props }, ref) => (
    <div
      className={cn(
        chatBubbleVariant({ variant, layout, className }),
        'group relative'
      )}
      ref={ref}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && typeof child.type !== 'string'
          ? React.cloneElement(child, {
              variant,
              layout,
            } as React.ComponentProps<typeof child.type>)
          : child
      )}
    </div>
  )
)
ChatBubble.displayName = 'ChatBubble'

// ChatBubbleAvatar
interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
}

const ChatBubbleAvatar: React.FC<ChatBubbleAvatarProps> = ({
  src,
  className,
}) => (
  <Avatar className={cn('h-11 w-11 shadow-sm', className)}>
    <AvatarImage src={src} alt='Avatar' />
    <AvatarFallback className='bg-primary text-xs font-medium'>
      <Bell className='h-5 w-5 text-primary-foreground' />
    </AvatarFallback>
  </Avatar>
)

// ChatBubbleMessage
const chatBubbleMessageVariants = cva('px-5 py-3 shadow-sm backdrop-blur-sm', {
  variants: {
    variant: {
      received: 'rounded-2xl rounded-br-md shadow-md border-2 border-border',
      sent: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md shadow-md',
    },
    layout: {
      default: '',
      ai: 'w-full rounded-none bg-gray-50 border-t border-gray-200 text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'received',
    layout: 'default',
  },
})

interface ChatBubbleMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleMessageVariants> {
  isLoading?: boolean
}

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  ChatBubbleMessageProps
>(
  (
    { className, variant, layout, isLoading = false, children, ...props },
    ref
  ) => (
    <div
      className={cn(
        chatBubbleMessageVariants({ variant, layout, className }),
        'max-w-full whitespace-pre-wrap break-words text-sm leading-relaxed'
      )}
      style={{
        backgroundColor: variant === 'received' ? 'white' : undefined,
        ...(document.documentElement.classList.contains('dark') &&
          variant === 'received' && {
            backgroundColor: 'rgb(31 41 55)',
          }),
      }}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <div className='flex items-center space-x-2 py-1'>
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  )
)
ChatBubbleMessage.displayName = 'ChatBubbleMessage'

// ChatBubbleTimestamp
interface ChatBubbleTimestampProps
  extends React.HTMLAttributes<HTMLDivElement> {
  timestamp: string
}

const ChatBubbleTimestamp: React.FC<ChatBubbleTimestampProps> = ({
  timestamp,
  className,
  ...props
}) => (
  <div
    className={cn('text-contrast mr-[8px] text-left text-xs', className)}
    {...props}
  >
    {format(timestamp, 'yyyy-MM-dd HH:mm')}
  </div>
)

// ChatBubbleAction
type ChatBubbleActionProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon: React.ReactNode
  }

const ChatBubbleAction: React.FC<ChatBubbleActionProps> = ({
  icon,
  onClick,
  className,
  variant = 'ghost',
  size = 'sm',
  ...props
}) => (
  <Button
    variant={variant}
    size={size}
    className={cn('h-8 w-8 rounded-md ', className)}
    onClick={onClick}
    {...props}
  >
    {icon}
  </Button>
)

interface ChatBubbleActionWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sent' | 'received'
  className?: string
}

const ChatBubbleActionWrapper = React.forwardRef<
  HTMLDivElement,
  ChatBubbleActionWrapperProps
>(({ variant, className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute top-1/2 flex -translate-y-1/2 gap-1 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100',
      variant === 'sent'
        ? '-left-2 -translate-x-full flex-row-reverse'
        : '-right-2 translate-x-full',
      className
    )}
    {...props}
  >
    {' '}
    <div className='flex gap-1 rounded-lg p-1 shadow-lg backdrop-blur-sm'>
      {children}
    </div>
  </div>
))
ChatBubbleActionWrapper.displayName = 'ChatBubbleActionWrapper'

export {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  chatBubbleVariant,
  chatBubbleMessageVariants,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
}
