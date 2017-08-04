const logdown = require('logdown')

const reduxLogdown = (name, opts = {}) => {
  const logger = logdown(name)
  const prevLogger = logdown('prev state', { prefixColor: '#999999' })
  const actionLogger = logdown('action', { prefixColor: '#6699CC' })
  const nextLogger = logdown('next state', { prefixColor: '#99CC99' })
  prevLogger.state = actionLogger.state = nextLogger.state = logger.state
  let prevState

  return store => next => action => {
    if (!logger.state.isEnabled) {
      return next(action)
    }

    prevState = store.getState()

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.groupCollapsed('*action* `' + action.type + '`')
    } else {
      logger.log('*action* `' + action.type + '`')
    }

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      prevLogger.log(prevState)
      actionLogger.log(action)
    }

    let result = next(action)

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      nextLogger.log(store.getState())
      logger.groupEnd('*action* `' + action.type + '`')
    }

    return result
  }
}

module.exports = reduxLogdown
