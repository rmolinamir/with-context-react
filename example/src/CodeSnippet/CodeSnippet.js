import React, { Component } from 'react'
import propTypes from 'prop-types'
// JSX
import { withContext } from 'with-context-react'
import Button, { Context } from 'react-png-button'
import Modal from 'react-png-modal'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

class CodeSnippet extends Component {
  static propTypes = {
    children: propTypes.any,
    example: propTypes.any,
    codeSnippet: propTypes.string,
    exampleLog: propTypes.string,
    consoleLog: propTypes.string
  }

  state = {
    bIsModalOpen: false
  }

  openModal = () => {
    this.setState({
      bIsModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      bIsModalOpen: false
    })
  }

  render () {
    console.log(this.props.exampleLog, this.props)
    return (
      <div>
        <p>
          {this.props.example}
        </p>
        <Button style={{ padding: '6px' }} button='success' onClick={this.openModal}>Open Code Snippet</Button>
        <h3>Watch it work:</h3>
        {this.props.children}
        <br />
        <Modal open={this.state.bIsModalOpen} closeModal={this.closeModal} center transparent>
          <SyntaxHighlighter language='javascript' style={atomDark}>{this.props.codeSnippet}
          </SyntaxHighlighter>
        </Modal>
        {this.props.consoleLog ? (
          <>
            <h4>This is what you'd see in the dev-tools (you may open them as well), showcasing the _context props:</h4>
            <SyntaxHighlighter language='javascript' style={atomDark}>{this.props.consoleLog}></SyntaxHighlighter>
          </>
        )
          : null}
      </div>
    )
  }
}

export default withContext(CodeSnippet, Context)
