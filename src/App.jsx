import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WebsiteCatalog from './components/WebsiteCatalog';
import LivePreviewModal from './components/LivePreviewModal';
import PricingSection from './components/PricingSection';
import PaymentModal from './components/PaymentModal';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import BlackLineTheory from './components/BlackLineTheory';
import ServicesPage from './components/ServicesPage';
import ProjectsPage from './components/ProjectsPage';
import AboutUsPage from './components/AboutUsPage';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { apiGetConsultations } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace'); // marketplace (home), theory, services, projects, about, pricing, dashboard

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

  const handleSelectBuyTier = (tier) => {
    setBuyTarget({
      id: tier.id,
      name: tier.name,
      price: tier.price
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A0F] text-[#F0F6FC]">

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#A0C4FF] to-[#38BDF8] text-[#070A0F] font-bold text-xs shadow-2xl shadow-[#38BDF8]/30 flex items-center gap-2 animate-bounce">
          <span>✨ {toastMessage}</span>
        </div>
      )}

      {/* Glassmorphic Navbar */}
      <Navbar
        user={user}
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        purchasedCount={purchases.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4">

        {activeTab === 'marketplace' && (
          <>
            <Hero
              onExplore={() => {
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onViewPricing={() => setActiveTab('pricing')}
              onBookConsultation={() => setBuyTarget({ id: 'consult-free', name: 'Start My Project Consultation' })}
            />
            <WebsiteCatalog
              onSelectPreview={(site) => setPreviewTemplate(site)}
              onSelectBuy={(site) => setBuyTarget(site)}
            />
          </>
        )}

        {activeTab === 'theory' && (
          <BlackLineTheory
            onBookConsultation={(target) => setBuyTarget(target)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onBookConsultation={(target) => setBuyTarget(target)}
          />
        )}

        {/* {activeTab === 'projects' && (
          <ProjectsPage
            onPreview={(project) => setPreviewTemplate(project)}
            onBookConsultation={(target) => setBuyTarget(target)}
          />
        )} */}

        {activeTab === 'about' && (
          <AboutUsPage
            onBookConsultation={(target) => setBuyTarget(target)}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingSection
            onSelectTier={handleSelectBuyTier}
            onSelectPaymentMethod={(methodId) => {
              setBuyTarget({
                id: methodId,
                name: `Consultation (${methodId.replace('-', ' ').toUpperCase()})`,
                price: 'Free'
              });
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard
            user={user}
            purchases={purchases}
            onSelectMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {/* Global Contact Section */}
        {activeTab !== 'dashboard' && (
          <ContactSection onBookConsultation={(target) => setBuyTarget(target)} />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

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

      {/* {authModalState.isOpen && (
        <AuthModal
          initialMode={authModalState.mode}
          onClose={() => setAuthModalState({ isOpen: false, mode: 'signin' })}
          onLoginSuccess={handleLoginSuccess}
        />
      )} */}

    </div>
  );
}
