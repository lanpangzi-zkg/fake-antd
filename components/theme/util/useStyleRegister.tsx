import * as React from 'react';
import hash from '@emotion/hash';

function parseStyle(
  interpolation: any[],
  config: ParseConfig = {},
  root: boolean = true
): string {
  const { hashId, path } = config;
  let styleStr = '';
  interpolation.forEach((originStyle) => {
    if (typeof originStyle === 'string') {
      styleStr += `${originStyle}\n`;
    } else {
      Object.keys(originStyle).forEach((key) => {
        const value = originStyle[key];
        if (typeof value === 'object') {
          const parsedStr = parseStyle([value], config, false);
          styleStr += `${key}${parsedStr}`;
        } else {
          const styleName = key.replace(
            /[A-Z]/g,
            (match) => `-${match.toLowerCase()}`
          );
          const actualValue =
            typeof value === 'number' && value !== 0 ? `${value}px` : value;
          styleStr += `${styleName}:${actualValue};`;
        }
      });
    }
  });
  if (!root) {
    styleStr = `{${styleStr}}`;
  }
  return styleStr;
}
export interface ParseConfig {
  hashId?: string;
  path?: string;
}
function uniqueHash(path: (string | number)[], styleStr: string) {
  return hash(`${path.join('%')}${styleStr}`);
}
function getContainer() {
  return document.querySelector('head') || document.body;
}
export type ContainerType = Element | ShadowRoot;

function findStyles(container: ContainerType) {
  return Array.from(container.children).filter(
    (node) => node.tagName === 'STYLE'
  ) as HTMLStyleElement[];
}
function findExistNode(key: string) {
  const container = getContainer();
  return findStyles(container).find(
    (node) => node.getAttribute('data-css-hash') === key
  );
}
function injectCSS(css: string) {
  const styleNode = document.createElement('style');
  styleNode.innerHTML = css;
  const containter = getContainer();
  containter.appendChild(styleNode);
  return styleNode;
}
function updateCSS(css: string, key: string) {
  const exsitNode = findExistNode(key);
  if (exsitNode) {
    if (exsitNode.innerHTML !== css) {
      exsitNode.innerHTML = css;
    }
    return;
  }
  const newNode = injectCSS(css);
  newNode.setAttribute('data-css-hash', key);
  return newNode;
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
  const styleId = uniqueHash(fullPath, parsedStyle);
  updateCSS(parsedStyle, styleId);
  return (node: React.ReactElement) => {
    return <React.Fragment>{node}</React.Fragment>;
  };
}
