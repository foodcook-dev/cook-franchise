import { useState, useRef, useCallback, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import createAxios from '../private/libs/create-axios-instance'
import useAppStore from '@/stores/store'
import useFetch from '../private/hooks/useFetch'
import { SelectedImage, ChatResponse } from '../types'
import { CHAT_CONSTANTS } from '../data'
import { validateImageFile } from '../utils'
import { useConfirm } from '@/hooks/useConfirm'

export const useSignalHandler = () => {
  const setConfirm = useConfirm()

  const selectedFranchise = useAppStore((state) => state.selectedFranchise)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollTriggerRef = useRef<() => void>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    setInputValue('')
    setSelectedImages([])
  }, [selectedFranchise])

  const signalResponse = useInfiniteQuery<ChatResponse>({
    queryKey: ['signal', selectedFranchise?.id],
    queryFn: ({ pageParam = 1 }) =>
      createAxios({
        method: 'get',
        endpoint: `/franchise/brand-talks/admin/`,
        params: {
          franchise_id: selectedFranchise?.id,
          page: pageParam as number,
          page_size: 10,
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) return pages.length + 1
      return undefined
    },
    initialPageParam: 1,
  })

  const useSendChat = () => {
    const { request } = useFetch<any, FormData>({
      requestFn: (params) => {
        return createAxios({
          method: 'post',
          endpoint: `/franchise/brand-talks/create/`,
          body: params,
        })
      },
    })
    return request
  }
  const sendChatRequest = useSendChat()

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedInput = inputValue.trim()
    if (!trimmedInput && selectedImages.length === 0) return

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('franchise_id', selectedFranchise?.id || '')
    if (trimmedInput) formData.append('message', trimmedInput)

    try {
      for (let i = 0; i < selectedImages.length; i++) {
        const image = selectedImages[i]
        try {
          const response = await fetch(image.url)
          const blob = await response.blob()
          const file = new File([blob], image.name, { type: blob.type })
          formData.append(`images`, file)
        } catch (error) {
          console.error(`이미지 ${image.name} 처리 실패:`, error)
        }
      }

      await sendChatRequest(formData)

      setInputValue('')
      setSelectedImages([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      await signalResponse.refetch()

      setTimeout(() => {
        scrollTriggerRef.current?.()
      }, 100)
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const { request: deleteChatRequest } = useFetch({
    requestFn: async (chat_id: number) => {
      return await createAxios({
        method: 'delete',
        endpoint: `/franchise/brand-talks/admin/${chat_id}/delete/`,
      })
    },
    onSuccess: () => signalResponse.refetch(),
  })

  const handleDeleteMessage = async (id: string) => {
    const result = await setConfirm({ message: '메세지를 삭제하시겠습니까?' })
    if (result) await deleteChatRequest(Number(id))
  }

  const { request: sendPushRequest } = useFetch({
    requestFn: async (chat_id: number) => {
      return await createAxios({
        method: 'post',
        endpoint: `/franchise/brand-talks/admin/${chat_id}/push/`,
      })
    },
    onSuccess: () => signalResponse.refetch(),
  })

  const handleSendPush = async (id: string) => {
    const result = await setConfirm({ message: '푸시알림을 발송하시겠습니까?' })
    if (result) await sendPushRequest(Number(id))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)

      if (
        selectedImages.length + fileArray.length >
        CHAT_CONSTANTS.MAX_IMAGES
      ) {
        alert(
          `이미지는 최대 ${CHAT_CONSTANTS.MAX_IMAGES}개까지 첨부할 수 있습니다.`
        )
        return
      }

      fileArray.forEach((file) => {
        const validationError = validateImageFile(file)
        if (validationError) {
          alert(validationError)
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            setSelectedImages((prev) => [
              ...prev,
              {
                url: result,
                name: file.name,
              },
            ])
          }
        }
        reader.onerror = () => {
          alert(`${file.name} 파일 읽기에 실패했습니다.`)
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleImageRemove = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageButtonClick = () => {
    fileInputRef.current?.click()
  }

  const loadMoreMessages = useCallback(() => {
    if (signalResponse.hasNextPage && !signalResponse.isFetchingNextPage) {
      signalResponse.fetchNextPage()
    }
  }, [signalResponse])

  const messageList =
    signalResponse.data?.pages.flatMap((page) => page.results) || []

  return {
    fileInputRef,
    scrollTriggerRef,
    messageList,
    inputValue,
    selectedImages,
    isSubmitting,
    setInputValue,
    handleSendMessage,
    handleDeleteMessage,
    handleSendPush,
    handleImageSelect,
    handleImageRemove,
    handleImageButtonClick,
    loadMoreMessages,
    hasNextPage: signalResponse.hasNextPage,
    isFetchingNextPage: signalResponse.isFetchingNextPage,
  }
}
