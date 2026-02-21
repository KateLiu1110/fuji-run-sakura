import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage';

describe('LoginPage Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  it('renders login form with title', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    expect(screen.getByText(/櫻色富士/i)).toBeInTheDocument();
    expect(screen.getByText(/ATRÉ PROJECT 跑者登入/i)).toBeInTheDocument();
  });

  it('renders runner ID input field', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    const runnerIdInput = screen.getByPlaceholderText(/輸入跑者編號/i);
    expect(runnerIdInput).toBeInTheDocument();
    expect(runnerIdInput).toHaveAttribute('type', 'text');
  });

  it('renders password input field', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('renders submit button', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    const submitButton = screen.getByText(/進入系統/i);
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('updates input values on change', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    const runnerIdInput = screen.getByPlaceholderText(/輸入跑者編號/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;

    fireEvent.change(runnerIdInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(runnerIdInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls onLogin when form is submitted', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    const runnerIdInput = screen.getByPlaceholderText(/輸入跑者編號/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByText(/進入系統/i);

    fireEvent.change(runnerIdInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it('requires both fields to be filled', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    const runnerIdInput = screen.getByPlaceholderText(/輸入跑者編號/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);

    expect(runnerIdInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('displays lock icon', () => {
    const { container } = render(<LoginPage onLogin={mockOnLogin} />);
    const lockIcon = container.querySelector('svg');
    expect(lockIcon).toBeInTheDocument();
  });
});
