export interface Device {
  id: string
  name: string
  type: string
  isActive: boolean
  isRestricted: boolean
  isPrivateSession: boolean
  volumePercent: number
}
