import genComponentStyleHook from '../../theme/util/genComponentStyleHook';

function getButtonStyle(token: any) {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      border: '1px solid',
      background: '#fff',
      color: token.colorPrimary,
      borderColor: token.colorPrimary,
      borderRadius: token.borderRadius,
    },
  };
}
export default genComponentStyleHook('Button', (token) => {
  return [getButtonStyle(token)];
});
