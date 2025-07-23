import Joyride, {
  TooltipRenderProps,
  ACTIONS,
  CallBackProps,
} from 'react-joyride'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import useGuideStore from '@/stores/guide'
import { Button } from './custom/button'

export interface CustomTooltipProps extends TooltipRenderProps {
  step: TooltipRenderProps['step'] & {
    image?: string
  }
}

function CustomTooltip(props: CustomTooltipProps) {
  const {
    backProps,
    // closeProps,
    continuous,
    isLastStep,
    index,
    size,
    primaryProps,
    skipProps,
    step,
    tooltipProps,
  } = props

  return (
    <div
      {...tooltipProps}
      className='animate-fade-in relative flex min-w-[400px] flex-col gap-4 rounded-xl bg-[#23272f] px-6 py-6 text-white shadow-2xl'
    >
      {/* <Button
        className='absolute right-3 top-3 flex h-7 w-7 items-center justify-center bg-transparent p-0 text-lg text-gray-400 transition-colors hover:text-white'
        {...closeProps}
      >
        &times;
      </Button> */}
      <div className='flex items-center justify-center'>
        <span className='text-xs text-gray-400'>{`${index + 1} / ${size}`}</span>
      </div>
      {step.title && (
        <h4 className='text-base font-semibold tracking-tight'>{step.title}</h4>
      )}
      {step.image && (
        <img className='h-auto max-w-[400px] rounded' src={step.image} />
      )}
      <div className='tooltip__content whitespace-pre-line text-sm leading-relaxed'>
        {step.content}
      </div>
      <div className='mt-2 flex flex-row items-center justify-between gap-2'>
        <Button
          className='rounded-md border border-gray-600 bg-gray-700 px-3 py-1 text-xs text-gray-200 transition-colors hover:bg-gray-600'
          {...skipProps}
        >
          SKIP
        </Button>

        <div className='flex flex-row gap-2'>
          {index > 0 && (
            <Button className='px-3 text-xs font-semibold' {...backProps}>
              <ArrowLeft className='inline h-4 w-4' />
            </Button>
          )}
          {continuous && (
            <Button className='px-3 text-xs font-semibold' {...primaryProps}>
              {!isLastStep ? (
                <ArrowRight className='inline h-4 w-4' />
              ) : (
                <Check className='inline h-4 w-4' />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Guide() {
  const { run, steps, resetSteps } = useGuideStore()

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action } = data
    if (action === ACTIONS.RESET) resetSteps()
  }

  return (
    <Joyride
      run={run}
      steps={steps}
      tooltipComponent={CustomTooltip}
      callback={handleJoyrideCallback}
      continuous
      showSkipButton
      disableOverlayClose
      disableScrolling
      styles={{
        options: {
          arrowColor: '#23272f',
        },
      }}
    />
  )
}
