import { ALL_CARD_NAMES, ICard } from '@/IType'

function id(length: number) {
  const result = []
  const characters = 'abcdefghijklmnopqrstuvwxyz_=+'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

export function getHighestRecord(): number {
  const savedTopScore = localStorage.getItem('highestRecord')
  if (savedTopScore) {
    return +savedTopScore
  }
  return 9999
}

export function saveHighestRecord(score: number): void {
  const savedTopScore = localStorage.getItem('highestRecord')
  if (!savedTopScore) {
    return localStorage.setItem('highestRecord', `${score}`)
  }
  if (+savedTopScore > score) {
    return localStorage.setItem('highestRecord', `${score}`)
  }
}

export function shuffleAllCards(): ICard[] {
  let newCards: ICard[] = [...ALL_CARD_NAMES, ...ALL_CARD_NAMES].map(name => ({
    id: id(8),
    flipped: false,
    name
  }))

  for (let i = newCards.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i)
    const x = newCards[i - 1]
    newCards[i - 1] = newCards[j]
    newCards[j] = x
  }
  return newCards
}
