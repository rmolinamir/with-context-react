import React, { Component } from 'react'
// CSS
import classes from './App.module.css'
// JSX
import { Provider } from 'react-png-button'
import Example from './Example/Example'
import CodeSnippet from './CodeSnippet/CodeSnippet'
import EX1 from './docs/withContext/withContext'
import EX2 from './docs/withContext/withContext_WithProvider'
import EX3 from './docs/_WithContext/_WithContext'
import EX4 from './docs/_WithContext/_WithContext_WithProvider'
import EX5 from './docs/withContexts/withContexts'
import EX6 from './docs/_WithContexts/_WithContexts'

class App extends Component {
  render () {
    const ex1 = <><code className={classes.Functional}>withContext</code><code className={classes.Parenthesis}>(</code><code className={classes.Argument}>WrappedComponent</code>, <code className={classes.Argument}>Context</code><code className={classes.Parenthesis}>)</code> - Functional wrapper</>
    const ex2 = <><code className={classes.Functional}>withContext</code><code className={classes.Parenthesis}>(</code><code className={classes.Argument}>WrappedComponent</code>, <code className={classes.Argument}>Context</code>, <code className={classes.Argument}>Provider</code><code className={classes.Parenthesis}>)</code> - Functional wrapper with a Provider</>
    const ex3 = <><code className={classes.JSX}>{`<WithContext `}<code style={{ fontSize: '1em' }} className={classes.Argument}>context</code>{`={`}<code style={{ fontSize: '1em' }} className={classes.Argument}>Context</code>{`} />`}</code> - JSX Element</>
    const ex4 = <><code className={classes.JSX}>{`<WithContext `}<code style={{ fontSize: '1em' }} className={classes.Argument}>context</code>{`={`}<code style={{ fontSize: '1em' }} className={classes.Argument}>Context</code>{`} `}<code style={{ fontSize: '1em' }} className={classes.Argument}>provider</code>{`={`}<code style={{ fontSize: '1em' }} className={classes.Argument}>Provider</code>{`} /> `}</code> - JSX Element with a Provider</>
    const ex5 = <><code className={classes.Functional}>withContexts</code><code className={classes.Parenthesis}>(</code><code className={classes.Argument}>WrappedComponent</code>, <code className={classes.Argument}>{`{...Contexts}`}</code>, <code className={classes.Argument}>[...Providers]</code><code className={classes.Parenthesis}>)</code> - Functional wrapper for multiple Contexts & Providers</>
    const ex6 = <><code className={classes.JSX}>{`<WithContexts `}<code style={{ fontSize: '1em' }} className={classes.Argument}>contexts</code>{`={`}<code style={{ fontSize: '1em' }} className={classes.Argument}>{`{...Contexts}`}</code>{`} `}<code style={{ fontSize: '1em' }} className={classes.Argument}>providers</code>{`={`}<code style={{ fontSize: '1em' }} className={classes.Argument}>[...Providers]</code>{`} /> `}</code> - JSX Element with multiple Contexts & Providers</>

    return (
      <Provider>
        <div className={classes.App}>
          <h1 className={classes.Title}><code>with-context-react</code></h1>
          <h2 className={classes.Header}>Examples</h2>
          <ul className={classes.List}>
            <li className={classes.Item}><a className={classes.Anchor} href='#with-context-functional'>{ex1}</a></li>
            <li className={classes.Item}><a className={classes.Anchor} href='#with-context-functional-provider'>{ex2}</a></li>
            <li className={classes.Item}><a className={classes.Anchor} href='#with-context-jsx'>{ex3}</a></li>
            <li className={classes.Item}><a className={classes.Anchor} href='#with-context-jsx-provider'>{ex4}</a></li>
            <li className={classes.Item}><a className={classes.Anchor} href='#with-contexts'>{ex5}</a></li>
            <li className={classes.Item}><a className={classes.Anchor} href='#with-contexts-jsx'>{ex6}</a></li>
          </ul>

          <br />
          <div style={{ margin: '12px 0' }}><strong>You may also open the dev tools to check the different contexts.</strong></div>

          <Example id='with-context-functional' title={ex1}>
            <CodeSnippet
              example={<>There is a provider wrapping the whole application, since no provider was passed to <strong>withContext</strong> as an argument, then it will fallback to the previously mentioned "global" provider's context scope.</>}
              codeSnippet={`import React, { Component } from 'react'
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
        <Button onClick={this.accessContextMethods}>Click to change styles!</Button>
      </div>
    )
  }
}

export default withContext(App, Context)`}
              exampleLog='withContext(WrappedComponent, Context)'
              logHeader="This is what you'd see in the dev-tools (you may open them as well), showcasing the _context props:"
              consoleLog={`_context:
  className: "Button_Button__27CKi Button_Disabled__1akHD"
  classNames: {Success: "Button_Success__9H-g1", Danger: "Button_Danger__1WZvy", Primary: "Button_Primary__2Ceo_", Dark: "Button_Dark__2-ybK", Light: "Button_Light__1oAHs"}
  setCustomClassname: ƒ setCustomClassname(key, className)
  setGlobalClassName: ƒ setGlobalClassName(className)
  setStyle: ƒ ()`}>
              <EX1 />
            </CodeSnippet>
          </Example>

          <Example id='with-context-functional-provider' title={ex2}>
            <CodeSnippet
              example={<>In this example we pass a <em>Provider</em> to <strong>withContext</strong> as an argument, as well as the context of course, then said context and any functionality will only work within that provider's context scope.</>}
              codeSnippet={`import React, { Component } from 'react'
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
        <Button onClick={this.setClass}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetClass}>Back to normal!</Button>
      </div>
    )
  }
}

export default withContext(App, Context, Provider)`}
              exampleLog='withContext(WrappedComponent, Context, Provider)'>
              <EX2 />
            </CodeSnippet>
          </Example>

          <Example id='with-context-jsx' title={ex3}>
            <CodeSnippet
              example={<><strong>{`<WithContext context={Context} />`}</strong> works just like <strong>withRouter</strong>, since no provider was passed to <strong>WithContext</strong> as a prop, then it will fallback to the previously mentioned "global" provider's context. <strong>Notice how all the <em>top level</em> components receive the context as a prop defined as <em><strong>_context</strong></em>, on top of receiving their different and respective <em>title</em> props without any side-effects</strong>.</>}
              codeSnippet={`import React, { Component } from 'react'
// JSX
import { WithContext } from 'with-context-react'
import { Context } from 'react-png-button'
import ClassComponent from './ClassComponent'

class App extends Component {
  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
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
}`}
              exampleLog='<WithContext context={Context} />'>
              <EX3 />
            </CodeSnippet>
          </Example>

          <Example id='with-context-jsx-provider' title={ex4}>
            <CodeSnippet
              example={<>Just like before, <strong>{`<WithContext context={Context} provider={Provider} />`}</strong> works just like <strong>withRouter</strong> when a <em>provider</em> was passed as an argument, except this time it will be a prop. Any functionality will only work within that provider's context. <strong>Notice how all the <em>top level</em> components receive the context as a prop, on top of receiving their different and respective <em>title</em> props without any side-effects</strong>.</>}
              codeSnippet={`import React, { Component } from 'react'
// JSX
import { WithContext } from 'with-context-react'
import { Context, Provider } from 'react-png-button'
import ClassComponent from './ClassComponent_WithProvider'

class App extends Component {
  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
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
}`}
              exampleLog='<WithContext context={Context} provider={Provider} />'>
              <EX4 />
            </CodeSnippet>
          </Example>

          <Example id='with-contexts' title={ex5}>
            <CodeSnippet
              example={<>By using <strong>withContext</strong>, we can set up multiple contexts and providers in one go, by passing them as arguments. The argument <strong>Contexts</strong> has to be an object, where the object keys will define the name of the props passed down and the values of the respective contexts, whereas the <strong>Providers</strong> <strong>may</strong> be an array containing all of the respective providers. Below is an example:</>}
              codeSnippet={`import React, { Component } from 'react'
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

export default withContexts(App, { buttonContext: Context, themeContext: ThemeContext }, [Provider, ThemeProvider])`}
              logHeader='Structure of the Contexts object passed as an argument to withContexts:'
              consoleLog={`const Contexts {
  [propName]: React.Context<any>
}`}>
              <EX5 />
            </CodeSnippet>
          </Example>

          <Example id='with-contexts-jsx' title={ex6}>
            <CodeSnippet
              example={<>Finally, by using <strong>{`<WithContexts contexts={{ ...Context }} providers={[ ...Provider ]} />`}</strong> we can set up multiple contexts with their respective providers (if passed) similarly to <strong>withContexts</strong>, the difference is that <strong>WithContext</strong> will pass down the context as a prop defined by the respective key of the context object to all of the top level components.</>}
              codeSnippet={`import React, { Component } from 'react'
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
}`}
              exampleLog='<WithContext context={Context} provider={Provider} />'>
              <EX6 />
            </CodeSnippet>
          </Example>

        </div>
      </Provider>
    )
  }
}

export default App
