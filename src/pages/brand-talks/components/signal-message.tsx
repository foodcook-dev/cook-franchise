import { Trash2, Bell, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from '@/components/chat/chat-bubble'
import OGTag from './og-tag'
import ContentImages from './content-images'

interface SignalMessageProps {
  chat: {
    id: string
    message: string
    message_with_html?: string
    created_at: string
    is_deleted: boolean
    is_pushed: boolean
    push_sent_at?: string | null
    og_tags?: Array<{
      og_image?: string
      og_title: string
      og_description: string
      og_tag_link: string
    }>
    content_images?: string[]
  }
  onDelete: (id: string) => void
  onSendPush: (id: string) => void
}

export default function SignalMessage({
  chat,
  onDelete,
  onSendPush,
}: SignalMessageProps) {
  return (
    <ChatBubble
      key={chat.id}
      variant='sent'
      className={chat.is_deleted ? 'opacity-50' : ''}
    >
      <ChatBubbleAvatar />
      <div className='flex flex-col space-y-2'>
        <div className='flex flex-col items-end space-y-2'>
          <ChatBubbleMessage>
            <div className='space-y-1'>
              {chat.is_deleted && (
                <div className='flex items-center gap-2 italic text-gray-500'>
                  <Trash2 className='size-3' />
                  <span>삭제된 메시지입니다</span>
                </div>
              )}
              <div>
                {chat.message_with_html ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: chat.message_with_html }}
                  />
                ) : (
                  chat.message
                )}
              </div>
              {chat.is_pushed && (
                <div className='group flex items-center justify-end gap-1 border-t pt-1'>
                  {chat.push_sent_at && (
                    <span className='max-w-0 overflow-hidden whitespace-nowrap text-xs text-green-600/70 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-40 group-hover:opacity-100'>
                      {format(new Date(chat.push_sent_at), 'yyyy-MM-dd HH:mm')}
                    </span>
                  )}
                  <CheckCircle className='size-3 text-green-600' />
                  <span className='text-xs font-medium text-green-600'>
                    푸시발송됨
                  </span>
                </div>
              )}
            </div>
          </ChatBubbleMessage>
          <OGTag ogTags={chat.og_tags || []} />
          <ContentImages
            images={chat.content_images || []}
            disabled={chat.is_deleted}
          />
        </div>
        <div className='flex items-end justify-end'>
          <ChatBubbleTimestamp timestamp={chat.created_at} />
        </div>
      </div>
      {!chat.is_deleted && (
        <ChatBubbleActionWrapper variant='sent'>
          <ChatBubbleAction
            key={`PushNotification-${chat.id}`}
            icon={
              chat.is_pushed ? (
                <CheckCircle className='size-4 text-green-600' />
              ) : (
                <Bell className='size-4' />
              )
            }
            onClick={() => !chat.is_pushed && onSendPush(chat.id)}
            disabled={chat.is_pushed}
            className={chat.is_pushed ? 'cursor-not-allowed opacity-50' : ''}
          />
          <ChatBubbleAction
            key={`Delete-${chat.id}`}
            icon={<Trash2 className='size-4 text-red-600' />}
            onClick={() => onDelete(chat.id)}
          />
        </ChatBubbleActionWrapper>
      )}
    </ChatBubble>
  )
}
