import * as React from 'react';
import { ConfigContext } from './context';
import type { DirectionType } from './context';

export { ConfigContext };

export interface ConfigProviderProps {
  children?: React.ReactNode;
  prefixCls?: string;
  autoInsertSpaceInButton?: boolean;
  direction?: DirectionType;
}

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
} = (props) => {
  const { children, autoInsertSpaceInButton, direction } = props;
  const getPrefixCls = React.useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;
      if (customizePrefixCls) {
        return customizePrefixCls;
      }
      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
    },
    [props.prefixCls]
  );
  const memoedConfig = React.useMemo(() => {
    return {
      direction,
      getPrefixCls,
      autoInsertSpaceInButton,
    };
  }, [autoInsertSpaceInButton, direction]);

  return (
    <ConfigContext.Provider value={memoedConfig}>
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider;
