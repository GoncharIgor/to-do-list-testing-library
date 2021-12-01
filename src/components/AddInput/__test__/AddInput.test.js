import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddInput from '../AddInput';

// jest mock f() that does nothing
const mockSetTodos = jest.fn();

// if you put this hook inside "describe", it will be executed only for tests inside this block
// It's already done automatically by @testing-library
// afterEach(cleanup);

describe('AddInput', () => {

    test('should render input element', () => {
        // we can destructure "getByPlaceholderText" f() from render() f(), and not use "screen" object to call it
        // but better to use .screen f()s
        // const { getByPlaceholderText } = render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i);

        expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type in input', () => {
        render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i);

        // old way, with usage of "fireEvent"
        // fireEvent.change(inputElement, {target: {value: 'Go shopping'}});
        userEvent.type(inputElement, 'Go shopping');

        expect(inputElement.value).toBe('Go shopping');
    });

    test('should have input empty input after "Add" button is clicked', () => {
        render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i);
        const buttonElement = screen.getByRole('button', {name: /add/i});

        userEvent.type(inputElement,  'Go shopping');
        userEvent.click(buttonElement);

        expect(inputElement.value).toBe('');
    });
});
