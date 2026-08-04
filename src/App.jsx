import React, { useState, useEffect } from 'react';
import ComingSoonPage from './components/ComingSoonPage';
import LivePreviewModal from './components/LivePreviewModal';
import PaymentModal from './components/PaymentModal';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import { apiGetConsultations } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('coming-soon');

  // User Session State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('blackline_user_session');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // Purchased / Scheduled Consultations State
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('blackline_purchases');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Modal Controls
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [buyTarget, setBuyTarget] = useState(null);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'signin' });
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch Consultations from Docker API container when user signs in
  useEffect(() => {
    if (user?.email) {
      apiGetConsultations(user.email).then(containerConsultations => {
        if (containerConsultations && containerConsultations.length > 0) {
          setPurchases(containerConsultations);
        }
      });
    }
  }, [user]);

  // Sync to localStorage as client fallback
  useEffect(() => {
    if (user) {
      localStorage.setItem('blackline_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('blackline_user_session');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('blackline_purchases', JSON.stringify(purchases));
  }, [purchases]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out of client account');
  };

  const handleLoginSuccess = (userProfile) => {
    setUser(userProfile);
    setAuthModalState({ isOpen: false, mode: 'signin' });
    showToast(`Welcome back, ${userProfile.name}!`);
  };

  const handleSuccessPayment = (order) => {
    setPurchases(prev => [order, ...prev]);
    setBuyTarget(null);
    setActiveTab('dashboard');
    showToast(`Consultation confirmed! ${order.websiteName} added to your portal.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A0F] text-[#F0F6FC]">

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#A0C4FF] to-[#38BDF8] text-[#070A0F] font-bold text-xs shadow-2xl shadow-[#38BDF8]/30 flex items-center gap-2 animate-bounce">
          <span>✨ {toastMessage}</span>
        </div>
      )}

      {/* Coming Soon Placeholder View */}
      {activeTab === 'dashboard' ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
          <UserDashboard
            user={user}
            purchases={purchases}
            onSelectMarketplace={() => setActiveTab('coming-soon')}
          />
        </main>
      ) : (
        <ComingSoonPage
          onBookConsultation={(target) => setBuyTarget(target)}
        />
      )}

      {/* Modals */}
      {previewTemplate && (
        <LivePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onBuyNow={(site) => setBuyTarget(site)}
        />
      )}

      {buyTarget && (
        <PaymentModal
          item={buyTarget}
          user={user}
          onClose={() => setBuyTarget(null)}
          onSuccessPayment={handleSuccessPayment}
          onRequireAuth={() => {
            setBuyTarget(null);
            setAuthModalState({ isOpen: true, mode: 'signin' });
            showToast('Please sign in to complete individual purchase');
          }}
        />
      )}

      {authModalState.isOpen && (
        <AuthModal
          initialMode={authModalState.mode}
          onClose={() => setAuthModalState({ isOpen: false, mode: 'signin' })}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}
