import { Trash2 } from 'lucide-react'
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
    og_tags?: Array<{
      og_image?: string
      og_title: string
      og_description: string
      og_tag_link: string
    }>
    content_images?: string[]
  }
  onDelete: (id: string) => void
}

export default function SignalMessage({ chat, onDelete }: SignalMessageProps) {
  return (
    <ChatBubble key={chat.id} variant='sent'>
      <ChatBubbleAvatar />
      <div className='flex flex-col space-y-2'>
        <div className='flex flex-col items-end space-y-2'>
          <ChatBubbleMessage>
            {chat.message_with_html ? (
              <div
                dangerouslySetInnerHTML={{ __html: chat.message_with_html }}
              />
            ) : (
              chat.message
            )}
          </ChatBubbleMessage>
          <OGTag ogTags={chat.og_tags || []} />
          <ContentImages images={chat.content_images || []} />
        </div>
        <div className='flex items-center justify-end'>
          <ChatBubbleTimestamp timestamp={chat.created_at} />
        </div>
      </div>
      <ChatBubbleActionWrapper variant='sent'>
        <ChatBubbleAction
          className='size-10'
          key={`Delete-${chat.id}`}
          icon={<Trash2 className='size-3' />}
          onClick={() => onDelete(chat.id)}
        />
      </ChatBubbleActionWrapper>
    </ChatBubble>
  )
}
