import cn from 'classnames';
import { useCallback, Fragment, useState } from 'react';

export const SeatMapV2 = ({ data = [] }) => {
  const { seatmaps = [] } = data?.data || {};
  const [activeSegment, setActiveSegment] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSelectSeats = useCallback(
    (name, price = 0, segment = 0) => {
      console.log('selectedSeats', selectedSeats);
      if (selectedSeats?.[segment]?.[name]) {
        console.log('uff');
        const data = selectedSeats?.[segment];
        delete data?.[name];
        console.log('data', data);
        setSelectedSeats({
          ...selectedSeats,
          [segment]: {
            ...data,
          },
        });
      } else {
        setSelectedSeats({
          ...selectedSeats,
          [segment]: {
            ...selectedSeats?.[segment],
            [name]: {
              name,
              price,
            },
          },
        });
      }
    },
    [selectedSeats]
  );

  return (
    <>
      <ul className='space-x-4 flex p-0 m-0 mb-4'>
        {seatmaps.map(
          (segment, index) =>
            index !== activeSegment && (
              <li key={segment.id} className=''>
                <button
                  className={cn('bg-slate-200 rounded text-slate-900 p-2', {
                    'bg-blue-500': activeSegment === index,
                  })}
                  onClick={() => setActiveSegment(index)}
                >
                  Show Segment {index + 1}
                </button>
              </li>
            )
        )}
      </ul>
      <div className='space-y-4 absolute'>
        {Object.keys(selectedSeats).map((k) => {
          const segmentSeats = selectedSeats[k];
          const arr = Object.keys(segmentSeats).map((y) => segmentSeats[y]);
          if (arr?.length === 0) {
            return null;
          }
          const sumTotal = arr.reduce((sum, { price }) => sum + price, 0);
          const segment = parseInt(k) + 1;

          return (
            <div key={k}>
              <div>
                {arr.map(({ name, price }) => (
                  <div key={name}>
                    Sitz: {name} || Preis: {price} €
                  </div>
                ))}
              </div>
              <strong className='block border-y-4 border-t-solid mt-2'>
                Segment {segment} Total: {sumTotal} €
              </strong>
            </div>
          );
        })}
      </div>

      <div className='w-full flex-col flex items-center justify-center'>
        {seatmaps.map(({ decks = [] }, index) => {
          const seatMapIndex = index;
          if (index !== activeSegment) {
            return null;
          }
          return decks.map(({ cabins, type }) => (
            <div key={type} className='relative'>
              <div
                key={type}
                className='flex justify-center border-y-0 border-gray-200 border-[4px] border-t-[4px] w-fit px-1 rounded-lg'
              >
                <div className='cockpit h-[100px] absolute left-[2px] right-[2px] top-[-98px] bg-gradient-to-t from-gray-200'></div>
                {cabins.map(({ cabinClass, seatRows, configuration }) => {
                  return (
                    <div key={cabinClass} className='relative'>
                      {seatRows.map(({ groups, overwing }, index) => (
                        <>
                          {overwing && (
                            <div className='absolute left-[-200px] w-[196px]  h-[50px] flex items-center bg-gradient-to-l from-gray-200 !m-0'></div>
                          )}
                          <div
                            key={index}
                            className={cn('flex relative items-center', {
                              '!mt-0': index === 0,
                            })}
                          >
                            {groups.map(({ groupPosition, seats }, index) => {
                              const lastItem = groups.length - 1;

                              // last group
                              if (lastItem === index) {
                                return (
                                  <Fragment key={groupPosition}>
                                    {seats.map(({ type, name, gridCol, prices }) => {
                                      const { available = false, price = 0 } = prices?.[0] || {};
                                      const seatSelected = !!selectedSeats?.[seatMapIndex]?.[name];

                                      return (
                                        <div key={gridCol} className='p-[5px]'>
                                          <button
                                            type='button'
                                            onClick={
                                              available ? () => handleSelectSeats(name, price, seatMapIndex) : null
                                            }
                                            className={cn(
                                              'w-[35px] h-[35px] flex flex-col justify-center items-center rounded rounded-t-xl',
                                              {
                                                'bg-gray-200': available && !seatSelected,
                                                'bg-red-200 cursor-not-allowed': !available,
                                                'bg-blue-200': seatSelected,
                                              }
                                            )}
                                          >
                                            {available && <p className='text-xs'>{name}</p>}
                                          </button>
                                        </div>
                                      );
                                    })}
                                    {overwing && (
                                      <div className='absolute right-[-200px] w-[196px] h-[50px] flex items-center bg-gradient-to-r from-gray-200 !m-0'></div>
                                    )}
                                  </Fragment>
                                );
                              }

                              // other groups
                              return (
                                <Fragment key={groupPosition}>
                                  {seats.map(({ type, name, gridCol, prices, characteristics }) => {
                                    const { available = false, price = 0 } = prices?.[0] || {};
                                    const seatSelected = !!selectedSeats?.[seatMapIndex]?.[name];
                                    return (
                                      <div key={gridCol} className='p-[5px]'>
                                        <button
                                          type='button'
                                          onClick={
                                            available ? () => handleSelectSeats(name, price, seatMapIndex) : null
                                          }
                                          key={gridCol}
                                          className={cn(
                                            'relative p-[5px] w-[40px] h-[40px] flex flex-col justify-center items-center rounded rounded-t-xl',
                                            {
                                              'bg-gray-200': available && !seatSelected,
                                              'bg-red-200 cursor-not-allowed': !available,
                                              'bg-blue-200': seatSelected,
                                            }
                                          )}
                                        >
                                          <>
                                            {available && (
                                              <>
                                                <p className='text-xs'>{name}</p>
                                              </>
                                            )}
                                          </>
                                        </button>
                                      </div>
                                    );
                                  })}
                                  <div className='w-[30px] h-[50px] bg-yellow-200'></div>
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
            </div>
          ));
        })}
      </div>
    </>
  );
};

export default SeatMapV2;
