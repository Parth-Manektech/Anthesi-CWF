import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '..';

describe('Header Component', () => {
    test('renders Header component without crashing', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        expect(screen.getByText(/Ente appartenenza/i)).toBeInTheDocument();
    });

    test('renders the login button with correct text', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        expect(screen.getByText(/Accedi all'area personale/i)).toBeInTheDocument();
    });

    test('renders social media icons', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        expect(screen.getByLabelText(/Facebook/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Github/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Twitter/i)).toBeInTheDocument();
    });

    test('renders search link with correct aria-label', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        expect(screen.getByLabelText(/Cerca nel sito/i)).toBeInTheDocument();
    });

    test('renders second header bar with links', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
    });
});