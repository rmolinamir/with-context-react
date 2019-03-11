import React, { Component } from 'react'
import propTypes from 'prop-types'
// CSS
import classes from '../exampleClasses.module.css'
// JSX
import Button from 'react-png-button'

export default class ClassfulComponent extends Component {
  static propTypes = {
    title: propTypes.string,
    _context: propTypes.object
  }

  initialButtonClass = this.props._context.className

  setStyle = () => {
    this.props._context.setStyle({ padding: '8px', textTransform: 'uppercase', borderRadius: 'none', backgroundColor: 'mediumaquamarine', color: 'white' })
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
