const decode = (state = '[]'): GameState => JSON.parse(state)
const encode = (state: GameState): string => JSON.stringify(state)

export const useGameState = () => {
  const router = useRouter()
  const error = ref(null)

  const state = useCookie<GameState>('state', {
    encode,
    decode,
    default: () => [],
  })

  async function submitGuess(guess: string) {
    try {
      state.value = await $fetch('/api/guess', {
        method: 'POST',
        body: { guess },
      })
    } catch (e) {
      error.value = e
    }
  }

  function resetGame() {
    state.value = []
    router.push('/')
  }

  return { state, error, submitGuess, resetGame }
}
