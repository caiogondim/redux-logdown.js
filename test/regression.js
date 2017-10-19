/* eslint-env jest */

const redux = require('redux')
const reduxLogdown = require('../src')

const reducer = (state = {}, action) => {
  return Object.assign({}, action.payload)
}

it('shouldnt group groups into groups', (done) => {
  const calls = []
  const mockLogger = {
    log: () => calls.push('log'),
    groupCollapsed: () => calls.push('groupCollapsed'),
    groupEnd: () => calls.push('groupEnd'),
    state: {
      isEnabled: true
    }
  }

  const logger = reduxLogdown('test', {
    diff: true,
    logger: mockLogger
  })

  const store = redux.createStore(reducer, redux.applyMiddleware(logger))

  store.subscribe(() => {
    if (store.getState().count === 2) {
      setTimeout(() => {
        try {
          expect(calls).toEqual([
            'groupCollapsed',
            'log',
            'log',
            'log',
            'groupEnd',
            'groupCollapsed',
            'log',
            'log',
            'log',
            'groupEnd'
          ])
          done()
        } catch (error) {
          done(error)
        }
      }, 0)

      return
    }

    store.dispatch({
      type: 'LOREM',
      payload: {
        count: store.getState().count + 1
      }
    })
  })

  store.dispatch({
    type: 'LOREM',
    payload: {
      count: 1
    }
  })
})
