import { useState, useEffect } from 'react';
import { useLanguage } from './components/i18n/LanguageContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import { JoinPage } from './components/pages/JoinPage';
import { ImpactPage } from './components/pages/ImpactPage';
import { ContactPage } from './components/pages/ContactPage';
import { PressPage } from './components/pages/PressPage';
import { EvoLivingPage } from './components/pages/EvoLivingPage';
import { InvestmentRoadmapPage } from './components/pages/InvestmentRoadmapPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';

import gtnLogo from 'figma:asset/7a413933a32971077f976d5901124a6b70ce9581.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { t } = useLanguage();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'join':
        return <JoinPage />;
      case 'impact':
        return <ImpactPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'press':
        return <PressPage />;
      case 'evo-living':
        return <EvoLivingPage onNavigate={setCurrentPage} />;
      case 'investment-roadmap':
        return <InvestmentRoadmapPage onNavigate={setCurrentPage} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;

      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen gradient-ink-complex dark">
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(63, 163, 154, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(197, 114, 58, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(30, 84, 73, 0.05) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        
        {/* GTN Footer - Dark Theme */}
        <footer className="gradient-brand-dark relative overflow-hidden border-t border-border">
          {/* Enhanced pattern overlay for footer */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 gradient-ink-complex opacity-80"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(ellipse at top left, rgba(63, 163, 154, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at bottom right, rgba(197, 114, 58, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse at center, rgba(30, 84, 73, 0.08) 0%, transparent 50%)
              `
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="container py-12">
              <div className="grid lg:grid-cols-5 gap-8 mb-8">
                {/* Brand Section - Minimal */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-primary/10 border border-primary/20">
                      <img 
                        src={gtnLogo} 
                        alt="GTN Logo" 
                        className="h-6 w-auto filter brightness-0 invert"
                      />
                    </div>
                    <span className="text-2xl font-bold text-ivory" style={{ fontFamily: 'var(--font-headline)' }}>
                      GTN
                    </span>
                  </div>
                  <p className="text-ivory/90 leading-relaxed max-w-md text-[12px]">
                    {t('footer.description')}
                  </p>
                </div>

                {/* Navigation Links - Compact */}
                <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
                  {/* Community */}
                  <div className="space-y-4">
                    <h4 className="text-ivory font-semibold mb-4 tracking-tight border-b border-primary/20 pb-2">
                      {t('footer.community')}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <button 
                          onClick={() => setCurrentPage('join')} 
                          className="group flex items-center text-ivory/80 hover:text-primary transition-all duration-300 text-sm"
                        >
                          <span className="group-hover:translate-x-2 transition-transform duration-300">{t('footer.joinGtn')}</span>
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => setCurrentPage('evo-living')} 
                          className="group flex items-center text-ivory/80 hover:text-primary transition-all duration-300 text-sm"
                        >
                          <span className="group-hover:translate-x-2 transition-transform duration-300">{t('footer.evoLiving')}</span>
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Work & Impact */}
                  <div className="space-y-4">
                    <h4 className="text-ivory font-semibold mb-4 tracking-tight border-b border-accent/20 pb-2">
                      {t('footer.workImpact')}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <button 
                          onClick={() => setCurrentPage('impact')} 
                          className="group flex items-center text-ivory/80 hover:text-accent transition-all duration-300 text-sm"
                        >
                          <span className="group-hover:translate-x-2 transition-transform duration-300">{t('footer.impactGov')}</span>
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Connect & Resources */}
                  <div className="space-y-4">
                    <h4 className="text-ivory font-semibold mb-4 tracking-tight border-b border-secondary/20 pb-2">
                      {t('footer.connect')}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <button 
                          onClick={() => setCurrentPage('contact')} 
                          className="group flex items-center text-ivory/80 hover:text-secondary transition-all duration-300 text-sm"
                        >
                          <span className="group-hover:translate-x-2 transition-transform duration-300">{t('footer.getInTouch')}</span>
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => setCurrentPage('privacy-policy')} 
                          className="group flex items-center text-ivory/80 hover:text-secondary transition-all duration-300 text-sm"
                        >
                          <span className="group-hover:translate-x-2 transition-transform duration-300">{t('footer.privacyPolicy')}</span>
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Bottom Section - Compact */}
              <div className="border-t border-ivory/10 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
                    <p className="text-ivory/60 text-sm">
                      {t('footer.copyright')}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://t.me/GlobalTalentNation" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-ivory/5 border border-ivory/20 text-ivory/70 hover:text-accent hover:border-accent/40 transition-all duration-300 hover:shadow-glow-copper"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/globaltalentnation/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-ivory/5 border border-ivory/20 text-ivory/70 hover:text-primary hover:border-primary/40 transition-all duration-300 hover:shadow-glow-dark"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="mailto:1@evolution.life"
                      className="p-2 rounded-full bg-ivory/5 border border-ivory/20 text-ivory/70 hover:text-secondary hover:border-secondary/40 transition-all duration-300 hover:shadow-brand-dark"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}