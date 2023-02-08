import * as React from 'react';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isFragment(child: any) {
  return child && React.isValidElement(child) && child.type === React.Fragment;
}
function splitCNCharsBySpace(
  child: React.ReactElement | string | number,
  needInserted: boolean
) {
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  if (typeof child === 'string') {
    return isTwoCNChar(child) ? (
      <span>{child.split('').join(SPACE)}</span>
    ) : (
      <span>{child}</span>
    );
  }
  if (isFragment(child)) {
    return <span>{child}</span>;
  }
}
export function spaceChildren(
  children: React.ReactNode,
  needInserted: boolean
) {
  return React.Children.map(children, (child) => {
    return splitCNCharsBySpace(
      child as React.ReactElement | string | number,
      needInserted
    );
  });
}
