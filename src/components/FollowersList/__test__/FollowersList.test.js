import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import FollowersList from '../FollowersList';
import {BrowserRouter} from "react-router-dom";

const MockFollowersList = () => (
    <BrowserRouter>
        <FollowersList />
    </BrowserRouter>
)

afterEach(cleanup);

describe('FollowersList', () => {
    test('should render the first user', async() => {
        render(<MockFollowersList />);
        const followerDivElement = await screen.findByTestId('follower-item-0');
        expect(followerDivElement).toBeInTheDocument();
    });

    test('should render all 5 users', async() => {
        render(<MockFollowersList />);
        const followerDivElements = await screen.findAllByTestId(/follower-item/i);
        expect(followerDivElements.length).toBe(5);
    });
});
