import * as React from 'react';

export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  autoInsertSpaceInButton?: boolean;
  direction?: DirectionType;
}

const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${customizePrefixCls}` : 'ant';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});
