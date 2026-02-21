import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders home page by default', () => {
    render(<App />);
    // Check if the main logo/title is present
    expect(screen.getAllByText(/櫻色富士/i).length).toBeGreaterThan(0);
  });

  it('renders navigation bar', () => {
    render(<App />);
    const homeButtons = screen.getAllByText(/首頁/i);
    expect(homeButtons.length).toBeGreaterThan(0);
  });

  it('shows login page when clicking on discipline tab while not logged in', () => {
    render(<App />);
    const disciplineButtons = screen.getAllByText(/自律表/i);
    fireEvent.click(disciplineButtons[0]);
    
    // Should show login form
    expect(screen.getByPlaceholderText(/輸入跑者編號/i)).toBeInTheDocument();
  });

  it('saves login state to localStorage', () => {
    render(<App />);
    const disciplineButtons = screen.getAllByText(/自律表/i);
    fireEvent.click(disciplineButtons[0]);
    
    // Fill in login form
    const runnerIdInput = screen.getByPlaceholderText(/輸入跑者編號/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const loginButton = screen.getByText(/進入系統/i);
    
    fireEvent.change(runnerIdInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    // Check localStorage
    expect(localStorage.getItem('fuji_is_logged_in')).toBe('true');
  });

  it('shows logout confirmation when navigate from discipline to home', () => {
    localStorage.setItem('fuji_is_logged_in', 'true');
    render(<App />);
    
    // Click on discipline first
    const disciplineButtons = screen.getAllByText(/自律表/i);
    fireEvent.click(disciplineButtons[0]);
    
    // Then click home
    const homeButtons = screen.getAllByText(/首頁/i);
    fireEvent.click(homeButtons[0]);
    
    // Should show logout confirmation
    expect(screen.getByText(/即將離開頁面/i)).toBeInTheDocument();
  });
});
