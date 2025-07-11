// @hidden
export default function MessageLoading() {
  return (
    <div className='flex items-center space-x-1 py-1'>
      <div className='flex space-x-1'>
        <div className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]'></div>
        <div className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]'></div>
        <div className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground'></div>
      </div>
      <span className='ml-2 text-xs text-muted-foreground'>
        AI가 답변을 작성 중입니다
      </span>
    </div>
  )
}
