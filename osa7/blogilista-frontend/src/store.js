import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import { loadState, saveState } from './storage'

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer
})

const persistedState = loadState()

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => {
  saveState({
    login: store.getState().login
  })
})

export default store
