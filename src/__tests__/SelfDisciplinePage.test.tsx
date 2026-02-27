import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelfDisciplinePage from '../pages/SelfDisciplinePage';

describe('SelfDisciplinePage Component - 新版自律表', () => {
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    mockSetIsLoggedIn.mockClear();
  });

  it('shows login modal when not logged in', () => {
    render(<SelfDisciplinePage isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByText(/跑者登入/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/電子郵件/i)).toBeInTheDocument();
  });

  it('shows registration modal after login', () => {
    const { rerender } = render(<SelfDisciplinePage isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const loginButton = screen.getByText(/立即登入/i);
    fireEvent.click(loginButton);
    
    rerender(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    expect(screen.getByText(/選擇挑戰組別/i)).toBeInTheDocument();
  });

  it('displays race categories correctly', () => {
    render(<SelfDisciplinePage isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const loginButton = screen.getByText(/立即登入/i);
    fireEvent.click(loginButton);
    
    expect(screen.getByText(/50km/i)).toBeInTheDocument();
    expect(screen.getByText(/25km/i)).toBeInTheDocument();
    expect(screen.getByText(/10km/i)).toBeInTheDocument();
    expect(screen.getByText(/大獎牌收藏組/i)).toBeInTheDocument();
  });

  it('shows region selection after category selection', () => {
    render(<SelfDisciplinePage isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const loginButton = screen.getByText(/立即登入/i);
    fireEvent.click(loginButton);
    
    const category50km = screen.getByText(/50km/i);
    fireEvent.click(category50km);
    
    expect(screen.getByText(/選擇居住地區/i)).toBeInTheDocument();
  });

  it('renders training plan tab by default after setup', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    // Login and select category
    const loginButton = screen.getByText(/立即登入/i);
    fireEvent.click(loginButton);
    
    const category50km = screen.getByText(/50km/i);
    fireEvent.click(category50km);
    
    // Complete region selection
    const regionSelect = screen.getByRole('combobox', { name: /地區/i });
    fireEvent.change(regionSelect, { target: { value: '北部' } });
    
    const citySelect = screen.getByRole('combobox', { name: /城市/i });
    fireEvent.change(citySelect, { target: { value: '台北市' } });
    
    const confirmButton = screen.getByText(/確認選擇/i);
    fireEvent.click(confirmButton);
    
    expect(screen.getByText(/訓練計畫表/i)).toBeInTheDocument();
  });

  it('displays progress cards with correct information', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    expect(screen.getByText(/剩餘公里/i)).toBeInTheDocument();
    expect(screen.getByText(/剩餘天數/i)).toBeInTheDocument();
    expect(screen.getByText(/已完成/i)).toBeInTheDocument();
  });

  it('can start training by clicking 訓練去 button', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const trainingButton = screen.getAllByText(/訓練去/i)[0];
    fireEvent.click(trainingButton);
    
    expect(screen.getByText(/GPS 追蹤中/i)).toBeInTheDocument();
  });

  it('switches to tracking tab when clicked', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const trackingTab = screen.getByText(/訓練記錄/i);
    fireEvent.click(trackingTab);
    
    expect(screen.getByText(/訓練歷程/i)).toBeInTheDocument();
  });

  it('switches to analytics tab when clicked', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const analyticsTab = screen.getByText(/數據分析/i);
    fireEvent.click(analyticsTab);
    
    expect(screen.getByText(/暫無數據分析/i)).toBeInTheDocument();
  });

  it('logs out when clicking LOGOUT button', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    
    const logoutButton = screen.getByText(/LOGOUT/i);
    fireEvent.click(logoutButton);
    
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
  });
});
