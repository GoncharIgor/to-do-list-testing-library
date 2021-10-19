import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import AddInput from '../AddInput';

// jest mock f() that does nothing
const mockSetTodos = jest.fn();

// if you put this hook inside "describe", it will be executed only for tests inside this block
afterEach(cleanup);

describe('AddInput', () => {

    test('should render input element', () => {
        // we can desctucture "getByPlaceholderText" f() from render() f(), and not use "screen" object to call it
        const { getByPlaceholderText } = render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        const inputElement = getByPlaceholderText(/add a new task here.../i);

        expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type in input', () => {
        render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i);
        fireEvent.change(inputElement, {target: {value: 'Go shopping'}});

        expect(inputElement.value).toBe('Go shopping');
    });

    test('should have input empty input after "Add" button is clicked', () => {
        render(<AddInput todos={[]} setTodos={mockSetTodos} />);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i);
        const buttonElement = screen.getByRole('button', {name: /add/i});

        fireEvent.change(inputElement, {target: {value: 'Go shopping'}});
        fireEvent.click(buttonElement);

        expect(inputElement.value).toBe('');
    });
});
