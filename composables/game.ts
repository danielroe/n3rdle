const decode = (state = '[]'): GameState => JSON.parse(state)
const encode = (state: GameState): string => JSON.stringify(state)

export const useGameState = () => {
  const router = useRouter()

  const state = useCookie<GameState>('state', {
    encode,
    decode,
    default: () => [],
  })

  async function submitGuess(guess: string) {
    state.value = await $fetch('/api/guess', {
      method: 'POST',
      body: { guess },
    })
  }

  function resetGame() {
    state.value = []
    router.push('/')
  }

  return { state, submitGuess, resetGame }
}
