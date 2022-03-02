const Exit = ({ data }) => {
  const styleLeft = {
    position: 'absolute',
    left: '-2.2em',
    top: `${data * 2}em`,
    backgroundColor: '#499167',
  };
  const styleRight = {
    position: 'absolute',
    left: '15.3em',
    top: `${data * 2}em`,
    backgroundColor: '#499167',
  };
  return (
    <div className='exit'>
      <span style={styleLeft}>EXIT</span>
      <span style={styleRight}>EXIT</span>
    </div>
  );
};
export default Exit;
