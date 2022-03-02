const Wing = ({ data, orientation = 'left' }) => {
  const start = data.deckConfiguration.startWingsX;
  const end = data.deckConfiguration.endWingsX;
  const leftVal = orientation === 'left' ? '-252px' : '15.5em';
  const style = {
    backgroundColor: '#99B2DD',
    width: '250px',
    height: `${(end - start) * 2}em`,
    position: 'absolute',
    top: `${start * 2}em`,
    left: leftVal,
  };
  return (
    <div className='wing' style={style}>
      Wings
    </div>
  );
};
export default Wing;
