import './App.css'
import { DataProvider } from './context/DataContext.jsx';
import { ToggleProvider } from './context/ToggleContext.jsx';
import TemperatureChart from './components/areaChart'
import CurrentWeather from './components/currentinfo.jsx';
import WeaklyOverview from './components/WeeklyOverview.jsx';
import Header from './components/Header.jsx';


function App() {
  return (
    <ToggleProvider>
    <DataProvider>
      <Header/>
      <div className='flex flex-row space-x-4 m-6'>
        <div  className="basis-1/4 rounded-lg shadow-lg pt-4" >
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
      <div><p>The data in this project is sourced from the <a href="https://open-meteo.com/en/docs" target="_blank" rel="noopener noreferrer">Open-Meteo APIs</a>.</p></div>
    </DataProvider>
    </ToggleProvider>
  );
}

export default App;