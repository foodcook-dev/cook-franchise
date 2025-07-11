import { Layout } from '@/components/custom/layout'
import FranchiseSelect from '@/components/common/FranchiseSelect'
import { UserNav } from '@/components/user-nav'
import SignalHeader from './components/signal-header'
import { ChatMessageList } from '@/components/chat/chat-message-list'
import SignalMessage from './components/signal-message'
import signalMessages from '@/data/signal-messages.json'
import InputForm from './components/input-form'
import { useSignalHandler } from './hooks/useSignalHandler'

export default function SignalChat() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const {
    fileInputRef,
    // scrollTriggerRef,
    inputValue,
    selectedImages,
    isSubmitting,
    // messageList,
    setInputValue,
    handleSendMessage,
    handleDeleteMessage,
    handleImageSelect,
    handleImageRemove,
    handleImageButtonClick,
    // loadMoreMessages,
    // hasNextPage,
    // isFetchingNextPage,
  } = useSignalHandler()

  return (
    <Layout>
      <Layout.Header sticky>
        <FranchiseSelect storeShow={false} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          {/* <ThemeSwitch /> */}

          <UserNav userInfo={userInfo} />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='relative flex h-[calc(100vh-120px)] w-full flex-col'>
          <SignalHeader />
          <div className='flex-1 overflow-hidden'>
            <ChatMessageList
            // onLoadMore={loadMoreMessages}
            // hasNextPage={hasNextPage}
            // isFetchingNextPage={isFetchingNextPage}
            // scrollTriggerRef={scrollTriggerRef}
            >
              {signalMessages
                .slice()
                .reverse()
                .map((chat) => (
                  <SignalMessage
                    key={chat.id}
                    chat={chat}
                    onDelete={handleDeleteMessage}
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
