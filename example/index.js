const redux = require('redux')
const reduxLogdown = require('../src')

const reducer = (state = {}, action) => {
  return action.payload;
}

const store = redux.createStore(reducer, undefined, redux.applyMiddleware(reduxLogdown('store')))

store.dispatch({ type: 'LOREM', payload: {a: 1, b: 2}})
store.dispatch({ type: 'IPSUM', payload: {a: 2, b: 3}})
