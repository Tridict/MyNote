export interface selectItems {
  name: string
}

export type goPage = (target: string) => void

export interface VantFile {
  content: string
  file: File
  message: string
  status: string
}