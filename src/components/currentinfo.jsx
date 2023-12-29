import { useState, useEffect } from 'react';
import {useDataContext} from '../context/DataContext.jsx';
import { WiThermometerExterior, WiThermometer } from 'weather-icons-react';
import { getCurrentDateTimeString } from './dateTime.js';

const CurrentWeather = () => {
    const { data} = useDataContext();

    const [currentTemperature, setCurrentTemperature] = useState();

  useEffect(() => {
    const currentDateTimeString = getCurrentDateTimeString();
    if (data)  {
      const index = data.time.indexOf(currentDateTimeString.formattedDate);
      if (index !== -1) {
        const matchingTemperature = data.temperature_2m[index];
        console.log('Matching Temperature:', matchingTemperature);
        setCurrentTemperature(matchingTemperature);
      } else {
        console.log('Current DateTime not found in the array.');
      }
    }
  }, [data]);

  const { displayDate} = getCurrentDateTimeString();

  const isTemperatureBelowMinus5 = currentTemperature < -5;
  
  return (
    <div className="flex flex-col p-8 ">
      <div className='text-xl font-semibold pt-6'>Current Weather</div>
      <div className='pt-6'>{displayDate}</div>

      <div className='text-xl pt-2'>{currentTemperature} °</div>
      <div>
      {isTemperatureBelowMinus5 ? (
          <WiThermometer className="icon" size={80} color='#38bdf8' />
        ) : (
  
          <WiThermometerExterior className="icon" size={80} color='#38bdf8' />
      )}
      </div>
    </div>
  );
}

export default CurrentWeather;