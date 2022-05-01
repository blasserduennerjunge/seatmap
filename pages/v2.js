import SeatMapV2 from '../components/v2';
import datav2 from './api/seatmapv2.json';

export default function SeatMap() {
  return (
    <div className='p-12'>
      <SeatMapV2 data={datav2} />
    </div>
  );
}
