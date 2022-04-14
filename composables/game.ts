const decode = (state = '[]'): GameState => JSON.parse(state)
const encode = (state: GameState): string => JSON.stringify(state)

export const useGameState = () => {
  const router = useRouter()
  const error = ref('')

  const state = useCookie<GameState>('state', {
    encode,
    decode,
    default: () => [],
  })

  async function submitGuess(guess: string) {
    error.value = ''
    try {
      state.value = await $fetch('/api/guess', {
        method: 'POST',
        body: { guess },
      })
    } catch (e) {
      error.value = (e.message || e.toString())
        .replace(' (/api/guess)', '')
        .replace('422 ', '')
        .replace('FetchError: ', '')
    }
  }

  function resetGame() {
    state.value = []
    router.push('/')
  }

  return { state, error, submitGuess, resetGame }
}
