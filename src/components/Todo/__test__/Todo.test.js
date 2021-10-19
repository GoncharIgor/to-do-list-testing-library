import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import Todo from '../Todo';
import {BrowserRouter} from "react-router-dom";

const MockTodo = () => (
    <BrowserRouter>
        <Todo/>
    </BrowserRouter>
);

const addTasks = (tasks) => {
    const inputElement = screen.getByPlaceholderText(/add a new task here.../i);
    const buttonElement = screen.getByRole('button', {name: 'Add'});

    tasks.forEach((task) => {
        fireEvent.change(inputElement, {target: {value: task}});
        fireEvent.click(buttonElement);
    })
}


afterEach(cleanup);

describe('Todo', () => {
    test('should add task to the list of tasks', () => {
        render(<MockTodo/>);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i); // can be either string or RegExp
        const buttonElement = screen.getByRole('button', {name: 'Add'});

        fireEvent.change(inputElement, {target: {value: 'First task'}});
        fireEvent.click(buttonElement);

        const divElement = screen.getByText('First task');
        expect(divElement).toBeInTheDocument();
    });

    test('should add 3 tasks to the list of tasks', () => {
        render(<MockTodo/>);
       addTasks(['First task', 'Second', 'Third']);

        const divElements = screen.getAllByTestId('task-list-item');
        expect(divElements.length).toBe(3);
    });

    test('task should not have "completed" class when initially rendered', () => {
        render(<MockTodo/>);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i); // can be either string or RegExp
        const buttonElement = screen.getByRole('button', {name: 'Add'});

        fireEvent.change(inputElement, {target: {value: 'First task'}});
        fireEvent.click(buttonElement);

        const divElement = screen.getByText('First task');
        expect(divElement).not.toHaveClass('todo-item-completed')
    });

    test('task should have "completed" class when being clicked', () => {
        render(<MockTodo/>);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i); // can be either string or RegExp
        const buttonElement = screen.getByRole('button', {name: 'Add'});

        fireEvent.change(inputElement, {target: {value: 'First task'}});
        fireEvent.click(buttonElement);

        const divElement = screen.getByText('First task');
        fireEvent.click(divElement);

        expect(divElement).toHaveClass('todo-item-completed')
    });
});
