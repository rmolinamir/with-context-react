# `with-context-react`

> A much easier way to access a context from within a class component (and functional components too) by using the new `useContext` API behind the scenes.

[![NPM](https://img.shields.io/npm/v/with-context-react.svg)](https://www.npmjs.com/package/with-context-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Why use it

Accessing a React context from within a class component is often times very dull and annoying, especially when trying to use multiple context and providers. This package simplifies the proccess by simply wrapping your component with a function defined as `withContext(...)`, or wrapping your JSX Element Constructors (classes) inside another component defined as `<WithContext ... />`, while only having to pass the context as an argument or prop, respectively. **The context will be sent as a prop defined as `_context` (e.g. `this.props._context`)** - **keep in mind you need to have a context provider present somewhere within your application wrapping these elements**, it is also possible to pass a provider as an argument to `withContext` or as a prop to `<WithContext />`.

You may also pass a context provider and save yourself some time spent wrapping your app or other components as well, but keep in mind that this will create a new scope for that context - which might be beneficial or detrimental depending on the scenario. Either way, I suggest taking a look at the code snippets more more information about this.

If the intention is **to pass multiple contexts (and providers)**, then you may do so by using the export `withContexts(...)` which works similarly to how `withContext` works while supporting multiple contexts and providers. Similarly, `<WithContexts ... />` is a component that passes down the contexts to all wrapped constructors as props (within the first scope level), while also setting up every passed provider as higher order component (HOC), if any.

---

## Install

```bash
npm install --save with-context-react
```

---

## [Showcase](https://www.robertmolina.dev/codelab/with-context-react)

[![Edit with-context-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/o96ljrvjpq?fontsize=14)

---

## Usage

We'll use a package called **[`react-png-button`](https://www.npmjs.com/package/react-png-button)** which includes a React context and a provider to showcase how both `withContext` and `<WithContext />` can come into play. **I suggest checking out the showcase referenced above and also looking at the react dev tools to see how the providers are rendered**.

We can also pass multiple contexts and providers by using `withContexts` and `<WithContexts />`, both of these work similarly to their respective counterparts mentioned above. To do this, I have done a context that changes the class of the `<body>` HTML element, from a dark theme to a light theme and vice versa, [here's the source code for that context](https://github.com/rmolinamir/with-context-react/blob/master/example/src/themeContext.js).

---

### Using `withContext` to wrap a single class (or functional) component

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

---

### Using `withContext` to wrap a single class (or functional) component while also passing a React context provider

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

---

### `<WithContext context={Context} />` - JSX Element

`<WithContext context={Context} />` works just like `withContext`, since no provider was passed to `WithContext` as a prop, then it will fallback to the previously mentioned "global" provider's context. **All the top level components will receive the context as a prop defined as `_context`, on top of receiving their respective props without any side-effects**.

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

---

### `<WithContext context={Context} provider={Provider} />` - JSX Element with a Provider

Finally just like before, `<WithContext context={Context} provider={Provider} />` works just like `withContext` when a provider was passed as an argument, except this time it will be a prop.

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
// CSS
import classes from './exampleClasses.module.css'
// JSX
import Button from 'react-png-button'

export default class ClassfulComponent extends Component {
  static propTypes = {
    title: propTypes.string,
    _context: propTypes.object
  }

  initialButtonClass = this.props._context.className

  setStyle = () => {
    this.props._context.setStyle({
      padding: '8px',
      textTransform: 'uppercase',
      borderRadius: 'none',
      backgroundColor: 'mediumaquamarine',
      color: 'white'
    })
    this.props._context.setGlobalClassName(classes.Button)
  }

  resetStyle = () => {
    this.props._context.setStyle(undefined)
    this.props._context.setGlobalClassName(this.initialButtonClass)
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

---

### `withContexts(WrappedComponent, {...Contexts}, [...Providers])` - Functional wrapper for multiple Contexts & Providers

By using `withContext` we can **set up multiple contexts and providers in one go**, by passing them as arguments.
The argument Contexts has to be an object (example of the structure below), where the object keys will define the name of the props passed down and the values must be the respective contexts, whereas the Providers **may** be an array containing all of the respective providers.

As before, any functionality will only work within that provider's context scope.

**Structure of the `Contexts` object passed as an argument to `withContexts`**:

```ts
interface IContexts {
  [propName: string]: React.Context<any>
}

// e.g.


```

**`withContexts(WrappedComponent, {...Contexts}, [...Providers])`**:

```jsx
import React, { Component } from 'react'
import propTypes from 'prop-types'
// JSX
import { withContexts } from 'with-context-react'
import ThemeProvider, { Context as ThemeContext } from '../themeContext'
import Button, { Context, Provider } from 'react-png-button'

class App extends Component {
  static propTypes = {
    buttonContext: propTypes.object,
    themeContext: propTypes.object
  }

  setTheme = () => {
    this.props.themeContext.setTheme()
  }

  setStyle = () => {
    this.props.buttonContext.setStyle({ padding: '8px', textTransform: 'uppercase', borderRadius: 'none', backgroundColor: 'goldenrod' })
  }

  resetStyle = () => {
    this.props.buttonContext.setStyle(undefined)
  }

  render () {
    console.log('inside withContexts.js', this.props)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <Button onClick={this.setStyle}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetStyle}>Back to normal!</Button>
        <br />
        <Button onClick={this.setTheme}>Change the page themes from dark to light or vice versa!</Button>
      </div>
    )
  }
}

export default withContexts(App, { buttonContext: Context, themeContext: ThemeContext }, [Provider, ThemeProvider])
```

---

### `<WithContexts contexts={{...Contexts}} providers={[...Providers]} />` - JSX Element with multiple Contexts & Providers

By using `<WithContexts contexts={{ ...Context }} providers={[ ...Provider ]} /`>, we can set up multiple contexts with their respective providers (if passed) similarly to withContexts, the difference is that `WithContext` will pass down the context as a prop defined by the respective key of the context object (structure above) to all of the top level components.

```jsx
import React, { Component } from 'react'
// JSX
import { WithContexts } from 'with-context-react'
import { Context as ButtonContext, Provider as ButtonProvider } from 'react-png-button'
import ThemeProvider, { Context as ThemeContext } from '../themeContext'
import ClassComponent from './ClassComponent_WithContexts'

class App extends Component {
  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <WithContexts
          providers={[ButtonProvider, ThemeProvider]}
          contexts={{ buttonContext: ButtonContext, themeContext: ThemeContext }}>
          <ClassComponent title={'First Class Component (while using WithContexts)'} />
          <ClassComponent title={'Second Class Component (while using WithContexts)'} />
        </WithContexts>
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

export default class App extends Component {
  static propTypes = {
    title: propTypes.string,
    buttonContext: propTypes.object,
    themeContext: propTypes.object
  }

  setTheme = () => {
    this.props.themeContext.setTheme()
  }

  setStyle = () => {
    this.props.buttonContext.setStyle({
      padding: '8px',
      textTransform: 'uppercase',
      borderRadius: 'none',
      backgroundColor: 'lightblue',
      color: '#484848'
    })
  }

  resetStyle = () => {
    this.props.buttonContext.setStyle(undefined)
  }

  render () {
    console.log('inside WithContexts.js', this.props)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <h3>{this.props.title}</h3>
        <Button onClick={this.setStyle}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetStyle}>Back to normal!</Button>
        <br />
        <Button onClick={this.setTheme}>Change the page themes from dark to light or vice versa!</Button>
      </div>
    )
  }
}
```

## License

MIT © [rmolinamir](https://github.com/rmolinamir)
