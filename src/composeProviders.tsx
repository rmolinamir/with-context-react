import * as React from 'react';

/**
 * Based on Redux compose.
 * [https://github.com/reduxjs/redux/blob/master/src/compose.js]
 * The first value of the `providers` array will be the top (HOC) Provider.
 */
export const composeProviders = (providers: any[]) => {
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
