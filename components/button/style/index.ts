import genComponentStyleHook from '../../theme/util/genComponentStyleHook';

function getButtonStyle(token) {
  const { componentCls } = token;
  console.log(token);
}
export default genComponentStyleHook('Button', (token) => {
  return [getButtonStyle(token)];
});
