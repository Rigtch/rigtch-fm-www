export interface AvailableDevicesQuery {
  availableDevices: Device[]
}

export interface Device {
  id: string
  name: string
  type: string
  isActive: boolean
  isPrivateSession: boolean
  volumePercent: number
}
