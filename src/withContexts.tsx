

import * as React from 'react'
const { useContext } = React

import { composeProviders } from './composeProviders'

/**
 * @function WithProviders serves as a HOC wrapper to set up the React context within.
 * It nests all of the Provider HOCs into a single one by using `composeProviders`.
 * @param props.contexts `React.Context<any>` object, don't use `useContext` on it or anything 
 * similar on any context - it's handled by `withContexts` and/or `WithContexts`.
 * @param props.providers Context.Provider `array` required that allows consuming components 
 * to subscribe to context changes, they will be composed into a single HOC.
 */
const WithProviders = (props: IWithProvidersProps) => {
  const Providers = composeProviders(props.providers)
  return (
    <Providers>
      <WithContexts contexts={props.contexts}>
        {props.children}
      </WithContexts>
    </Providers>
  )
}

/**
 * @function withContexts will send the passed contexts as a prop defined by their respective key
 * name - keep in mind you need to have the respective context provider present somewhere within 
 * your application wrapping these elements or pass the provider(s) as an argument.
 * @param Contexts `React.Context<any>` object, don't use `useContext` on it or anything 
 * similar on any context - it's handled by `withContexts` and/or `WithContexts`.
 * @param ProvidersArray Context.Provider `array` required that allows consuming components 
 * to subscribe to context changes, they will be composed into a single HOC.
 */
export const withContexts = (WrappedComponent: React.JSXElementConstructor<any>, Contexts: IContexts, ProvidersArray?: ProvidersArray) => {
  return (props: any) => {
    if (ProvidersArray) {
      return (
        <WithProviders
          contexts={Contexts}
          providers={ProvidersArray}>
          <WrappedComponent />
        </WithProviders>
      )
    } else {
      const contextKeys = Object.keys(Contexts)

      const usedContexts = contextKeys.reduce((contexts: any, key: any) => {
        return Object.assign(contexts, {[key]: useContext(Contexts[key])})
      }, {})

      const newProps = {
        usedContexts,
        ...props
      }

      return ( 
        <WrappedComponent {...newProps} />
      )
    }
  }
}

/**
 * @function WithContexts will send the passed contexts as a prop defined by their respective key
 * name to every wrapped element within the first level scope - keep in mind you need to have the 
 * respective context provider present somewhere within your application wrapping these elements 
 * or pass the provider(s) as an argument.
 * @param props.contexts `React.Context<any>` object, don't use `useContext` on it or anything 
 * similar on any context - it's handled by `withContexts` and/or `WithContexts`.
 * @param props.providers Context.Provider `array` required that allows consuming components 
 * to subscribe to context changes, they will be composed into a single HOC.
 */
export const WithContexts = (props: IWithContextsProps) => {
  const { children } = props;
  if (props.providers) {
    return (
      <WithProviders
        contexts={props.contexts}
        providers={props.providers}>
        {children}
      </WithProviders>
    )
  } else {
    const contextKeys = Object.keys(props.contexts)

    const usedContexts = contextKeys.reduce((contexts: any, key: any) => {
      return Object.assign(contexts, {[key]: useContext(props.contexts[key])})
    }, {})

    const childrenWithContext = React.Children.map(children, child =>
      React.cloneElement(child, { ...usedContexts })
    )

    return (
      <React.Fragment>
        {childrenWithContext}
      </React.Fragment>
    )
  }
}