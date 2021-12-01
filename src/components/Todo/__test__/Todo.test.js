import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from "react-router-dom";

import Todo from '../Todo';

const MockTodo = () => (
    <BrowserRouter>
        <Todo/>
    </BrowserRouter>
);

const addTasks = (tasks) => {
    const inputElement = screen.getByPlaceholderText(/add a new task here.../i);
    const buttonElement = screen.getByRole('button', {name: 'Add'});

    tasks.forEach((task) => {
        userEvent.type(inputElement, task);
        userEvent.click(buttonElement);
    })
}

describe('Todo', () => {
    test('should add task to the list of tasks', () => {
        render(<MockTodo/>);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i); // can be either string or RegExp
        const buttonElement = screen.getByRole('button', {name: 'Add'});

        userEvent.type(inputElement,'First task');
        userEvent.click(buttonElement);

        const divElement = screen.getByText('First task');
        expect(divElement).toBeInTheDocument();
    });

    test('should add 3 tasks to the list of tasks', () => {
        render(<MockTodo/>);
       addTasks(['First task', 'Second', 'Third']);

        const divElements = screen.getAllByTestId('task-list-item');
        expect(divElements).toHaveLength(3);
    });

    test('task should not have "completed" class when initially rendered', () => {
        render(<MockTodo/>);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i); // can be either string or RegExp
        const buttonElement = screen.getByRole('button', {name: 'Add'});

        userEvent.type(inputElement, 'First task');
        userEvent.click(buttonElement);

        const divElement = screen.getByText('First task');
        expect(divElement).not.toHaveClass('todo-item-completed')
    });

    test('task should have "completed" class when being clicked', () => {
        render(<MockTodo/>);
        const inputElement = screen.getByPlaceholderText(/add a new task here.../i); // can be either string or RegExp
        const buttonElement = screen.getByRole('button', {name: 'Add'});

        userEvent.type(inputElement,'First task');
        userEvent.click(buttonElement);

        const divElement = screen.getByText('First task');
        userEvent.click(divElement);

        expect(divElement).toHaveClass('todo-item-completed')
    });
});
