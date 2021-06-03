export enum IStatus {
  READY = 'READY',
  PLAYING = 'PLAYING',
  PASSED = 'PASSED'
}

export const ALL_CARD_NAMES = [
  '8-ball',
  'kronos',
  'baked-potato',
  'dinosaur',
  'rocket',
  'skinny-unicorn',
  'that-guy',
  'zeppelin'
] as const

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
