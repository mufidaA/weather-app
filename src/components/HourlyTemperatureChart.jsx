import { useState, useEffect } from 'react';
import { useDataContext }from '../context/DataContext';
import { options } from '../services/ChartOptions';
import 'chartjs-adapter-moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
  TimeScale,
  LineController,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  LineController
);
import { Line } from 'react-chartjs-2';

const TemperatureChart = () => {
  const { data} = useDataContext();

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.time,
        datasets: [
          {
            fill: 'start',
            label: 'Temperature at 2m',
            data: data.temperature_2m,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            pointRadius: 1,
          },
        ],
      });
      setLoading(false);
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='pt-10 '>
          <Line options={options} data={chartData} />
        </div>
      )}
    </div>
  );
};

export default TemperatureChart;
