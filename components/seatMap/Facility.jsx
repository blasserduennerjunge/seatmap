const Facility = ({ data }) => {
  const { coordinates, code } = data;
  const { x, y } = coordinates;
  const left = `${y * 2}em `;
  const top = `${x * 2}em`;
  return (
    <div className='facility' style={{ position: 'absolute', left: left, top: top, backgroundColor: '#F5EE9E' }}>
      <p>{code}</p>
    </div>
  );
};
export default Facility;
