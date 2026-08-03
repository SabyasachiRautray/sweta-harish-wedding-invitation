import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wedding invitation and branding', () => {
  render(<App />);
  const invitationElement = screen.getByText(/You are cordially invited/i);
  expect(invitationElement).toBeInTheDocument();
  const brandingElement = screen.getByText(/Crafted with love tale/i);
  expect(brandingElement).toBeInTheDocument();
});

