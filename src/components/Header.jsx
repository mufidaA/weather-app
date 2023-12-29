import { WiDayCloudyHigh } from 'weather-icons-react';
import ToggleTemperatureUnit from './ToggleTemperatureUnit';
const Header = () => {
  return (
    <header className='grid grid-cols-2 m-2' >
        <div className='flex flex-row text-xl font-semibold pl-6'>
         <WiDayCloudyHigh className="icon" size={40} color="#38bdf8" />
         <p>Weather</p>
        </div>
        <div className='place-self-end pr-2'><ToggleTemperatureUnit/></div>
    </header>
  );
};

export default Header;