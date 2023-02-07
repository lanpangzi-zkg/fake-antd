import { useToken } from '../internal';
import useStyleRegister from './useStyleRegister';

export default function genComponentStyleHook(
  component: string,
  styleFn: (token: any) => any
) {
  return (prefixCls: string) => {
    const [token, hashId] = useToken();
    return [
      useStyleRegister(
        {
          token,
          hashId,
          path: [component, prefixCls],
        },
        () => {
          const componentCls = `.${prefixCls}`;
          return styleFn(Object.assign({ componentCls }, token));
        }
      ),
      hashId,
    ];
  };
}
