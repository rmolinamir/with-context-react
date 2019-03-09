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
    this.props._context.setStyle({ padding: '8px', textTransform: 'uppercase', borderRadius: 'none', backgroundColor: 'indigo', color: 'white' })
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
