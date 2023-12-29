import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';

test('renders App component', () => {
  const { getByText } = render(<App />);

  const headerElement = getByText(/Weather App/i);
  const dataInfoElement = getByText(/The data in this project is sourced from the/i);
  
  expect(headerElement).toBeInTheDocument();
  expect(dataInfoElement).toBeInTheDocument();
});
