const STORAGE_KEY = 'state'

export const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    return serialized !== null ? JSON.parse(serialized) : undefined
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (err) {
    // ignore
  }
}
