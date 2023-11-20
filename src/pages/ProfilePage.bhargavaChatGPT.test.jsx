import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

// Mock the hooks and external modules
vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

describe('ProfilePage', () => {
  it('displays welcome message for signed in user with northwestern.edu email', () => {
    // Mock user data
    useAuth.mockImplementation(() => ({
      user: {
        uid: '123',
        displayName: 'John Doe',
        email: 'johndoe@northwestern.edu'
      }
    }));

    useNavigate.mockImplementation(() => vi.fn());

    // Mock props
    const lostPosts = {};
    const foundPosts = {};

    // Render component
    render(<ProfilePage lostPosts={lostPosts} foundPosts={foundPosts} />);

    // Assert that the welcome message is displayed
    expect(screen.getByText(`Welcome`)).toBeTruthy();
  });
});
