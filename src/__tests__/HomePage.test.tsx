import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';

describe('HomePage Component', () => {
  it('renders hero section with main title', () => {
    render(<HomePage />);
    expect(screen.getByText(/在台灣跑出/i)).toBeInTheDocument();
    expect(screen.getByText(/日本榮耀/i)).toBeInTheDocument();
  });

  it('renders registration event steps', () => {
    render(<HomePage />);
    expect(screen.getByText(/註冊帳號/i)).toBeInTheDocument();
    expect(screen.getByText(/上傳數據/i)).toBeInTheDocument();
    expect(screen.getByText(/線上報名/i)).toBeInTheDocument();
    expect(screen.getByText(/解鎖榮耀/i)).toBeInTheDocument();
  });

  it('renders sakura routes section', () => {
    render(<HomePage />);
    expect(screen.getByText(/追櫻路線 & 台灣練跑地/i)).toBeInTheDocument();
    expect(screen.getByText(/武陵農場櫻花跑/i)).toBeInTheDocument();
  });

  it('renders knowledge section', () => {
    render(<HomePage />);
    expect(screen.getByText(/身體健康：強健心肺/i)).toBeInTheDocument();
    expect(screen.getByText(/腦袋清晰：自律思維/i)).toBeInTheDocument();
  });

  it('renders comment board section', () => {
    render(<HomePage />);
    expect(screen.getByText(/跑者留言板/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/說點什麼來激勵其他跑者.../i)).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<HomePage />);
    expect(screen.getByText(/© 2026 櫻色富士線上路跑/i)).toBeInTheDocument();
  });

  it('displays correct number of registered participants', () => {
    render(<HomePage />);
    expect(screen.getByText(/\+1,248/i)).toBeInTheDocument();
    expect(screen.getByText(/人已報名/i)).toBeInTheDocument();
  });

  it('renders GPX download buttons for routes', () => {
    render(<HomePage />);
    const downloadButtons = screen.getAllByText(/下載 GPX/i);
    expect(downloadButtons.length).toBeGreaterThan(0);
  });
});
