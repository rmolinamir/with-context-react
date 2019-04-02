/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type ReactChildren = (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>)

type ProvidersArray = React.Provider<any>[]

interface IWithContextProps {
  children: ReactChildren
  /**
   * React Object, don't use `useContext` on it or anything similar - it's handled by `withContext` and/or `WithContext`.
   */
  context: React.Context<any>
  /**
   * The Context Providers required that allows consuming components to subscribe to context changes.
   */
  provider?: React.Provider<any>
}

interface IWithProviderProps extends Omit<IWithContextProps, 'provider'> {
  provider: React.JSXElementConstructor<any>
}

interface IContexts {
  [propName: string]: React.Context<any>
}

interface IWithContextsProps {
  children: ReactChildren
  /**
   * Object React Contexts, don't use `useContext` on it or anything  similar on
   * any context - it's handled by `withContexts` and/or `WithContexts`. You will receive each
   * context as a prop. The name of the prop is equal to their respective keys.
   */
  contexts: IContexts
  /**
   * An array of Context Providers, they allows consuming components to
   * subscribe to context changes, they will be composed into a single HOC.
   */
  providers?: ProvidersArray
}

interface IWithProvidersProps extends IWithContextsProps {
  providers: ProvidersArray
}