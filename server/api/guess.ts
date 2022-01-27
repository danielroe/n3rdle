import { createError, defineHandle, useCookie, setCookie, useBody } from 'h3'
import { storage } from '#storage'
import MemoryDriver from 'unstorage/drivers/memory'

import wordList from 'wordlist-english/index.js'
const validWords = wordList['english/10'].filter(word => word.length === 5)

storage.mount('', MemoryDriver())

const decode = (state = '[]'): GameState => JSON.parse(state)
const encode = (state: GameState): string => JSON.stringify(state)

export default defineHandle(async (req, res) => {
  const guess = (await useBody(req)).guess?.toLowerCase()

  if (!guess || guess.length !== 5) {
    return createError({
      statusCode: 422,
      message: 'Invalid guess',
    })
  }

  const day = new Date().toISOString().slice(0, 10)
  const word: string =
    (await storage.getItem(day)) ||
    validWords[Math.floor(Math.random() * validWords.length)]

  await storage.setItem(day, word)

  const state: GameState = decode(useCookie(req, 'state'))
  state.push([guess, generateHint(word, guess)])
  setCookie(res, 'state', encode(state), {
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return state
})

function generateHint(word: string, guess: string): string {
  const source = [...word]
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
