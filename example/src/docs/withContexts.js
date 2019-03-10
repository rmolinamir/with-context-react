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
