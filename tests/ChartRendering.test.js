import React from 'react';
import { render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TemperatureChart from '../src/components/HourlyTemperatureChart';
import { useDataContext } from '../src/context/DataContext';


jest.mock('../src/context/DataContext.jsx', () => ({
  useDataContext: jest.fn(),
}));

describe('TemperatureChart', () => {
  it('renders loading message when data is not available', () => {
    useDataContext.mockReturnValue({ data: null });

    const { getByText } = render(<TemperatureChart />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the chart when data is available', async () => {
    useDataContext.mockReturnValue({
      data: {
        time: ["2023-12-29T00:00","2023-12-29T01:00","2024-01-04T15:00","2024-01-04T20:00","2024-01-04T21:00"],
        temperature_2m: [20, 22, 18, 740,-100,10],
      },
    });
  
    const { getByRole } = render(<TemperatureChart />);
    await waitFor(() => {
      expect(getByRole('img')).toBeInTheDocument();
    });
  });  
});
