import * as React from 'react';
import { AliasToken } from '../theme/interface';
export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  autoInsertSpaceInButton?: boolean;
  direction?: DirectionType;
  theme?: ThemeConfig;
}
export interface ThemeConfig {
  token?: Partial<AliasToken>;
}
const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;
