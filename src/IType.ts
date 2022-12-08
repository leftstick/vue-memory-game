import type { ALL_CARD_NAMES, IStatus } from './constants'

export type ICardName = typeof ALL_CARD_NAMES[number]

export interface ICard {
  id: string
  flipped: boolean
  name: ICardName
}

export interface IState {
  nonMatchedPairs: number
  highestRecord: number
  status: IStatus
  cards: ICard[]
  timeCost: number
}
