import Exit from './Exit';
import Facility from './Facility';
import Seat from './Seat';
import Wing from './Wing';
const Decks = ({ deck }) => {
  const { width, length, exitRowsX } = deck.deckConfiguration;
  const { seats, facilities } = deck;

  return (
    <div className='grid border-2 border-cyan' style={{ width: `${width * 2.2}em`, height: `${length * 2.1}em` }}>
      <Wing data={deck} />
      {seats.map((seat) => (
        <Seat data={seat} key={seat.number} />
      ))}
      {exitRowsX.map((rowX) => (
        <Exit key={rowX} data={rowX} />
      ))}
      {facilities.map((facility) => (
        <Facility key={facility.code} data={facility} />
      ))}
      <Wing data={deck} orientation='right' />
    </div>
  );
};

export default Decks;
