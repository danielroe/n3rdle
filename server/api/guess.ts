import { createError, defineEventHandler, getCookie, setCookie, readBody } from 'h3'
import MemoryDriver from 'unstorage/drivers/memory'

// @ts-expect-error invalid types
import wordList from 'wordlist-english/index.js'

const validWords = wordList['english/10'].filter(word => word.length === 5)

const storage = useStorage()
storage.mount('', MemoryDriver())

const decode = (state = '[]'): GameState => JSON.parse(state)
const encode = (state: GameState): string => JSON.stringify(state)

export default defineEventHandler(async (event) => {
  const guess = (await readBody(event)).guess?.toLowerCase()
  const state: GameState = decode(getCookie(event, 'state'))

  if (!guess || guess.length !== 5) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid guess, 5 letter words only',
    })
  }

  if (!validWords.includes(guess)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid guess, word not in word list',
    })
  }

  if (state.some(([word]) => word === guess)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid guess, word already guessed',
    })
  }

  const day = new Date().toISOString().slice(0, 10)
  const word: string =
    (await storage.getItem(day)) ||
    validWords[Math.floor(Math.random() * validWords.length)]

  await storage.setItem(day, word)

  state.push([guess, generateHint(word, guess)])
  setCookie(event, 'state', encode(state), {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: false,
    secure: false,
  })

  return state
})

function generateHint(word: string, guess: string): string {
  const source: Array<string | null> = [...word]
  return [...guess]
    .map((letter, i) => {
      if (letter === word[i]) {
        source[i] = null
        return true
      }
      return false
    })
    .map((exact, i) => {
      if (exact) return '2'
      if (source.includes(guess[i])) return '1'
      return '0'
    })
    .join('')
}
