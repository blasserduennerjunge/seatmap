import Decks from './Decks';
const SeatMap = ({ data = null }) => {
  const { decks } = data.data[0];
  return (
    <div className='relative'>
      {decks.map((deck) => (
        <Decks key={deck.deckType} deck={deck} />
      ))}
    </div>
  );
};

export default SeatMap;
