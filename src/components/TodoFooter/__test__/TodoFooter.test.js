// supports default test fine name pattern, as jest does: ComponentName.test.js
import { render, screen } from '@testing-library/react';
import TodoFooter from '../TodoFooter';
import {BrowserRouter} from 'react-router-dom';

const MockTodoFooter = ({numberOfIncompleteTasks}) => (
    <BrowserRouter>
        <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
    </BrowserRouter>
)

describe('TodoFooter', () => {
    test('should render the correct amount of incomplete tasks', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={5} />);
        const paragraphElement = screen.getByText(/5 tasks left/i);

        expect(paragraphElement).toBeInTheDocument();
    });

    test('should render "task" when number of incomplete tasks is one', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);

        expect(paragraphElement).toBeInTheDocument();
    });

// for "display:none", or "opacity: 0" cases
    test('should be visible to user, not just present in DOM', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);

        expect(paragraphElement).toBeVisible()
    });

    test('should render a "p" tag', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);

        expect(paragraphElement).toContainHTML("p")
    });

    test('should have text "1 task left" for 1 incomplete task', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByTitle('number of left tasks');

        expect(paragraphElement).toHaveTextContent('1 task left');
    });

    test('should be able to get element attributes', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByTitle('number of left tasks');

        // element.value - for <input> tag
        // element.textContent - for other text tags
        expect(paragraphElement.textContent).toBe('1 task left');
    });
})
