import { useDataContext } from '../context/DataContext.jsx';
import { useToggleContext } from '../context/ToggleContext';
import { WiThermometerExterior, WiThermometer } from 'weather-icons-react';
import { getCurrentDateTimeString } from '../services/DateTimeFormat';
import { isTemperatureBelowThreshold } from '../services/IconsHelper';

const WeeklyOverview = () => {
  const { data } = useDataContext();
  const {unit } = useToggleContext();

  if (!data) {
    return <div>Loading...</div>;
  }

  const dailyData = data.time.map((time, index) => ({
    time,
    temperature: data.temperature_2m[index],
  }));

  const groupedData = dailyData.reduce((acc, entry) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const date = new Date(entry.time).toLocaleDateString('en-US', options);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry.temperature);
    return acc;
  }, {});



  const calculateMinMaxAverage = (temperatures) => {
    console.log(temperatures)
    const minTemperature = Math.min(...temperatures).toFixed(1);
    const maxTemperature = Math.max(...temperatures).toFixed(1);
    const sum = temperatures.reduce( (acc, temperature) => acc + temperature, 0);
    const averageTemperature = ( sum / temperatures.length).toFixed(1);
  
    return { minTemperature, maxTemperature, averageTemperature };


  };
  
  const dailyMinMaxArray = Object.entries(groupedData).map(([date, temperatures]) => {
    return { date, ...calculateMinMaxAverage(temperatures) };
  });
  
  const { today } = getCurrentDateTimeString();
  
  const averageTemperature = dailyMinMaxArray.reduce(
    (acc, entry) => acc + parseFloat(entry.averageTemperature),
    0
  ) / dailyMinMaxArray.length;
  
  
  const isBelowMinus5Celsius = isTemperatureBelowThreshold(unit, averageTemperature);
  
  return (
    <div className='flex flex-row space-x-4 p-8 m-2'>
      <div className='text-xl font-semibold pt-6'>Weekly Overview</div>
      {dailyMinMaxArray.map(({ date, minTemperature, maxTemperature }) => (
        <div key={date} className=' rounded-lg shadow-md shadow-indigo-500/50 p-8'>
          <p>{date === today ? 'Today' : date}</p>

          <div className='mx-8'>
          {isBelowMinus5Celsius ? (
              <WiThermometer className="icon" size={40} color='#38bdf8' />
            ) : (
              <WiThermometerExterior className="icon" size={40} color='#38bdf8' />
            )}
          </div>

          <div className='flex flex-row space-x-2 text-sm'>
            <p className='text-sky-400'>{`${minTemperature}${unit}`}</p>
            <p> {`${maxTemperature}${unit}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyOverview;
