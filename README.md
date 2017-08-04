<h1 align="center">redux-logdown.js</h1>

<div align="center">
<a href="https://www.npmjs.com/package/redux-logdown"><img src="https://img.shields.io/npm/v/redux-logdown.svg" /></a>
</div>

<br>

`redux-logdown` is a tiny logger library for [Redux](https://redux.js.org/) written with
[logdown](https://github.com/caiogondim/logdown.js) that supports `localStorage.debug` for
enabling/disabling store logging.

## Installation

```bash
$ npm install --save redux-logdown
```

## Preview

<img src="http://rawgit.com/caiogondim/redux-logdown.js/master/img/preview.png">

## Usage

```js
const redux = require('redux')
const reduxLogdown = require('redux-logdown')

// ...

const middleware = reduxLogdown('loremStore', { diff: true })
const store = redux.createStore(
  reducer,
  undefined,
  redux.applyMiddleware(middleware)
)
```

### Enabling/disabling

Same rules for enabling/disabling as [logdown.js](https://github.com/caiogondim/logdown.js#enablingdisabling-instances).

### Options

#### `diff`
- Default: `false`

Enable/disable logging of previous and current state after each action.

## FAQ

### Why not using `redux-logger`?

`redux-logger` don't support `localStorage.debug` out of the box, which is the standard way to
disble/enable debugging modules in the JavaScript ecosystem. So I decided to create a Redux logger
that supports `localStorage.debug`, just like logdown and debug does.


---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
