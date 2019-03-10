import * as React from 'react';
const { useContext } = React

type ReactChildren = (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>)

interface IWithContextProps {
  children: ReactChildren
  context: React.Context<any>
  provider?: React.JSXElementConstructor<any>
}

interface IWithProviderProps extends IWithContextProps {
  provider: React.JSXElementConstructor<any>
}

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

export const withContext = (WrappedComponent: React.JSXElementConstructor<any>, Context: React.Context<any>, Provider?: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    const context: any = useContext(Context)

    if (Provider) {
      return ( 
        <WithProvider
          context={Context}
          provider={Provider}>
          <WrappedComponent />
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
 * Based on Redux compose.
 * [https://github.com/reduxjs/redux/blob/master/src/compose.js]
 * The first value of the `providers` array will be the top (HOC) Provider.
 */
const composeProviders = (providers: any[]) => {
  if (providers.length === 0) {
    return (props: any) => props.children
  }

  if (providers.length === 1) {
    return providers[0]
  }

  const result = providers.reduce((A, B) => {
    
    return (props: any) => {
      const { children, otherProps } = props;
      return (
        <A {...otherProps}>
          <B {...otherProps}>
            {children}
          </B>
        </A>
      )
    }
  })
  return result
}

interface IContexts {
  [propName: string]: React.Context<any>
}

type ProvidersArray = React.JSXElementConstructor<any>[]

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

interface IWithContextsProps {
  children: ReactChildren
  contexts: IContexts
  providers?: ProvidersArray
}

interface IWithProvidersProps extends IWithContextsProps {
  providers: ProvidersArray
}

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