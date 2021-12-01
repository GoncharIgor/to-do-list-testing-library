// supports default test file name pattern, as jest does: ComponentName.test.js
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
    // GET BY:
    test('should render same text passed into title prop', () => {
        render(<Header title="My header" />);
        // screen - a way to interact with the component, we render
        const headingElement = screen.getByText(/my header/i);

        expect(headingElement).toBeInTheDocument();
    });

    test('should be able to get element by its tag role', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.getByRole('heading');

        expect(headingElement).toBeInTheDocument();
    });

    test('should be able to get element by role tag with accessible text in it', () => {
        render(<Header title="My Header" />);
        // the name is taken from "title" attribute
        // if there were no "title" attribute, then just a text inside <h1> tag would be taken
        const headingElement = screen.getByRole('heading', {name: 'header - My Header'});

        expect(headingElement).toBeInTheDocument();
    });

    test('should be able to get element by title', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.getByTitle('header - My Header');

        expect(headingElement).toBeInTheDocument();
    });

    test('should be able to get element by testId', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.getByTestId('page-header');

        expect(headingElement).toBeInTheDocument();
    });

// FIND BY:
    test('should render same text passed into title prop, with findBy method', async () => {
        render(<Header title="My Header" />);
        const headingElement = await screen.findByText(/my header/i);

        expect(headingElement).toBeInTheDocument();
    });

// QUERY BY:
    test('should not render not existing title', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.queryByText(/not existing title/i);

        expect(headingElement).not.toBeInTheDocument();
    });

    test('should render only 1 heading tag', () => {
        render(<Header title="My Header" />);
        const headingElements = screen.getAllByRole('heading');

        expect(headingElements).toHaveLength(1);
        // instead of old way of checking array length:
        // expect(headingElements.length).toBe(1);
    });
});
