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
