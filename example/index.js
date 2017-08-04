const redux = require('redux')
const reduxLogdown = require('../src')

const reducer = (state = {}, action) => {
  return action.payload
}

const middleware = reduxLogdown('store', { diff: true })

const store = redux.createStore(
  reducer,
  undefined,
  redux.applyMiddleware(middleware)
)

store.dispatch({ type: 'LOREM', payload: { a: 1, b: 2 } })
store.dispatch({ type: 'IPSUM', payload: { c: 2, d: 3 } })
store.dispatch({ type: 'DOLOR', payload: { e: true } })
