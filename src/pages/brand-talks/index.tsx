import { AlertCircle } from 'lucide-react'
import useGuideStore from '@/stores/guide'
import { brandTalkSteps } from './guide-constants'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import SignalHeader from './components/signal-header'
import { ChatMessageList } from '@/components/chat/chat-message-list'
import SignalMessage from './components/signal-message'
import InputForm from './components/input-form'
import { useSignalHandler } from './hooks/useSignalHandler'
import { Franchise } from '@/types/users'
import { Button } from '@/components/custom/button'

export default function SignalChat() {
  const { setSteps } = useGuideStore()
  const franchiseInfo: Franchise =
    localStorage.getItem('franchiseInfo') !== undefined
      ? JSON.parse(localStorage.getItem('franchiseInfo') || 'null')
      : null
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const {
    fileInputRef,
    scrollTriggerRef,
    inputValue,
    selectedImages,
    isSubmitting,
    messageList,
    setInputValue,
    handleSendMessage,
    handleDeleteMessage,
    handleSendPush,
    handleImageSelect,
    handleImageRemove,
    handleImageButtonClick,
    loadMoreMessages,
    hasNextPage,
    isFetchingNextPage,
  } = useSignalHandler()

  return (
    <Layout>
      <Layout.Header sticky>
        {franchiseInfo?.ui?.logo_image ? (
          <img
            src={franchiseInfo?.ui?.logo_image}
            alt='Logo'
            className='h-10 w-auto'
          />
        ) : null}
        <div className='ml-auto flex items-center space-x-4'>
          <Button onClick={() => setSteps(brandTalkSteps)}>
            <AlertCircle className='mr-1 h-4 w-4' />
            시작하기
          </Button>
          <UserNav userInfo={userInfo} />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='to-muted/30 relative flex h-[calc(100vh-120px)] w-full flex-col bg-gradient-to-br from-background via-background'>
          <SignalHeader />
          <div className='flex-1 overflow-hidden'>
            <ChatMessageList
              onLoadMore={loadMoreMessages}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              scrollTriggerRef={scrollTriggerRef}
            >
              {messageList
                .slice()
                .reverse()
                .map((chat) => (
                  <SignalMessage
                    key={chat.id}
                    chat={chat}
                    onDelete={handleDeleteMessage}
                    onSendPush={handleSendPush}
                  />
                ))}
            </ChatMessageList>
          </div>
          <InputForm
            inputValue={inputValue}
            selectedImages={selectedImages}
            isSubmitting={isSubmitting}
            fileInputRef={fileInputRef}
            onInputChange={setInputValue}
            onSubmit={handleSendMessage}
            onImageSelect={handleImageSelect}
            onImageRemove={handleImageRemove}
            onImageButtonClick={handleImageButtonClick}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}
