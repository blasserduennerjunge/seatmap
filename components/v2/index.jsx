import cn from 'classnames';
import { useCallback, Fragment, useState } from 'react';

export const SeatMapV2 = ({ data = [] }) => {
  const { seatmaps = [] } = data?.data || {};
  const [activeCabin, setActiveCabin] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSelectSeats = useCallback(
    (name, price = 0) => {
      const findItem = selectedSeats.find((item) => item.name === name);
      if (findItem) {
        console.log('wtf');
        const filteredArr = selectedSeats.filter((item) => item.name !== name);
        setSelectedSeats(filteredArr);
      } else {
        console.log('else 1!', name);
        setSelectedSeats([...selectedSeats, { name, price }]);
      }
    },
    [selectedSeats]
  );
  var sum = null; // Place to store the total cost
  selectedSeats.forEach(function ({ price }) {
    sum += price;
  });
  return (
    <>
      {seatmaps.map(
        (_item, index) =>
          activeCabin !== index + 1 && (
            <button
              key={index}
              type='button'
              className='border bg-blue-200 rounded text-blue-900 p-2'
              onClick={() => setActiveCabin(index + 1)}
            >
              {`Show Cabin ${index + 1}`}
            </button>
          )
      )}
      {selectedSeats?.length > 0 && (
        <div className='fixed top-0 right-[10px] z-10 border bg-white rounded'>
          <h2 className='text-center'>Selected Seats</h2>
          <ul className='divide-y p-2'>
            {selectedSeats.map(({ price, name }) => (
              <li key={name} className='flex justify-between'>
                <span>{name}</span>
                <span>{price} €</span>
              </li>
            ))}
          </ul>
          <div className='bg-blue-200 text-blue-900 flex justify-between p-2 space-x-2'>
            <span>{`${selectedSeats.length} Seats`}</span>
            <span>{`${Math.round(sum * 100) / 100}€`}</span>
          </div>
        </div>
      )}
      {seatmaps.map(({ decks = [] }, index) => {
        if (activeCabin !== index + 1) {
          return null;
        }
        return decks.map(({ cabins, type }) => (
          <Fragment key={type}>
            <h1 className='text-center'>{`Cabin ${activeCabin}`}</h1>
            <div key={type} className='flex justify-center'>
              {cabins.map(({ cabinClass, seatRows, configuration }) => {
                return (
                  <div key={cabinClass} className='space-y-4 border relative'>
                    {seatRows.map(({ groups, overwing }, index) => (
                      <>
                        {overwing && <div className='absolute left-[-90px]  h-[50px] flex items-center'>WING LEFT</div>}
                        <div
                          key={index}
                          className={cn('flex space-x-4 relative', {
                            '!mt-0': index === 0,
                          })}
                        >
                          {groups.map(({ groupPosition, seats }, index) => {
                            const lastItem = groups.length - 1;
                            if (lastItem === index) {
                              return (
                                <Fragment key={groupPosition}>
                                  {seats.map(({ type, name, gridCol, prices }) => {
                                    const { available = false, price = 0 } = prices?.[0] || {};
                                    const seatSelected = !!selectedSeats.find((item) => item.name === name);

                                    return (
                                      <button
                                        type='button'
                                        onClick={available ? () => handleSelectSeats(name, price) : null}
                                        key={gridCol}
                                        className={cn(
                                          'w-[50px] h-[50px] border flex flex-col justify-center items-center rounded',
                                          {
                                            'bg-green-200': available,
                                            'bg-red-200 cursor-not-allowed': !available,
                                            'bg-blue-200': seatSelected,
                                          }
                                        )}
                                      >
                                        {available ? (
                                          <>
                                            <p>{name}</p>
                                            {price && <span className='text-xs'>{price} €</span>}
                                          </>
                                        ) : (
                                          <div>X</div>
                                        )}
                                      </button>
                                    );
                                  })}
                                  {overwing && (
                                    <div className='absolute right-[-100px] h-[50px] flex items-center'>WING RIGHT</div>
                                  )}
                                </Fragment>
                              );
                            }
                            return (
                              <Fragment key={groupPosition}>
                                {seats.map(({ type, name, gridCol, prices }) => {
                                  const { available = false, price = 0 } = prices?.[0] || {};
                                  const seatSelected = !!selectedSeats.find((item) => item.name === name);
                                  return (
                                    <button
                                      type='button'
                                      onClick={available ? () => handleSelectSeats(name, price) : null}
                                      key={gridCol}
                                      className={cn(
                                        'w-[50px] h-[50px] border flex flex-col justify-center items-center rounded',
                                        {
                                          'bg-green-200': available && !seatSelected,
                                          'bg-red-200 cursor-not-allowed': !available,
                                          'bg-blue-200': seatSelected,
                                        }
                                      )}
                                    >
                                      {available ? (
                                        <>
                                          <p>{name}</p>
                                          {price && <span className='text-xs'>{price} €</span>}
                                        </>
                                      ) : (
                                        <div>X</div>
                                      )}
                                    </button>
                                  );
                                })}
                                <div className='w-[30px] h-[50px]'></div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </>
                    ))}
                  </div>
                );
              })}
            </div>
          </Fragment>
        ));
      })}
    </>
  );
};

export default SeatMapV2;
