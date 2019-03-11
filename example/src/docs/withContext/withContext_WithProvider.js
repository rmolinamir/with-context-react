import React, { Component } from 'react'
import propTypes from 'prop-types'
// CSS
import classes from '../exampleClasses.module.css'
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

export default withContext(App, Context, Provider)
