const logdown = require('logdown')

const reduxLogdown = (name, opts = {}) => {
  const logger = logdown(name)
  let prevState = undefined

  return store => next => action => {
    prevState = store.getState()

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.groupCollapsed('**action** `' + action.type + '`')
    } else {
      logger.log('**action** `' + action.type + '`')
    }

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.log('**prev state**', prevState)
    }

    let result = next(action)

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.log('**next state**', store.getState())
      logger.groupEnd('**action** `' + action.type + '`')
    }

    return result
  }
}

module.exports = reduxLogdown
