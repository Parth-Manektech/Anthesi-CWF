import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectAddress from '..';


describe('SelectAddress Component', () => {
    test('renders the form with all fields', () => {
        render(<SelectAddress />);

        // Check for the presence of the form title and ID request
        expect(screen.getByText(/Selezionare Stato, Provincia e Comune/i)).toBeInTheDocument();
        expect(screen.getByText(/ID richiesta: 12345/i)).toBeInTheDocument();

        // Check for the state select input
        expect(screen.getByLabelText(/Stato/i)).toBeInTheDocument();

        // Check for the province select input
        expect(screen.getByLabelText(/Provincia/i)).toBeInTheDocument();

        // Check for the municipality select input
        expect(screen.getByLabelText(/Comune/i)).toBeInTheDocument();

        // Check for the buttons
        expect(screen.getByRole('button', { name: /Indietro/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Prosegui/i })).toBeInTheDocument();
    });

    test('renders with initial empty select options', () => {
        render(<SelectAddress />);

        // Check that the state select input is present and has no selected value
        const stateSelect = screen.getByLabelText(/Stato/i);
        expect(stateSelect).toBeInTheDocument();
        expect(stateSelect).toHaveValue(''); // Assuming it should have an empty value initially

        // Check that the province and municipality selects are present but disabled
        const provinceSelect = screen.getByLabelText(/Provincia/i);
        const municipalitySelect = screen.getByLabelText(/Comune/i);

        expect(provinceSelect).toBeDisabled();
        expect(municipalitySelect).toBeDisabled();
    });
});