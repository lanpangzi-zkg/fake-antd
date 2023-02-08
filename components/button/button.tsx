import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { spaceChildren } from './buttonHelpers';
import useStyle from './style';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  prefixCls?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    onClick,
    className,
    children,
    ...rest
  } = props;
  const { autoInsertSpaceInButton, getPrefixCls } =
    React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, className);
  const isNeedInserted = () => React.Children.count(children) === 1;
  const autoInsertSpace = autoInsertSpaceInButton !== false;
  const buttonRef = (ref as any) || React.createRef<HTMLButtonElement>();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    (onClick as React.MouseEventHandler<HTMLButtonElement>)?.(e);
  };
  const kids =
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
      : null;
  return (
    <button {...rest} ref={buttonRef} onClick={handleClick} className={classes}>
      {kids}
    </button>
  );
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(InternalButton);

export default Button;
