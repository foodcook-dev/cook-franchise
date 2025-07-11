import { Send, ImageIcon } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { ChatInput } from '@/components/chat/chat-input'
import ImagePreview from './image-preview'
import { CHAT_CONSTANTS } from '../data'

interface InputFormProps {
  inputValue: string
  selectedImages: Array<{
    url: string
    name: string
  }>
  isSubmitting: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onImageRemove: (index: number) => void
  onImageButtonClick: () => void
}

export default function InputForm({
  inputValue,
  selectedImages,
  isSubmitting,
  fileInputRef,
  onInputChange,
  onSubmit,
  onImageSelect,
  onImageRemove,
  onImageButtonClick,
}: InputFormProps) {
  return (
    <div className='flex-shrink-0 bg-background pt-2'>
      <form
        onSubmit={onSubmit}
        className='overflow-hidden rounded-2xl border-4 border-border bg-gradient-to-r from-background to-background shadow-xl backdrop-blur-md transition-all duration-200 focus-within:border-blue-500/50 focus-within:shadow-2xl focus-within:shadow-blue-500/10'
      >
        <ImagePreview images={selectedImages} onRemove={onImageRemove} />

        <ChatInput
          placeholder='내용을 작성하세요.'
          className='min-h-16 resize-none border-0 p-2 shadow-none focus-visible:ring-0'
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />

        <div className='flex items-center justify-between p-3'>
          <div className='flex items-center gap-2'>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple
              onChange={onImageSelect}
              className='hidden'
            />
            <Button
              type='button'
              onClick={onImageButtonClick}
              className='shadow-xs gap-1.5 bg-primary text-primary-foreground'
              disabled={isSubmitting}
            >
              <ImageIcon className='size-4' />
              이미지 첨부 ({selectedImages.length}/{CHAT_CONSTANTS.MAX_IMAGES})
            </Button>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              type='submit'
              className='shadow-xs gap-1.5 bg-primary text-primary-foreground'
              disabled={!inputValue.trim() || isSubmitting}
            >
              <Send className='size-3.5' />
              {isSubmitting ? '전송 중...' : '발송'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
