import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';
import { CommunityProvider } from '../store/CommunityContext';

describe('HomePage Component', () => {
  const renderHomePage = () => {
    return render(
      <CommunityProvider>
        <HomePage />
      </CommunityProvider>
    );
  };

  it('renders hero section with main title', async () => {
    renderHomePage();
    // Wait for async state updates to complete
    await waitFor(() => {
      const headings = screen.getAllByText(/在台灣跑出/i);
      expect(headings.length).toBeGreaterThan(0);
    });
    expect(screen.getByText(/日本榮耀/i)).toBeInTheDocument();
  });

  it('renders registration event steps', async () => {
    renderHomePage();
    // Wait for async data loading
    await waitFor(() => {
      expect(screen.getByText(/註冊帳號/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/上傳數據/i)).toBeInTheDocument();
    expect(screen.getByText(/線上報名/i)).toBeInTheDocument();
    expect(screen.getByText(/解鎖榮耀/i)).toBeInTheDocument();
  });

  it('renders sakura routes section', async () => {
    renderHomePage();
    // Wait for async data loading
    await waitFor(() => {
      expect(screen.getByText(/追櫻路線 & 台灣練跑地/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/武陵農場櫻花跑/i)).toBeInTheDocument();
  });

  it('renders knowledge section', () => {
    renderHomePage();
    expect(screen.getByText(/身體健康：強健心肺/i)).toBeInTheDocument();
    expect(screen.getByText(/腦袋清晰：自律思維/i)).toBeInTheDocument();
  });

  it('renders comment board section', () => {
    renderHomePage();
    expect(screen.getByText(/跑者留言板/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/說點什麼來激勵其他跑者.../i)).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderHomePage();
    expect(screen.getByText(/© 2026 櫻色富士線上路跑/i)).toBeInTheDocument();
  });

  it('displays correct number of registered participants', () => {
    renderHomePage();
    expect(screen.getByText(/\+1,248/i)).toBeInTheDocument();
    expect(screen.getByText(/人已報名/i)).toBeInTheDocument();
  });

  it('renders GPX download buttons for routes', async () => {
    renderHomePage();
    // Wait for routes to load
    await waitFor(() => {
      const gpsButtons = screen.getAllByText(/GPS 路线/i);
      expect(gpsButtons.length).toBeGreaterThan(0);
    });
  });
});
