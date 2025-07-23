import { Bell, Trash2 } from 'lucide-react'

export const brandTalkSteps = [
  {
    disableBeacon: true,
    target: '.signal-header',
    content:
      '브랜드 톡의 헤더입니다.\n메세지를 발송할 프랜차이즈를 선택할 수 있습니다.',
  },
  {
    target: '.chat-message-list',
    content:
      '메세지 목록이 나타나는 영역입니다.\n보낸 메세지를 확인할 수 있습니다.',
  },
  {
    target: '.chat-message-list',
    image: '/images/guide/default.png',
    content: (
      <span>
        보낸 메세지를 선택해서 <Bell className='inline h-3 w-4' />
        푸시알림 발송과 <Trash2 className='inline h-3 w-4' />
        삭제가 가능합니다.
      </span>
    ),
  },
  {
    target: '.chat-message-list',
    image: '/images/guide/push.png',
    content: (
      <span>
        메세지당 한번만 <Bell className='inline h-3 w-4' />
        푸시알림을 발송할 수 있습니다.
      </span>
    ),
  },
  {
    target: '.chat-message-list',
    image: '/images/guide/delete.png',
    content: (
      <span>
        <Trash2 className='inline h-3 w-4' />
        삭제된 메세지는 사용자 브랜드톡에서 숨겨지며 복구할 수 없습니다.
      </span>
    ),
  },
  {
    target: '.input-form',
    content:
      '발송할 메세지를 입력하는 영역입니다.\n이미지(최대 5개)와 메세지를 작성하고 전송할 수 있습니다.',
  },
]
