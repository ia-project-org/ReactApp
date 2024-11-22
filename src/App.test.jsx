import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// to run tests: npm test

test('renders Vite + React and the count button works', () => {
  render(<App />);
  
  expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
  expect(screen.getByAltText('React logo')).toBeInTheDocument();
  
  const button = screen.getByText(/count is \d+/);
  expect(button).toBeInTheDocument();
  
  fireEvent.click(button);
  expect(screen.getByText(/count is 1/)).toBeInTheDocument();
});