import { useToggleContext } from '../context/ToggleContext';


const ToggleTemperatureUnit = () => {
  const { isOn, toggleSwitch } = useToggleContext();

  return (
    <button className='max-w-16' onClick={toggleSwitch}>
      {isOn ? '°F' : '°C'}
    </button>
  );
};

export default ToggleTemperatureUnit;