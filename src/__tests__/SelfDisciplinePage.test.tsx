import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelfDisciplinePage from '../pages/SelfDisciplinePage';

describe('SelfDisciplinePage Component', () => {
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    mockSetIsLoggedIn.mockClear();
  });

  it('renders dashboard by default', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByText(/我的路跑紀實/i)).toBeInTheDocument();
  });

  it('displays user stats correctly', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByText(/48.5/i)).toBeInTheDocument(); // 累計里程
    expect(screen.getByText(/12.5/i)).toBeInTheDocument(); // 運動時數
    expect(screen.getByText(/4/i)).toBeInTheDocument(); // 解鎖勳章
  });

  it('displays training logs', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByText(/淡水天元宮櫻花環線/i)).toBeInTheDocument();
    expect(screen.getByText(/內湖樂活公園/i)).toBeInTheDocument();
  });

  it('allows user to check in', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const checkInButton = screen.getByText(/每日打卡/i);
    
    fireEvent.click(checkInButton);
    
    expect(screen.getByText(/今日已打卡/i)).toBeInTheDocument();
  });

  it('renders calendar with check-in days', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByText(/自律打卡月曆/i)).toBeInTheDocument();
    
    // Check if weekday headers are present
    expect(screen.getByText(/日/i)).toBeInTheDocument();
    expect(screen.getByText(/一/i)).toBeInTheDocument();
  });

  it('shows sync n8n button', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByText(/立即同步我的路跑紀錄/i)).toBeInTheDocument();
  });

  it('triggers smart run modal on button click', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const smartRunButton = screen.getByText(/模擬管家「下班夜跑」提醒/i);
    
    fireEvent.click(smartRunButton);
    
    expect(screen.getByText(/下班時間到了！/i)).toBeInTheDocument();
  });

  it('switches to stats page when clicking stats tab', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const statsButton = screen.getByText(/數據分析/i);
    
    fireEvent.click(statsButton);
    
    expect(screen.getByText(/數據分析報告/i)).toBeInTheDocument();
    expect(screen.getByText(/Weekly Running Performance Chart/i)).toBeInTheDocument();
  });

  it('displays weekly stats chart on stats page', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const statsButton = screen.getByText(/數據分析/i);
    
    fireEvent.click(statsButton);
    
    // Check for stats metrics
    expect(screen.getByText(/平均配速/i)).toBeInTheDocument();
    expect(screen.getByText(/卡路里消耗/i)).toBeInTheDocument();
    expect(screen.getByText(/海拔爬升/i)).toBeInTheDocument();
    expect(screen.getByText(/最大心率/i)).toBeInTheDocument();
  });

  it('shows logout modal when clicking logout', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const logoutButton = screen.getByText(/LOGOUT/i);
    
    fireEvent.click(logoutButton);
    
    expect(screen.getByText(/要暫時休息嗎？/i)).toBeInTheDocument();
  });

  it('calls setIsLoggedIn(false) when confirming logout', () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const logoutButton = screen.getByText(/LOGOUT/i);
    
    fireEvent.click(logoutButton);
    
    const confirmButton = screen.getByText(/確定登出/i);
    fireEvent.click(confirmButton);
    
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
  });

  it('syncs n8n data when clicking sync button', async () => {
    render(<SelfDisciplinePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);
    const syncButton = screen.getByText(/立即同步我的路跑紀錄/i);
    
    fireEvent.click(syncButton);
    
    expect(screen.getByText(/同步中.../i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/立即同步我的路跑紀錄/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
