import clsx from 'clsx'

export interface AudioBarsProps {
  isPlaying: boolean
}

export function AudioBars({ isPlaying = false }: AudioBarsProps) {
  return (
    <div className={clsx('audio-container', isPlaying && 'play')}>
      <span className="bar bar-one"></span>
      <span className="bar bar-two"></span>
      <span className="bar bar-three"></span>
      <span className="bar bar-four"></span>
    </div>
  )
}
