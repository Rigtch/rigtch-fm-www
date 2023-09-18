import { ItemCardColor } from './item-card-color'
import { ItemCardSize } from './item-card-size'

export interface ItemCardBaseProps {
  position?: number
  showGenres?: boolean
  color?: ItemCardColor
  size?: ItemCardSize
}
