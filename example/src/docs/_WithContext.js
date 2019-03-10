import React, { Component } from 'react'
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
