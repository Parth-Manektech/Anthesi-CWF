import { render, act } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  await act(async () => {
    render(<App />);
  });
});
