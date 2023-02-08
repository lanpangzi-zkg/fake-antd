import * as React from 'react';
import { ConfigConsumerProps, ConfigContext } from './context';
import type { DirectionType, ThemeConfig } from './context';
import { DesignTokenContext, defaultSeedToken } from '../theme/internal';
import useTheme from './hooks/useTheme';
export { ConfigContext };

export interface ConfigProviderProps {
  children?: React.ReactNode;
  prefixCls?: string;
  autoInsertSpaceInButton?: boolean;
  direction?: DirectionType;
  theme?: ThemeConfig;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
}

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
  const { children, parentContext, direction, theme, autoInsertSpaceInButton } =
    props;
  const getPrefixCls = React.useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;
      if (customizePrefixCls) {
        return customizePrefixCls;
      }
      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');
      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : prefixCls;
    },
    [parentContext.getPrefixCls, props.prefixCls]
  );
  const mergedTheme = useTheme(theme, parentContext.theme);
  const baseConfig = {
    direction,
    getPrefixCls,
    theme: mergedTheme,
    autoInsertSpaceInButton,
  };
  const config = {
    ...parentContext,
  };
  Object.keys(baseConfig).forEach((key: keyof typeof baseConfig) => {
    if (baseConfig[key] !== undefined) {
      (config as any)[key] = baseConfig[key];
    }
  });

  let childNode = children;
  const memoTheme = React.useMemo(() => {
    const { token, ...rest } = mergedTheme || {};
    return {
      ...rest,
      token: {
        ...defaultSeedToken,
        ...token,
      },
    };
  }, [mergedTheme]);

  // 通过ConfigProvider自定义了主题样式
  if (theme) {
    childNode = (
      <DesignTokenContext.Provider value={memoTheme}>
        {childNode}
      </DesignTokenContext.Provider>
    );
  }
  return (
    <ConfigContext.Provider value={config}>{childNode}</ConfigContext.Provider>
  );
};

const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const parentContext = React.useContext(ConfigContext);
  return <ProviderChildren parentContext={parentContext} {...props} />;
};

export default ConfigProvider;
