import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DataProvider } from './context/DataContext.jsx';
import TemperatureChart from './components/areaChart'
import CurrentWeather from './components/currentinfo.jsx';
import WeaklyOverview from './components/WeeklyOverview.jsx';

function App() {
  return (
    <DataProvider>

    <div className='flex flex-row space-x-4'>
      <div  className="basis-1/4 rounded-lg shadow-lg pt-10" >
          <CurrentWeather />
      </div>
      <div className='flex flex-col basis-1/2 rounded-lg shadow-lg p-8'>
          <div  className="basis-1/4 " >
          <WeaklyOverview />
          </div>
          <div  className="basis-1" >
          <TemperatureChart />
          </div>
      </div>
    </div>
    </DataProvider>
  );
}

export default App;