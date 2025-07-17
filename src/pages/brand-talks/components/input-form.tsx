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
    <div className='flex-shrink-0'>
      <form
        onSubmit={onSubmit}
        className='border-border/50 bg-background/95 focus-within:border-primary/30 focus-within:shadow-3xl overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300'
      >
        <ImagePreview images={selectedImages} onRemove={onImageRemove} />

        <ChatInput
          placeholder='내용을 작성하세요...'
          className='placeholder:text-muted-foreground/60 min-h-16 resize-none border-0 bg-transparent px-6 py-4 text-base shadow-none focus-visible:ring-0'
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />

        <div className='border-border/30 flex items-center justify-between border-t px-6 py-4'>
          <div className='flex items-center gap-3'>
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
              variant='outline'
              size='sm'
              className='border-border/50 bg-background/50 hover:bg-muted/50 gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md'
              disabled={isSubmitting}
            >
              <ImageIcon className='size-4' />
              이미지 ({selectedImages.length}/{CHAT_CONSTANTS.MAX_IMAGES})
            </Button>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              type='submit'
              size='sm'
              className='gap-2 rounded-full px-6 py-2 font-medium shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:hover:scale-100'
              disabled={!inputValue.trim() || isSubmitting}
            >
              <Send className='size-4' />
              {isSubmitting ? '전송 중...' : '발송'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
