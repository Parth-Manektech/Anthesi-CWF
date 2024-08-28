import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '..';

// Mock the SelectAddress component
jest.mock('../../../Components/SelectAddress', () => () => <div>SelectAddress Mock</div>);

describe('Home Component', () => {
    test('renders Home component with SelectAddress', () => {
        render(<Home />);

        // Check that the Home section is rendered
        const homeSection = screen.getByRole('region', { name: /home/i });
        expect(homeSection).toBeInTheDocument();

        // Check that the SelectAddress component is rendered
        expect(screen.getByText(/SelectAddress Mock/i)).toBeInTheDocument();
    });

    test('renders the home container', () => {
        render(<Home />);

        // Check that the home container is rendered
        const homeContainer = screen.getByRole('region', { name: /home/i });
        expect(homeContainer.firstChild).toHaveClass('homecontainer');
    });
});
