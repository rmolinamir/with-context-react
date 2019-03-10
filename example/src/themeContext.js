import React, { useState, useEffect } from 'react'
// CSS
import classes from './App.module.css'

/**
 * Themes initial context.
 */
const initialContext = {
  activeTheme: classes.Dark,
  Dark: classes.Dark,
  Light: classes.Light
}

export const Context = React.createContext(initialContext)

const provider = (props) => {
  const [activeTheme, setActiveTheme] = useState(props.className || initialContext.activeTheme)

  const setTheme = () => {
    const newActiveTheme = activeTheme === initialContext.Light ? initialContext.Dark : initialContext.Light
    document.body.classList.remove(activeTheme)
    document.body.classList.add(newActiveTheme)
    setActiveTheme(newActiveTheme)
  }

  useEffect(() => {
    document.body.classList.add(activeTheme)
  }, [])

  return (
    <Context.Provider value={{
      setTheme: setTheme
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default provider
