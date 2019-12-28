const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (data) => ({
  type: 'SET_FILTER',
  data
})

export default filterReducer
