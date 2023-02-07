import type { ThemeConfig } from '../context';
import { defaultConfig } from '../../theme/internal';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig
): ThemeConfig | undefined {
  const themeConfig = theme || {};
  const parentThemeConfig: ThemeConfig = parentTheme || defaultConfig;
  if (!theme) {
    return parentTheme;
  }
  return {
    ...parentThemeConfig,
    ...themeConfig,
    token: {
      ...parentTheme.token,
      ...themeConfig.token,
    },
  };
}
