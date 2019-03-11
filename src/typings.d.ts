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

type ReactChildren = (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>)

type ProvidersArray = React.JSXElementConstructor<any>[]

interface IWithContextProps {
  children: ReactChildren
  context: React.Context<any>
  provider?: React.JSXElementConstructor<any>
}

interface IWithProviderProps extends IWithContextProps {
  provider: React.JSXElementConstructor<any>
}

interface IContexts {
  [propName: string]: React.Context<any>
}

interface IWithContextsProps {
  children: ReactChildren
  contexts: IContexts
  providers?: ProvidersArray
}

interface IWithProvidersProps extends IWithContextsProps {
  providers: ProvidersArray
}