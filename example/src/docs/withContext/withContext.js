import React, { Component } from 'react'
import propTypes from 'prop-types'
// JSX
import { withContext } from 'with-context-react'
import Button, { Context } from 'react-png-button'

class App extends Component {
  static propTypes = {
    _context: propTypes.object
  }

  setStyle = () => {
    this.props._context.setStyle({ padding: '8px', textTransform: 'uppercase', borderRadius: 'none', backgroundColor: 'goldenrod' })
  }

  resetStyle = () => {
    this.props._context.setStyle(undefined)
  }

  render () {
    console.log(this.props._context)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
        <Button onClick={this.setStyle}>Click to change styles!</Button>
        <br />
        <Button onClick={this.resetStyle}>Back to normal!</Button>
      </div>
    )
  }
}

export default withContext(App, Context)
