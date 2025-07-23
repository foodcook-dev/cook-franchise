import * as React from 'react'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { useAutoScroll } from '@/components/chat/hooks/useAutoScroll'
import { cn } from '@/lib/utils'

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  smooth?: boolean
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  scrollTriggerRef?: React.MutableRefObject<(() => void) | null>
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({
    className,
    children,
    smooth = false,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    scrollTriggerRef,
    ...props
  }) => {
    const { scrollRef, isAtBottom, scrollToBottom, disableAutoScroll } =
      useAutoScroll({
        smooth,
        content: children,
      })

    // scrollTriggerRef에 scrollToBottom 함수 연결
    React.useEffect(() => {
      if (scrollTriggerRef) {
        scrollTriggerRef.current = scrollToBottom
      }
    }, [scrollToBottom, scrollTriggerRef])

    const prevScrollHeight = React.useRef(0)

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight } = e.currentTarget

      if (scrollTop < 200 && hasNextPage && !isFetchingNextPage && onLoadMore) {
        prevScrollHeight.current = scrollHeight
        onLoadMore()
      }
    }

    React.useEffect(() => {
      if (scrollRef.current && prevScrollHeight.current > 0) {
        const newScrollHeight = scrollRef.current.scrollHeight
        const heightDiff = newScrollHeight - prevScrollHeight.current

        if (heightDiff > 0) {
          scrollRef.current.scrollTop = scrollRef.current.scrollTop + heightDiff
        }

        prevScrollHeight.current = 0
      }
    }, [children, isFetchingNextPage])

    return (
      <div className='chat-message-list relative h-full w-full'>
        <div
          className={cn(
            'scrollbar-thin scrollbar-thumb-muted/30 scrollbar-track-transparent flex h-full w-full flex-col overflow-y-auto px-6 py-8',
            className
          )}
          ref={scrollRef}
          onWheel={disableAutoScroll}
          onTouchMove={disableAutoScroll}
          onScroll={handleScroll}
          {...props}
        >
          {isFetchingNextPage && (
            <div className='flex justify-center py-6'>
              <div className='bg-muted/50 flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm'>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent'></div>
                <span className='text-sm text-muted-foreground'>
                  메시지를 불러오는 중...
                </span>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-4'>{children}</div>
        </div>
        {!isAtBottom && (
          <Button
            onClick={() => scrollToBottom()}
            size='icon'
            variant='outline'
            className='border-border/50 bg-background/80 hover:shadow-3xl absolute bottom-6 left-1/2 h-12 w-12 -translate-x-1/2 transform rounded-full shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110'
            aria-label='Scroll to bottom'
          >
            <ArrowDown className='h-5 w-5 text-muted-foreground' />
          </Button>
        )}
      </div>
    )
  }
)

ChatMessageList.displayName = 'ChatMessageList'

export { ChatMessageList }
