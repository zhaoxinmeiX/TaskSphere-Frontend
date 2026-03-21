import { render } from '@testing-library/react';
import App from './App';
import { it, expect } from 'vitest';

it('renders the App component without crashing', () => {
  render(<App />);
  // We just verify it renders successfully since the default is the Login page
  expect(document.body).toBeInTheDocument();
});
