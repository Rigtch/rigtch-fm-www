export interface IdParam {
  id: string
}

export type ParamsWithId = IdParam & Record<string, string>
