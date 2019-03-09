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
