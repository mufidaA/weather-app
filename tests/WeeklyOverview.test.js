import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import WeeklyOverview from '../src/components/WeeklyOverview';
import { useDataContext } from '../src/context/DataContext';
import { useToggleContext } from '../src/context/ToggleContext';
import { WiThermometerExterior } from 'weather-icons-react'; 



jest.mock('../src/context/DataContext.jsx', () => ({
  useDataContext: jest.fn(),
}));

jest.mock('../src/context/ToggleContext.jsx', () => ({
  useToggleContext: jest.fn(),
}));

describe('WeeklyOverview', () => {
  it('renders loading message when data is not available', () => {

    useDataContext.mockReturnValue({ data: null });
    useToggleContext.mockReturnValue({ unit: '°C' });

    render(<WeeklyOverview />);

  
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders weekly overview when data is available', () => {
    const mockData = {
      time: ["2023-12-29T00:00","2023-12-29T01:00","2024-01-04T15:00","2024-01-04T20:00","2024-01-04T21:00"],
      temperature_2m: [20, 22, 18, 740,-100,10],
    };

    useDataContext.mockReturnValue({ data: mockData });
    useToggleContext.mockReturnValue({ unit: '°C' });

    render(<WeeklyOverview />);


    expect(screen.getByText('Weekly Overview')).toBeInTheDocument();
   
  });
});
