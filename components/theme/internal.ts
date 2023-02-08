import * as React from 'react';
import hash from '@emotion/hash';
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

function flattenToken(token: any) {
  let str = '';
  Object.keys(token).forEach((key) => {
    const value = token[key];
    if (value && typeof value === 'object') {
      str += flattenToken(value);
    } else {
      str += value;
    }
  });
  return str;
}

function token2key(token: any, salt?: string): string {
  return hash(`${salt || ''}_${flattenToken(token)}`);
}

export function useToken(): [any, string] {
  const { token: rootDesignToken } = React.useContext(DesignTokenContext);
  const mergedToken: AliasToken & { _tokenKey: string } = React.useMemo(
    () => Object.assign({}, defaultConfig.token, rootDesignToken) as any,
    [defaultSeedToken, rootDesignToken]
  );
  const tokenKey = token2key(mergedToken);
  mergedToken._tokenKey = tokenKey;
  const hashId = `css-dev-only-do-not-override-${hash(tokenKey)}`;
  return [mergedToken, hashId];
}
