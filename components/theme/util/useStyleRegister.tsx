import * as React from 'react';

function parseStyle(interpolation: any, config: ParseConfig = {}): string {
  const { hashId, path } = config;
  let styleStr = '';
  return styleStr;
}
export interface ParseConfig {
  hashId?: string;
  path?: string;
}
export default function useStyleRegister(
  info: {
    token: any;
    path: string[];
    hashId?: string;
  },
  styleFn: () => any
) {
  const { token, path, hashId } = info;
  const tokenKey = token._tokenKey as string;
  const fullPath = [tokenKey, ...path];
  const styleObj = styleFn();
  const parsedStyle = parseStyle(styleObj, {
    hashId,
    path: path.join('-'),
  });
  return (node: React.ReactElement) => {
    return <React.Fragment>{node}</React.Fragment>;
  };
}
