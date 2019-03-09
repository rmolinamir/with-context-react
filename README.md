# `with-context-react`

> A much easier way to access a context from within a class component (and functional components too) by using the new `useContext` API behind the scenes.

[![NPM](https://img.shields.io/npm/v/with-context-react.svg)](https://www.npmjs.com/package/with-context-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Why use it

Accessing a React context from within a class component is often times very dull and annoying. This package simplifies the proccess by simply wrapping your component with a function defined as `withRouter(...)`, or wrapping your JSX Element Constructors (classes) inside `<WithRouter ... />` while only having to pass the context as an argument or prop, respectively. **The context will be received as a prop defined as `_context` (e.g. `this.props._context`)**.

You can also pass your context providers and save yourself some time spent wrapping your app or other components too, but keep in mind this will create a new scope for that context which might be beneficial or detrimental depending on the scenario. Either way, I suggest taking a look at the code snippets.

## Install

```bash
npm install --save with-context-react
```

## CodeSandbox Showcase

### [Showcase](https://o96ljrvjpq.codesandbox.io/)

[![Edit with-context-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/o96ljrvjpq?fontsize=14)

## Usage

We'll use a package called **[`react-png-button`](https://www.npmjs.com/package/react-png-button)** which includes a React context and a provider to showcase how both `withRouter` and `<WithRouter />` can come into play:

### Using `withRouter` to wrap a single class (or functional) component

Let's assume there is a provider wrapping the whole application, since no provider will be passed to `withContext` as an argument, then it will fallback to the previously mentioned "global" provider's context scope.

**`withContext(WrappedComponent, Context)`**:

```jsx
import React, { Component } from 'react'
import propTypes from 'prop-types'
// JSX
import { withContext } from 'with-context-react'
import Button, { Context } from 'react-png-button'

class App extends Component {
  static propTypes = {
    _context: propTypes.object
  }

  accessContextMethods = () => {
    this.props._context.setStyle({
      padding: '8px',
      textTransform: 'uppercase',
      borderRadius: 'none',
      backgroundColor: 'goldenrod'
    })
  }

  render () {
    console.log(this.props._context)
    return (
      <div>
        <div style={{ margin: '12px 0' }}>Open your dev-tools console log!</div>
        <Button onClick={this.accessContextMethods}>Click to change styles!</Button>
      </div>
    )
  }
}

export default withContext(App, Context)
```

### Using `withRouter` to wrap a single class (or functional) component while also passing a React context provider

In this example we pass a `Provider` to `withContext` as an argument, as well as the context of course, then said context and any functionality will only work within that provider's context scope.

**`withContext(WrappedComponent, Context, Provider)`**:

```jsx
import React, { Component } from 'react'
import propTypes from 'prop-types'
// CSS
import classes from './exampleClasses.module.css'
// JSX
import { withContext } from 'with-context-react'
import Button, { Context, Provider } from 'react-png-button'

class App extends Component {
  static propTypes = {
    _context: propTypes.object
  }

  initialButtonClass = this.props._context.className

  setClass = () => {
    this.props._context.setGlobalClassName(classes.Button)
  }

  resetClass = () => {
    this.props._context.setGlobalClassName(this.initialButtonClass)
  }

  render () {
    console.log(this.props._context)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <div style={{ margin: '12px 0' }}>Open your dev-tools console log!</div>
        <Button onClick={this.setClass}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetClass}>Back to normal!</Button>
      </div>
    )
  }
}

export default withContext(App, Context, Provider)
```

### `<WithContext context={Context} />` - JSX Element

`<WithContext context={Context} />` works just like `withRouter`, since no provider was passed to `WithContext` as a prop, then it will fallback to the previously mentioned "global" provider's context. **All the top level components will receive the context as a prop defined as `_context`, on top of receiving their respective props without any side-effects**.

**`<WithContext context={Context} />`**:

```jsx
import React, { Component } from 'react'
// JSX
import { WithContext } from 'with-context-react'
import { Context } from 'react-png-button'
import ClassComponent from './ClassComponent'

class App extends Component {
  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <div style={{ margin: '12px 0' }}>Open your dev-tools console log!</div>
        <WithContext context={Context}>
          <ClassComponent title={'First Class Component!'} />
          <ClassComponent title={'Second Class Component!'} />
        </WithContext>
      </div>
    )
  }
}

export default App

/**
* ----------------------------
* -------ClassComponent-------
* ----------------------------
*/

import React, { Component } from 'react'
import propTypes from 'prop-types'
// JSX
import Button from 'react-png-button'

export default class ClassfulComponent extends Component {
  static propTypes = {
    title: propTypes.string,
    _context: propTypes.object
  }

  setStyle = () => {
    this.props._context.setStyle({
      padding: '8px',
      textTransform: 'uppercase',
      borderRadius: 'none',
      backgroundColor: 'indigo',
      color: 'white'
    })
  }

  resetStyle = () => {
    this.props._context.setStyle(undefined)
  }

  render () {
    console.log(this.props)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <h3>{this.props.title}</h3>
        <Button onClick={this.setStyle}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetStyle}>Back to normal!</Button>
      </div>
    )
  }
}
```

### `<WithContext context={Context} provider={Provider} />` - JSX Element with a Provider

Finally just like before, `<WithContext context={Context} provider={Provider} />` works just like `withRouter` when a provider was passed as an argument, except this time it will be a prop.

Any functionality will only work within that provider's context scope. **All the top level components will receive the context as a prop defined as `_context`, on top of receiving their respective props without any side-effects**.

**`<WithContext context={Context} provider={Provider} />`**:

```jsx
import React, { Component } from 'react'
// JSX
import { WithContext } from 'with-context-react'
import { Context, Provider } from 'react-png-button'
import ClassComponent from './ClassComponent_WithProvider'

class App extends Component {
  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <div style={{ margin: '12px 0' }}>Open your dev-tools console log!</div>
        <WithContext context={Context} provider={Provider}>
          <ClassComponent title={'First Class Component!'} />
          <ClassComponent title={'Second Class Component!'} />
        </WithContext>
      </div>
    )
  }
}

export default App

/**
* ----------------------------
* -------ClassComponent-------
* ----------------------------
*/

import React, { Component } from 'react'
import propTypes from 'prop-types'
// JSX
import Button from 'react-png-button'

export default class ClassfulComponent extends Component {
  static propTypes = {
    title: propTypes.string,
    _context: propTypes.object
  }

  setStyle = () => {
    this.props._context.setStyle({
      padding: '8px',
      textTransform: 'uppercase',
      borderRadius: 'none',
      backgroundColor: 'indigo',
      color: 'white'
    })
  }

  resetStyle = () => {
    this.props._context.setStyle(undefined)
  }

  render () {
    console.log(this.props)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <h3>{this.props.title}</h3>
        <Button onClick={this.setStyle}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetStyle}>Back to normal!</Button>
      </div>
    )
  }
}
```

## License

MIT © [rmolinamir](https://github.com/rmolinamir)