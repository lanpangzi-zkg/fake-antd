import genComponentStyleHook from '../../theme/util/genComponentStyleHook';

function getButtonStyle(token: any) {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      borderColor: token.colorPrimary,
      border: '1px solid',
      background: '#fff',
      borderRadius: token.borderRadius,
    },
  };
}
export default genComponentStyleHook('Button', (token) => {
  return [getButtonStyle(token)];
});
