import { classNames } from 'primereact/utils'

export interface AudioBarsProps {
  isPlaying: boolean
}

export function AudioBars({ isPlaying = false }: AudioBarsProps) {
  return (
    <div className={classNames('audio-container', isPlaying && 'play')}>
      <span className="bar bar_one"></span>
      <span className="bar bar_two"></span>
      <span className="bar bar_three"></span>
      <span className="bar bar_four"></span>
    </div>
  )
}
