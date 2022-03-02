import SeatMap from '../components/seatMap/SeatMap';
import data from './api/seatmap.json';

export default function Home() {
  return (
    <div className='flex justify-center m-4'>
      <SeatMap data={data} />
    </div>
  );
}
