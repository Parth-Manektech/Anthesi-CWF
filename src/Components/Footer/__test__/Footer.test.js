import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '..';


describe('Footer Component', () => {
    test('renders the main footer element', () => {
        render(<Footer />);
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
    });

    test('renders administration section with correct links', () => {
        render(<Footer />);
        const giuntaLink = screen.getByText(/Giunta e consiglio/i);
        expect(giuntaLink).toBeInTheDocument();
        const dipendentiLink = screen.getByText(/Dipendenti/i);
        expect(dipendentiLink).toBeInTheDocument();
    });

    test('renders service section with correct links', () => {
        render(<Footer />);
        const serviziLink = screen.getByText(/Servizi/i);
        expect(serviziLink).toBeInTheDocument();
        const pagamentiLink = screen.getByText(/Pagamenti/i);
        expect(pagamentiLink).toBeInTheDocument();
    });

    test('renders social media icons', () => {
        render(<Footer />);
        expect(screen.getByLabelText(/Facebook/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Instagram/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Twitter/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/YouTube/i)).toBeInTheDocument();
    });

    test('renders contact section with correct information', () => {
        render(<Footer />);
        const contactTitle = screen.getByText(/Contatti/i);
        expect(contactTitle).toBeInTheDocument();
        const city = screen.getByText(/Comune di Lorem Ipsum/i);
        expect(city).toBeInTheDocument();
        const address = screen.getByText(/Piazza Lorem ipsum dolor, 23 09872 Nome della città/i);
        expect(address).toBeInTheDocument();
    });

    test('renders newsletter section with email input', () => {
        render(<Footer />);
        const newsletterTitle = screen.getByText(/NEWSLETTER/i);
        expect(newsletterTitle).toBeInTheDocument();
        const emailInput = screen.getByPlaceholderText(/indirizzo email/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('renders small prints section with correct links', () => {
        render(<Footer />);
        const mediaPolicyLink = screen.getByText(/Media policy/i);
        expect(mediaPolicyLink).toBeInTheDocument();
        const privacyPolicyLink = screen.getByText(/Privacy policy/i);
        expect(privacyPolicyLink).toBeInTheDocument();
    });
});
