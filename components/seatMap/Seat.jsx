import cn from 'classnames';
const Seat = ({ data }) => {
  const { number, coordinates } = data;
  const { y, x } = coordinates;
  console.log(x);
  const { seatAvailabilityStatus } = data.travelerPricing[0];
  const style = {
    position: 'absolute',
    left: `${y * 2}em`,
    top: `${x * 2}em`,
  };
  return (
    <div
      style={style}
      className={cn('bg-[#499167]', {
        ['bg-[#FE5F55]']: seatAvailabilityStatus !== 'AVAILABLE',
      })}
    >
      <p>{number}</p>
    </div>
  );
};

export default Seat;
