import { useState, useEffect } from 'react';
import {useDataContext} from '../context/DataContext.jsx';
import { useToggleContext } from '../context/ToggleContext.jsx';
import { WiThermometerExterior, WiThermometer } from 'weather-icons-react';
import { getCurrentDateTimeString } from '../services/DateTimeFormat';
import { isTemperatureBelowThreshold } from '../services/IconsHelper';

const CurrentWeather = () => {
    const { data} = useDataContext();
    const {unit } = useToggleContext();

    const [currentTemperature, setCurrentTemperature] = useState();

  useEffect(() => {
    const currentDateTimeString = getCurrentDateTimeString();
    if (data)  {
      const index = data.time.indexOf(currentDateTimeString.formattedDate);
      if (index !== -1) {
        const matchingTemperature = data.temperature_2m[index];
        setCurrentTemperature(matchingTemperature);
      } else {
        console.log('Current DateTime not found in the array.');
        setCurrentTemperature(null);
      }
    }
  }, [data]);

  const { displayDate} = getCurrentDateTimeString();
  
  const isBelowMinus5Celsius = isTemperatureBelowThreshold(unit, currentTemperature);

  
  return (
    <div className="flex flex-col p-8">
      <div className='text-xl font-semibold pt-6'>Current Weather</div>
      <div className='pt-6'>{displayDate}</div>
      {currentTemperature !== null ? (
        <>
          <div className='text-xl pt-2'>{currentTemperature} {unit}</div>
          <div className='grid grid-cols-1 gap-4 place-items-center h-30'>
            {isBelowMinus5Celsius ? (
              <WiThermometer className="icon" size={80} color='#38bdf8' />
            ) : (
              <WiThermometerExterior className="icon" size={80} color='#38bdf8' />
            )}
          </div>
        </>
      ) : (
        <div>No available data</div>
      )}
    </div>
  );
}

export default CurrentWeather;