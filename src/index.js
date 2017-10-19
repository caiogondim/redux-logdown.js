const logdown = require('logdown')

const reduxLogdown = (name, opts = {}) => {
  const logger = opts.logger || logdown(name)
  const prevLogger = opts.logger || logdown('prev state', { prefixColor: '#999999' })
  const actionLogger = opts.logger || logdown('action', { prefixColor: '#FFCC66' })
  const nextLogger = opts.logger || logdown('next state', { prefixColor: '#6699CC' })
  prevLogger.state = actionLogger.state = nextLogger.state = logger.state
  let prevState
  let recursionLevel = -1
  let accumulator = []

  return store => next => action => {
    ++recursionLevel
    accumulator[recursionLevel] = []

    if (!logger.state.isEnabled) {
      return next(action)
    }

    prevState = store.getState()

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => logger.groupCollapsed('*action* `' + action.type + '`'))
    } else {
      accumulator[recursionLevel].push(() => logger.log('*action* `' + action.type + '`'))
    }

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => prevLogger.log(prevState))
      accumulator[recursionLevel].push(() => actionLogger.log(action))
    }

    let result = next(action)

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => nextLogger.log(store.getState()))
      accumulator[recursionLevel].push(() => logger.groupEnd('*action* `' + action.type + '`'))
    }

    if (recursionLevel === 0) {
      for (let i = 0; i < accumulator.length; ++i) {
        accumulator[i].forEach(thunk => thunk())
      }
      accumulator = []
    }

    --recursionLevel

    return result
  }
}

module.exports = reduxLogdown
