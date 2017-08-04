<h1 align="center">redux-logdown.js</h1>

<div align="center">
<img src="http://travis-ci.org/caiogondim/logdown.js.svg?branch=master" alt="Travis CI"> <img src="http://img.badgesize.io/caiogondim/logdown.js/master/dist/logdown.min.js?compression=gzip" alt="lib size"> <img src="https://codecov.io/gh/caiogondim/logdown.js/branch/master/graph/badge.svg" alt="codecov"> <a href="https://www.npmjs.com/package/logdown"><img src="https://img.shields.io/npm/v/logdown.svg" /></a>
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

<img src="http://rawgit.com/caiogondim/redux-logdown.js/master/img/preview.svg">

## Usage

```js
const reduxLogdown = require('redux-logdown')

// ...

const middleware = reduxLogdown('lorem')
const store = createStore(const middleware = reduxLogdown('store', { diff: true }))
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
