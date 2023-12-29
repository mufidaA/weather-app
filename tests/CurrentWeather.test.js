import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentWeather from '../src/components/CurrentWeather';
import { useDataContext } from '../src/context/DataContext';
import { useToggleContext } from '../src/context/ToggleContext';
import { WiThermometerExterior,  WiThermometer } from 'weather-icons-react'; 

jest.mock('../src/context/DataContext.jsx', () => ({
  useDataContext: jest.fn(),
}));
jest.mock('../src/context/ToggleContext', () => ({
  useToggleContext: jest.fn(),
}));
jest.mock('weather-icons-react', () => ({
  WiThermometerExterior: () => <div>MockWiThermometerExterior</div>,
  WiThermometer: () => <div>MockWiThermometer</div>,
}));
jest.mock('../src/services/DateTimeFormat.js', () => ({
  getCurrentDateTimeString: jest.fn(() => ({ formattedDate: 'mockDate', displayDate: 'Mock Display Date' })),
}));

describe('CurrentWeather', () => {
  it('renders current weather with temperature above -5', () => {
    useDataContext.mockReturnValue({ data: { time: ['mockDate'], temperature_2m: [10] } });
    useToggleContext.mockReturnValue({ unit: '°C' });

    render(<CurrentWeather />);

    expect(screen.getByText('Mock Display Date')).toBeInTheDocument();
    expect(screen.getByText('10 °C')).toBeInTheDocument();
    expect(screen.getByText('MockWiThermometerExterior')).toBeInTheDocument();
  });

  it('renders current weather with temperature below -5', () => {

    useDataContext.mockReturnValue({ data: { time: ['mockDate'], temperature_2m: [-10] } });
    useToggleContext.mockReturnValue({ unit: '°C' });

    render(<CurrentWeather />);

    expect(screen.getByText('Mock Display Date')).toBeInTheDocument();
    expect(screen.getByText('-10 °C')).toBeInTheDocument();
    expect(screen.getByText('MockWiThermometer')).toBeInTheDocument();
  });
});
