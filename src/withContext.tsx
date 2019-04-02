import * as React from 'react'
const { useContext } = React

/**
 * @function WithProvider serves as a HOC wrapper to set up the React context within.
 */
const WithProvider = (props: IWithProviderProps) => {
  const Provider = props.provider

  return (
    <Provider>
      <WithContext context={props.context}>
        {props.children}
      </WithContext>
    </Provider>
  )
}

/**
 * @function withContext will send the passed context as a prop defined as `_context` 
 * (e.g. `this.props._context`) - keep in mind you need to have a context provider present 
 * somewhere within your application wrapping these elements or pass the provider as an
 * argument.
 * @param WrappedComponent `React.JSXElementConstructor<any>`, e.g. `withContext(App, Context)` (similar to withRouter from react-router-dom).
 * @param Context React Object, don't use `useContext` on it or anything similar - it's handled by `withContext` and/or `WithContext`.
 * @param Provider The Context Providers required that allows consuming components to subscribe to context changes.
 */
export const withContext = (WrappedComponent: React.JSXElementConstructor<any>, Context: React.Context<any>, Provider?: React.Provider<any>) => {
  return (props: any) => {
    const context: any = useContext(Context)

    if (Provider) {
      return ( 
        <WithProvider
          context={Context}
          provider={Provider}>
          <WrappedComponent {...props} />
        </WithProvider>
      )
    } else {
      const newProps = {
        _context: context,
        ...props
      }
      
      return ( 
        <WrappedComponent {...newProps} />
      )
    }
  }
}

/**
 * @function WithContext will send the passed context as a prop defined as `_context` 
 * (e.g. `this.props._context`) to every wrapped element within the first level scope.
 * @param props.context React Object, don't use `useContext` on it or anything similar - it's handled by `withContext` and/or `WithContext`.
 * @param props.provider The Context Providers required that allows consuming components to subscribe to context changes.
 */
export const WithContext = (props: IWithContextProps) => {
  const { children } = props;
  if (props.provider) {
    return (
      <WithProvider
        context={props.context}
        provider={props.provider}>
        {children}
      </WithProvider>
    )
  } else {
    const context = useContext(props.context)

    const childrenWithContext = React.Children.map(children, child =>
      React.cloneElement(child, { _context: context })
    )

    return (
      <React.Fragment>
        {childrenWithContext}
      </React.Fragment>
    )
  }
}
