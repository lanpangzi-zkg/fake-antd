import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  prefixCls?: string;
};

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const { prefixCls: customizePrefixCls, children } = props;
  const { autoInsertSpaceInButton, getPrefixCls } =
    React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  // const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, {});
  return <button className={classes}>{children}</button>;
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(InternalButton);

export default Button;
