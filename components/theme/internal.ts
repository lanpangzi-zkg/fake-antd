import * as React from 'react';
import { AliasToken } from './interface';
export const defaultSeedToken = {
  colorPrimary: '#1677ff',
  borderRadius: 6,
};
export const defaultConfig = {
  token: defaultSeedToken,
};

export const DesignTokenContext = React.createContext<{
  token: Partial<AliasToken>;
}>(defaultConfig);

export function useToken() {
  const { token: rootDesignToken } = React.useContext(DesignTokenContext);
}
