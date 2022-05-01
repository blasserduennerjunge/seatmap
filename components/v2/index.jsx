import cn from 'classnames';
import { Fragment } from 'react/cjs/react.production.min';
import { useState } from 'react';
export const SeatMapV2 = ({ data = [] }) => {
  const { seatmaps = [] } = data?.data || {};
  const [activeCabin, setActiveCabin] = useState(1);
  return (
    <>
      {seatmaps.map(
        (item, index) =>
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
                                    return (
                                      <div
                                        key={gridCol}
                                        className={cn(
                                          'w-[50px] h-[50px] border flex flex-col justify-center items-center rounded',
                                          {
                                            'bg-green-200': available,
                                            'bg-red-200': !available,
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
                                      </div>
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

                                  return (
                                    <div
                                      key={gridCol}
                                      className={cn(
                                        'w-[50px] h-[50px] border flex flex-col justify-center items-center rounded',
                                        {
                                          'bg-green-200': available,
                                          'bg-red-200': !available,
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
                                    </div>
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
